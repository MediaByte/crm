// @ts-check
import * as Utils from './Utils'

import { Node } from './Node'

/**
 * @typedef {import('./typings').OnChangeReturn} OnChangeReturn
 * @typedef {import('./typings').Schema} Schema
 */

export {} // stop jsdoc comments from merging

/**
 * @template T
 * @typedef {import('./typings').SetLeaf<T>} SetLeaf
 */

/**
 * @typedef {import('./simple-typings').OnChangeReturn} SimpleOnChangeReturn
 * @typedef {import('./simple-typings').Schema} SimpleSchema
 * @typedef {import('./simple-typings').Node} SimpleNode
 * @typedef {import('./simple-typings').Response} Response
 */

export {} // stop jsdoc comments from merging

/**
 * @template T
 * @typedef {import('./typings').PutResponse<T>} PutResponse
 */

/**
 * @template T
 * In charge of creating and storing new nodes.
 */
export default class SetNode {
  /**
   * @param {Schema} itemSchema
   * @param {object} gunInstance
   * @param {(nextVal: SimpleNode|null, key?: string) => SimpleOnChangeReturn} setOnChange
   */
  constructor(itemSchema, gunInstance, setOnChange) {
    if (!Utils.isSchema(itemSchema)) {
      throw new TypeError('invalid schema SetNode()')
    }

    this.itemSchema = itemSchema

    this.gunInstance = gunInstance

    /**
     * @type {Function[]}
     */
    this.subscribers = []

    this.currentData = {}

    this.setOnChange = setOnChange
  }

  /**
   * @param {Record<string, T>} nextData
   * @returns {void}
   */
  cachePut(nextData) {
    for (const [key, value] of Object.entries(nextData)) {
      this.currentData[key] = value
    }

    this.notifySubscribers()
  }

  /**
   * @private
   * @returns {void}
   */
  notifySubscribers() {
    this.subscribers.forEach(cb => cb(this.currentData))
  }

  /**
   * @param {T} object
   * @returns {Promise<Response>}
   */
  async set(object) {
    const res = await this.isValidSet(object)

    if (!res.ok) {
      return res
    }

    const primitiveData = {}
    const edgeData = {}

    for (const [k, edgeOrPrimitive] of Object.entries(object)) {
      if (edgeOrPrimitive instanceof Node) {
        edgeData[k] = edgeOrPrimitive.gunInstance
      } else {
        if (Utils.isObject(edgeOrPrimitive)) {
          throw new TypeError(
            'expected props in the object to be passed into SetNode.set() to be either null, primitives or Node instances.',
          )
        }
        primitiveData[k] = edgeOrPrimitive
      }
    }

    // add empty sets to primitive put
    Object.keys(Utils.getSetLeaves(this.itemSchema)).forEach(k => {
      primitiveData[k] = {}
    })

    return new Promise(async resolve => {
      try {
        const writes = []

        /** @type {object} */
        let ref

        writes.push(
          new Promise(resolve => {
            ref = this.gunInstance.set(primitiveData, ack => {
              resolve({
                ok: typeof ack.err === 'undefined',
                messages: typeof ack.err === 'string' ? [ack.err] : [],
                details: {},
              })
            })
          }),
        )

        for (const [k, edge] of Object.entries(edgeData)) {
          writes.push(
            new Promise(resolve => {
              ref.get(k).put(edge, ack => {
                resolve({
                  ok: typeof ack.err === 'undefined',
                  messages: [],
                  details: {
                    [k]: typeof ack.err === 'string' ? [ack.err] : [],
                  },
                })
              })
            }),
          )
        }

        const writeResults = await Promise.all(writes)

        resolve(Utils.mergeResponses(...writeResults))
      } catch (e) {
        resolve({
          ok: false,
          messages: [Utils.reasonToString(e)],
          details: {},
        })
      }
    })
  }

  /**
   * @param {string} setKey
   * @throws {ReferenceError}
   * @throws {TypeError}
   */
  get(setKey) {
    if (typeof setKey !== 'string') {
      throw new TypeError(
        `invalid type for set key, expected string but got: ${typeof setKey}`,
      )
    }

    if (!(setKey in this.currentData)) {
      throw new ReferenceError('unexistant key in SetNode.get()')
    }

    const gunSubInstance = this.gunInstance.get(setKey)

    const node = new Node(
      this.itemSchema,
      gunSubInstance,
      false,
      nextValOrNull => this.setOnChange(nextValOrNull, setKey),
    )

    // why not?
    node.currentData = this.currentData[setKey]

    return node
  }

  /**
   * Validates an object according to an schema
   * @param {T & { [K in keyof T]?: object}} objectData
   * @returns {Promise<Response>}
   */
  async isValidSet(objectData) {
    const errorMap = new Utils.ErrorMap()

    for (const key of Object.keys(this.itemSchema)) {
      const type = this.itemSchema[key].type
      const isPrimitiveProp = type === 'string'
      const isSetProp = Array.isArray(type)

      if (!isSetProp && !(key in objectData)) {
        errorMap.puts(
          key,
          `missing key: ${key} in setNode for ${
            this.itemSchema[Utils.SCHEMA_NAME]
          }, all keys of the initial value for a node (except sub-sets) must be initialized to either null, a primitive or a reference to a node`,
        )

        continue
      }

      if (isSetProp && key in objectData) {
        errorMap.puts(
          key,
          `value given for sub-set node, this value must not be initialized as it will be automatically`,
        )

        continue
      }

      // @ts-ignore
      const valueIsNull = objectData[key] === null

      // if the prop is not primitive, validations below will handle it
      let isCorrectType = true

      if (isPrimitiveProp) {
        isCorrectType = Utils.valueIsOfType(
          // @ts-ignore
          this.itemSchema[key].type,
          // @ts-ignore
          objectData[key],
        )
      }

      if (!valueIsNull && !isCorrectType) {
        errorMap.puts(key, `wrong data type or empty string`)
      }
    }

    if (errorMap.hasErrors) {
      return {
        ok: false,
        messages: [],
        details: errorMap.map,
      }
    }

    /**
     * @type {Partial<Record<keyof T, Promise<OnChangeReturn>>}
     */
    const validations = {}

    // validate the node itself
    for (const key of Object.keys(objectData)) {
      const self = {
        // give all other data to the onChange() call if it needs to look at it
        ...objectData,
        [key]: undefined, // signals that this is a new node being created
      }

      // @ts-ignore
      validations[key] = this.itemSchema[key].onChange(self, objectData[key])
    }

    await Promise.all(Object.values(validations))

    for (const [k, err] of Object.entries(validations)) {
      if (await err) {
        errorMap.puts(k, await err)
      }
    }

    if (errorMap.hasErrors) {
      return {
        ok: false,
        messages: [],
        details: errorMap.map,
      }
    }

    // now validate the whole object against the setSchemaLeaf, this allows
    // for example, to prevent 2 items with the same value for a property and
    // what not

    const objectDataWithEmptySets = {
      ...objectData,
    }

    Object.keys(Utils.getSetLeaves(this.itemSchema)).forEach(k => {
      objectDataWithEmptySets[k] = {}
    })

    const err = await this.setOnChange(objectDataWithEmptySets)

    if (Array.isArray(err)) {
      return {
        ok: false,
        messages: err,
        details: {},
      }
    }

    return {
      ok: true,
      messages: [],
      details: {},
    }
  } // isValid()

  /**
   * @param {Function} cb
   * @returns {void}
   */
  on(cb) {
    cb(this.currentData)

    this.subscribers.push(cb)
  }

  /**
   *
   * @param {Function=} cb
   * @returns {void}
   */
  off(cb) {
    if (cb) {
      const idx = this.subscribers.indexOf(cb)

      this.subscribers.splice(idx, 1)
    } else {
      this.subscribers = []
    }
  }
}
