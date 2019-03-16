// @ts-check
import 'gun/lib/open'

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
   * @param {SetLeaf<T>} setSchemaLeaf
   * @param {object} gunInstance
   */
  constructor(setSchemaLeaf, gunInstance) {
    if (!Utils.isSetLeaf(setSchemaLeaf)) {
      throw new TypeError('invalid schema leaf given to NodeSet()')
    }

    this.setSchemaLeaf = setSchemaLeaf

    this.itemSchema = setSchemaLeaf.type[0]

    this.gunInstance = gunInstance

    this.subscribers = []

    this.currentData = {}
  }

  /**
   * @param {T} object
   * @returns {Promise<PutResponse<T>>}
   */
  async set(object) {
    const res = await this.isValid(object)

    if (!res.ok) {
      return res
    }

    return new Promise(resolve => {
      this.gunInstance.set(object, ack => {
        resolve({
          ok: typeof ack.err == 'undefined',
          messages: typeof ack.err == 'string' ? [ack.err] : [],
          details: {},
        })
      })
    })
  }

  /**
   *
   * @param {string} setKey
   * @throws {ReferenceError}
   */
  get(setKey) {
    // if (!(setKey in this.currentData)) {
    //   throw new ReferenceError('unexistant key in SetNode.get()')
    // }

    const gunSubInstance = this.gunInstance.get(setKey)

    const node = new Node(this.itemSchema, gunSubInstance, false)

    return node
  }

  /**
   * Validates an object according to an schema
   * @param {T & { [K in keyof T]?: object}} objectData
   * @returns {Promise<PutResponse<T>>}
   */
  async isValid(objectData) {
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

      const isNull = objectData[key] === null
      const isCorrectType = Utils.valueIsOfType(
        this.itemSchema[key].type,
        objectData[key],
      )

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

    const err = await this.setSchemaLeaf.onChange(
      this.currentData,
      objectData,
      undefined,
    )

    if (err) {
      return {
        ok: false,
        messages: typeof err == 'string' ? [err] : err,
        details: {},
      }
    }

    return {
      ok: true,
      messages: [],
      details: {},
    }
  } // isValid()
}
