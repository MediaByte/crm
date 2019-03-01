// @ts-check
//import Gun from 'gun'
import flattenDeep from 'lodash/flattenDeep'

import * as Utils from './Utils'

// allow self to be undefined for intiial valuez?

/**
 * @typedef {import('./typings').Leaf<any>} Leaf
 * @typedef {import('./typings').Schema} Schema
 */

/*******************************************************************************
 *******************************************************************************
 ******************************************************************************/

/**
 * @template T
 */
export class Node {
  /**
   * @param {Schema} schema
   * @param {object} gunInstance
   */
  constructor(schema, gunInstance) {
    this.schema = schema
    this.gunInstance = gunInstance
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
    /** @type {Function[]} */
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
        this.edges[key] = new Node(subschema, this.gunInstance.get(key))
      })

    this.gunInstance.once(gunListener.bind(this))

    this.gunInstance.on(gunListener.bind(this), {
      // delta updates
      change: true,
    })
  }

  // uses for putedge:
  // collections

  // references

  // use sparingly?
  /** @private */
  async _putEdge(data) {
    const errorMap = new Utils.ErrorMap()

    Object.entries(data).forEach(([key, value]) => {
      const subschema = this.schema[key]
    })
  }

  /** @private */
  async _putPrimitive(data) {
    const errorMap = new Utils.ErrorMap()

    // onChange() is guaranteed to receive the correct data type
    // so we check for that first and bail out early if the data isn't of the
    // correct types
    for (const [key, value] of Object.entries(data)) {
      if (!Utils.valueIsOfType(this.schema[key].type, value)) {
        const msg = `Must be ${
          this.schema[key].type == 'number' ? 'a number' : 'text'
        }`

        errorMap.puts(key, msg)
      }
    }

    if (errorMap.hasErrors) {
      return {
        ok: false,
        details: errorMap.map,
      }
    }

    for (const [key, value] of Object.entries(data)) {
      const self = {
        ...this.cache, // start with the cached objects
        ...data, // actually provide the other values on this put() call to
        // ensure the onChange gets the whole picture.
        [key]: this.cache[key], // keep the old value for key we are updating so
        // onChange() can compare it to the new value if
        // needed.
      }

      let err

      try {
        err = await this.schema[key].onChange(self, value)
      } catch (e) {
        err = Utils.reasonToString(e)
      }

      // ignore empty arrays
      if (Array.isArray(err) && err.length) errorMap.puts(key, err)
      if (typeof err == 'string') errorMap.puts(key, err)
    }

    if (errorMap.hasErrors) {
      return Promise.resolve({
        ok: false,
        details: errorMap.map,
      })
    }

    return new Promise(resolve => {
      this.gunInstance.put(data, ack => {
        resolve({
          ok: typeof ack.err == 'undefined',
          message: ack.err || '',
          details: {},
        })
      })
    })
  }

  /**
   * @param {Record<keyof T, any>} data
   */
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

    return this._putPrimitive(primitivePuts)
  }

  /**
   * @param {string} key
   */
  async get(key) {
    if (!(key in this.schema)) {
      throw new Error(
        `Invalid key for get() call in ${this.schema[SCHEMA_NAME]} node.`,
      )
    }

    if (key in this.cache) {
      return this.cache[key]
    }
  }

  /**
   * @private
   * @param {object} data
   **/
  _cachePut(data) {
    Object.assign(this.cache, data)
    this._onChange()
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

/**
 * @param {any} o
 * @returns {o is Schema}
 */
const isSchema = o => typeof o[Utils.SCHEMA_NAME] != 'undefined'

/**
 * @param {any} o
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

const gunListener = function(nodeValue) {
  for (const [key, value] of Object.entries(nodeValue)) {
    if (key in this.leaves) {
      this._cachePut({
        [key]: value,
      })
    } else if (key in this.edges) {
      this._cachePut({
        [key]: 'EDGE_VALUE',
      })
    } else {
      if (key == '_' || key == '#') continue
      console.warn(
        `an unknown key was received from the gun instance, in node: ${
          this.schema[Utils.SCHEMA_NAME]
        }, the key was: ${key}`,
      )
    }
  }
}
