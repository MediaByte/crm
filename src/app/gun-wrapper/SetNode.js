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
   * @returns {Promise<PutResponse<T>>}
   */
  async set(object) {
    const res = await this.isValidSet(object)

    if (!res.ok) {
      return res
    }

    return new Promise(resolve => {
      // @ts-ignore
      this.gunInstance.set(object, ack => {
        resolve({
          ok: typeof ack.err === 'undefined',
          messages: typeof ack.err === 'string' ? [ack.err] : [],
          details: {},
        })
      })
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
   * @returns {Promise<PutResponse<T>>}
   */
  async isValidSet(objectData) {
    const errorMap = new Utils.ErrorMap()

    for (const key of Object.keys(this.itemSchema)) {
      if (!(key in objectData)) {
        errorMap.puts(
          key,
          `missing key: ${key} in setNode for ${
            this.itemSchema[Utils.SCHEMA_NAME]
          }, all keys of the initial value for an object must be initialized to either null, a primitive or a reference to a node`,
        )

        continue
      }

      // @ts-ignore
      const isNull = objectData[key] === null

      // if the prop is not primitive, validations below will handle it
      let isCorrectType = true

      const isPrimitiveProp = typeof this.itemSchema[key].type === 'string'

      if (isPrimitiveProp) {
        isCorrectType = Utils.valueIsOfType(
          // @ts-ignore
          this.itemSchema[key].type,
          // @ts-ignore
          objectData[key],
        )
      }

      if (!isNull && !isCorrectType) {
        errorMap.puts(key, `wrong data type`)
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

    const err = await this.setOnChange(objectData)

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
