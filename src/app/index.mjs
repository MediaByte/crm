//import Gun from 'gun'
import flattenDeep from 'lodash/flattenDeep'

/**
 * @typedef {import('./typings').Leaf<any>} Leaf
 * @typedef {import('./typings').Schema} Schema
 */

export const SCHEMA_NAME = Symbol('SCHEMA_NAME')

/**
 * @param {'number'|'string'} type
 * @param {any} value
 * @returns {boolean}
 * @throws {TypeError}
 */
const valueIsOfType = (type, value) => {
  const map = {
    number: value => typeof value == 'number',
    string: value => typeof value == 'string' && value.length > 0,
  }
  if (!(type in map)) {
    throw new TypeError('value')
  }
  return map[type](value)
}

class ErrorMap {
  constructor() {
    this.hasErrors = false
    /**
     * @type {Record<string, string[]>}
     */
    this.map = {}
    /**
     * Arguments after the first one can be either strings or array of strings.
     * All will be flattened to
     * @param {string|number} key
     */
  }
  puts(key) {
    if (!this.map[key]) this.map[key] = []
    const msgs = flattenDeep(Array.from(arguments).slice(1))
    this.map[key].push(...msgs)
    this.hasErrors = true
  }
}

const isSchema = o => typeof o[SCHEMA_NAME] != 'undefined'
/**
 * @param o
 * @returns {o is Leaf}
 */
const isLeaf = o => typeof o.type === 'string'

// type can be 'string' or 'number' literals, howwever the type itself of
// it will be an string
// there could be a subschema with a 'type' key, however it would be an
// object instead
/**
 * @param {[string , Leaf|Schema]} entry
 * @returns {entry is [string , Leaf]}
 */
const leafEntry = entry => {
  const [, maybeSubschema] = entry
  return isLeaf(maybeSubschema)
}

/**
 * @param {[string , Leaf|Schema]} entry
 * @returns {entry is [string , Schema]}
 */
const subschemaEntry = entry => !leafEntry(entry)
/*******************************************************************************
 *******************************************************************************
 ******************************************************************************/

/**
 * @template T
 */
export class Node {
  /**
   * @param {Schema} schema
   */
  constructor(schema) {
    /**
     * @type {Record<keyof T, string|number|object>}
     */
    this.cache = {}
    /**
     * @type {Record<keyof T, Node<any>>}
     */
    this.edges = {}
    /**
     * @type {Record<keyof T, Leaf>}
     */
    this.leaves = {}
    /** @type {WeakMap<Function, Function>} */
    this.subscribers = []

    if (!isSchema(schema)) {
      throw new TypeError()
    }

    Object.entries(schema)
      .filter(leafEntry)
      .forEach(([key, leaf]) => {
        this.leaves[key] = leaf
      })

    Object.entries(schema)
      .filter(subschemaEntry)
      .forEach(([key, subschema]) => {
        this.edges[key] = new Node(subschema)
      })

    this.schema = schema
  }

  // use sparingly?
  async _putEdge(data) {
    const resMap = {}

    const requests = Object.entries(data).map(([key, subData]) =>
      this.edges[key]
        .put(subData)
        .then(res => {
          resMap[key] = res
        })
        .catch(res => {
          resMap[key] = res
        }),
    )

    return Promise.all(requests).then(() => {
      const allOk = Object.values(resMap).every(res => res.ok)

      resMap.ok = allOk

      return Promise.resolve(resMap)
    })
  }

  /** @private */
  async _putPrimitive(data) {
    const errorMap = new ErrorMap()

    for (const [key, value] of Object.entries(data)) {
      if (!valueIsOfType(this.schema[key].type, value)) {
        const msg = `Must be ${
          this.schema[key].type == 'number' ? 'a number' : 'text'
        }`

        errorMap.puts(key, msg)

        // onChange() is guaranteed to receive the correct data type
        break
      }

      const err = this.schema[key].onChange(this.cache, value)

      if (err) {
        errorMap.puts(key, err)
      }
    }

    const ok = !errorMap.hasErrors

    if (ok) {
      return new Promise((res, rej) => {
        if (Math.random() > 0) {
          this._cachePut(data)

          res({
            ok: true,
            status: 200,
          })
        } else {
          res({
            ok: false,
            status: 435,
          })
        }
      })
    }
  }

  async put(data) {
    const errorMap = {}

    const primitivePuts = {}
    const edgePuts = {}

    for (const [key, value] of Object.entries(data)) {
      if (!(key in this.schema)) {
        errorMap.puts(key, 'unexpected key')

        // use HTTP codes
        // errorMap.puts('$$_GUN_WRAPPER_ERROR_CODE', ``)
        break
      }

      if (key in this.edges) {
        edgePuts[key] = value
      } else {
        primitivePuts[key] = value
      }
    }

    return this._putPrimitive(primitivePuts).then(pRes =>
      this._putEdge(edgePuts).then(eRes => ({ ...pRes, ...eRes })),
    )
  }

  async get(key) {
    if (!(key in this.schema)) {
      throw new Error(
        `Invalid key for get() call in ${schema[SCHEMA_NAME]} node.`,
      )
    }

    if (key in this.cache) {
      return this.cache[key]
    }
  }

  /** @private */
  _cachePut(data) {
    this.cache = { ...this.cache, ...data }
  }

  /** @private */
  _onChange() {
    this.subscribers.forEach(cb => cb(this.cache))
  }

  on(cb) {
    this.subscribers.push(cb)
  }

  off() {
    this.subscribers = []
  }
}
