import * as Utils from './Utils'

import { Node } from './Node'

/**
 * @typedef {import('./Utils')._setLeaf<{}>} SetLeaf
 */

/**
 * @template T
 * NodeSets are the ones in charge of creating and storing new nodes.
 */
export default class NodeSet {
  /**
   * @param {Schema} setSchemaLeaf
   * @param {object} gunInstance
   */
  constructor(setSchemaLeaf, gunInstance) {
    if (!Array.isArray(setSchemaLeaf.type)) {
      throw new TypeError('')
    }

    /**
     * @type {Schema}
     */
    this.setSchemaLeaf = setSchemaLeaf

    this.itemSchema = setSchemaLeaf.type[0]

    this.gunInstance = gunInstance

    this.subscribers = []

    this.cache = {}

    this.gunInstance.map().on((nodeValue, key) => {
      console.log(nodeValue)
      this._cachePut(key, nodeValue)
    })
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

  get(setKey) {
    if (!(setKey in this.cache)) {
      return {
        ok: false,
        messages: ['unexistant key'],
        details: {},
      }
    }

    const gunSubInstance = this.gunInstance.get(setKey)

    const node = new Node(this.itemSchema, gunSubInstance)

    // we cannot trust map().on() on this set's gun instance to be called when
    // the gun substinstance gets its put() method called.
    // Therefore, we use our own on() to subscribe to updates
    node.on(nodeValue => {
      this._cachePut(setKey, nodeValue)
    })

    const self = this

    const oldPut = node.put.bind(node)
    node.put = async function(data) {
      const { edgePuts, primitivePuts } = this.splitPuts(data)

      // TODO: english this comment
      // Let's validate first even though node.put() already does it
      // because we want that fine-grained validation before doing our
      // more rough validation in the set.
      const nodeRes = Utils.mergeResponses(
        await node.validateEdgePut(edgePuts),
        await node.validatePrimitivePut(primitivePuts),
      )

      if (!nodeRes.ok) {
        return nodeRes
      }

      // now lets validate against the set schema
      const err = await self.setSchemaLeaf.onChange(this.cache, data, setKey)

      if (err) {
        return {
          ok: false,
          messages: typeof err == 'string' ? [err] : err,
          details: {},
        }
      }

      return oldPut(data)
    }

    const oldGet = node.get.bind(node)
    node.get = key => {
      // throws if the key is wrong
      // it's pre-binded
      const oldGetPut = oldGet(key).put

      return {
        put: async nodeToBePut => {
          const err = await self.setSchemaLeaf.onChange(
            this.cache,
            {
              ...node.cache,
              [key]: nodeToBePut.cache,
            },
            setKey,
          )

          if (err) {
            return {
              ok: false,
              messages: typeof err == 'string' ? err : [err],
              details: {},
            }
          }

          return oldGetPut(nodeToBePut)
        },
      }
    }

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

  /**
   * @param {(cache: Record<string, T>) => void} cb
   * @returns {void}
   */
  on(cb) {
    this.subscribers.push(cb)
  }

  /**
   * @private
   * @param {string} key
   * @param {object} nodeValue
   **/
  _cachePut(key, nodeValue) {
    this.cache[key] = { ...nodeValue }
    delete this.cache[key]['_']

    for (const [k, v] of Object.entries(this.cache[key])) {
      if (typeof v === 'object') {
        delete this.cache[key][k]['#']
      }
    }

    this._onChange()
  }

  /** @private */
  _onChange() {
    this.subscribers.forEach(cb => cb(this.cache))
  }
}
