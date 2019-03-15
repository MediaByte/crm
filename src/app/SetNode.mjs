import 'gun/lib/open'

import * as Utils from './Utils.mjs'

import { Node } from './Node'

/**
 * @typedef {import('./Utils.mjs')._setLeaf<{}>} SetLeaf
 */

/**
 * @template T
 * In charge of creating and storing new nodes.
 */
export default class SetNode {
  /**
   * @param {Schema} setSchemaLeaf
   * @param {object} gunInstance
   */
  constructor(setSchemaLeaf, gunInstance) {
    if (!Utils.isSetLeaf(setSchemaLeaf)) {
      throw new TypeError('invalid schema leaf given to NodeSet()')
    }

    /**
     * @type {Schema}
     */
    this.setSchemaLeaf = setSchemaLeaf

    this.itemSchema = setSchemaLeaf.type[0]

    this.gunInstance = gunInstance

    this.subscribers = []

    this.currentData = {}
  }

  /**
   * @param {T} object
   */
  async set(object) {
    if (!this.isValid(object)) {
      return {
        ok: false,
        messages: [
          `Bad object type at ${this.setSchemaLeaf[Utils.SCHEMA_NAME]} set()`,
        ],
        details: {},
      }
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
   * @param {T} objectData
   * @returns {boolean}
   */
  isValid(objectData) {
    return true
  }
}
