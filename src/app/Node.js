// @ts-check
import Gun from 'gun/gun'
import 'gun/lib/load'
import * as Utils from './Utils'
import size from 'lodash/size'
import SetNode from './SetNode'

// allow self to be undefined for intiial valuez?

/**
 * @typedef {import('./typings').Leaf<any>} Leaf
 * @typedef {import('./typings').Schema} Schema
 * @typedef {import('./NodeSet').default<{}>} NodeSet
 *
 */
/**
 * @template T
 * @typedef {import('./typings').PutResponse<T>} PutResponse
 */

/*******************************************************************************
 *******************************************************************************
 ******************************************************************************/

// validatee edge success before writing primitives

/**
 * @template T
 */
export class Node {
  /**
   * @param {Schema} schema
   * @param {object} gunInstance
   */
  constructor(schema, gunInstance, isRoot = true) {
    if (!Utils.isSchema(schema)) {
      throw new TypeError('invalid schema')
    }

    if (!(gunInstance instanceof Gun)) {
      throw new TypeError('invalid gunInstance')
    }

    this.schema = schema
    this.gunInstance = gunInstance

    /**
     * @type {Record<keyof T, string|number|object>}
     */
    this.currentData = {}

    /** @type {Function[]} */
    this.subscribers = []

    /**
     * @type {Record<keyof T, SetNode>}
     */
    this.setNodes = {}

    for (const [key, setLeaf] of Object.entries(
      Utils.getSetLeaves(this.schema),
    )) {
      this.setNodes[key] = new SetNode(setLeaf, this.gunInstance.get(key))
    }

    this.onOpen = this.onOpen.bind(this)

    if (isRoot) {
      this.gunInstance.open(this.onOpen)
    }
  }

  onOpen(nextData) {
    if (Utils.isValidOpenData(this.schema, nextData)) {
      this.currentData = nextData
      for (const [k, v] of Object.entries(this.currentData)) {
        if (k in this.setNodes) {
          this.setNodes[k].currentData = v
        }
      }
      this.subscribers.forEach(cb => cb(this.currentData))
    } else {
      console.log('retry')
    }
  }

  // uses for putedge:
  // collections

  // references

  /**
   * @param {Partial<T>} data
   * @returns {Promise<PutResponse<T>>}
   */
  async validateEdgePut(data) {
    const errorMap = new Utils.ErrorMap()

    for (const [key, value] of Object.entries(data)) {
      if (key in Utils.getEdgeLeaves(this.schema)) {
        if (value !== null) {
          errorMap.puts(key, 'can only be null')
        }
      }
    }

    if (errorMap.hasErrors) {
      return {
        ok: false,
        messages: ['only use edgeput for nulling out references'],
        details: errorMap.map,
      }
    }

    const validationPromises = Object.entries(data).map(([key, value]) => {
      const subschema = this.schema[key]

      const self = {
        ...this.currentData, // start with the cached objects
        ...data, // actually provide the other values on this put() call to
        // ensure the onChange gets the whole picture.
        [key]: this.currentData[key], // keep the old value for key we are updating so
        // onChange() can compare it to the new value if
        // needed.
      }

      return subschema.onChange(self, value).then(err => {
        // ignore empty arrays
        if (Array.isArray(err) && err.length) errorMap.puts(key, err)
        // don't ignore empty strings just in case
        if (typeof err == 'string') errorMap.puts(key, err)

        return err
      })
    })

    return Promise.all(validationPromises)
      .then(() => ({
        ok: !errorMap.hasErrors,
        messages: [],
        details: errorMap.map,
      }))
      .catch(e => ({
        ok: false,
        messages: [Utils.reasonToString(e)],
        details: errorMap.map,
      }))
  }

  /**
   * @param {Partial<T>} data
   * @returns {Promise<PutResponse<T>>}
   */
  async validatePrimitivePut(data) {
    const errorMap = new Utils.ErrorMap()

    // onChange() is guaranteed to receive the correct data type
    // so we check for that first and bail out early if the data isn't of the
    // correct types
    for (const [key, value] of Object.entries(data)) {
      if (key in Utils.getPrimitiveLeaves(this.schema)) {
        if (!Utils.valueIsOfType(this.schema[key].type, value)) {
          const msg = `Must be ${
            this.schema[key].type == 'number' ? 'a number' : 'text'
          }`

          errorMap.puts(key, msg)
        }
      }
    }

    if (errorMap.hasErrors) {
      return {
        ok: false,
        messages: [],
        details: errorMap.map,
      }
    }

    for (const [key, value] of Object.entries(data)) {
      const self = {
        ...this.currentData, // start with the cached objects
        ...data, // actually provide the other values on this put() call to
        // ensure the onChange gets the whole picture.
        [key]: this.currentData[key], // keep the old value for key we are updating so
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

    return {
      ok: !errorMap.hasErrors,
      messages: [],
      details: errorMap.map,
    }
  }

  /**
   * @param {Partial<T>} data
   * @returns {{ edgePuts: Record<string, Node<{}>> , primitivePuts: Record<string, string|number> }}
   */
  splitPuts(data) {
    const edgePuts = {}
    const primitivePuts = {}

    for (const [key, value] of Object.entries(data)) {
      if (key in Utils.getEdgeLeaves(this.schema)) {
        edgePuts[key] = value
      } else {
        primitivePuts[key] = value
      }
    }

    return {
      edgePuts,
      primitivePuts,
    }
  }

  /**
   * @param {Partial<T>} data
   * @returns {Promise<PutResponse<T>>}
   */
  async put(data) {
    try {
      if (size(data) == 0) {
        return {
          ok: false,
          messages: ['Expected non empty object passed to node.put()'],
          details: {},
        }
      }

      const errorMap = new Utils.ErrorMap()

      for (const [key] of Object.entries(data)) {
        const keyIsPrimitive = key in Utils.getPrimitiveLeaves(this.schema)
        const keyIsEdge = key in Utils.getEdgeLeaves(this.schema)
        const isValidKey = keyIsEdge || keyIsPrimitive

        if (!isValidKey) {
          errorMap.puts(key, 'unexpected key')
        }
      }

      const { edgePuts, primitivePuts } = this.splitPuts(data)

      if (errorMap.hasErrors) {
        return {
          ok: false,
          messages: [],
          details: errorMap.map,
        }
      }

      const hasEdges = size(edgePuts) > 0
      const hasPrimitives = size(primitivePuts) > 0

      /** @type {import('./typings').PutResponse<{}>} */
      let edgeRes = { ok: true, messages: [], details: {} }
      /** @type {import('./typings').PutResponse<{}>} */
      let primitiveRes = { ok: true, messages: [], details: {} }
      // It is more probable that an onChange() call for a reference has to
      // take a look at the primitives on its node than an onChange() call for a
      // primitive has to take a look at the references on that node.
      // Therefore we wait for the edge put's completion before writing
      // primitives.
      // we don't have to worry much about calling putEdge first because
      // putEdge() is only used for nulling out references, so it pretty much
      // will have an error only if there's an error from gun's part
      if (hasEdges) {
        edgeRes = await this.validateEdgePut(data)

        if (!edgeRes.ok) return edgeRes

        edgeRes = await new Promise(resolve => {
          this.gunInstance.put(data, ack => {
            resolve({
              ok: typeof ack.err == 'undefined',
              messages: typeof ack.err == 'string' ? [ack.err] : [],
              details: {},
            })
          })
        })

        if (!edgeRes.ok) return edgeRes
      }

      if (hasPrimitives) {
        primitiveRes = await this.validatePrimitivePut(data)

        if (!primitiveRes.ok) return primitiveRes

        primitiveRes = await new Promise(resolve => {
          this.gunInstance.put(data, ack => {
            resolve({
              ok: typeof ack.err == 'undefined',
              messages: typeof ack.err == 'string' ? [ack.err] : [],
              details: {},
            })
          })
        })
      }

      const finalRes = Utils.mergeResponses(edgeRes, primitiveRes)

      return finalRes
    } catch (e) {
      return {
        ok: false,
        messages: [Utils.reasonToString(e)],
        details: {},
      }
    }
  }

  /**
   * @template K
   * @param {keyof T} key
   */
  get(key) {
    const validKey =
      key in Utils.getEdgeLeaves(this.schema) ||
      key in Utils.getSetLeaves(this.schema)

    if (!validKey) {
      throw new Error(
        `Invalid key for get() call in ${
          this.schema[Utils.SCHEMA_NAME]
        } node. Got key: ${key}`,
      )
    }

    if (key in this.setNodes) {
      return this.setNodes[key]
    }

    return {
      /**
       * @param {Node<T[K]>} node
       * @returns {Promise<PutResponse<T>>}
       */
      put: async node => {
        const subschema = Utils.getEdgeLeaves(this.schema)[key]

        if (node.schema != subschema.type) {
          return {
            ok: false,
            messages: ['wrong type of edge'],
            details: {},
          }
        }

        const err = await subschema.onChange(this.currentData, node.currentData)

        if (err) {
          return {
            ok: false,
            messages: [],
            details: {
              [key]: typeof err == 'string' ? [err] : err,
            },
          }
        }

        return new Promise(resolve => {
          this.gunInstance.get(key).put(node.gunInstance, ack => {
            const ok = typeof ack.err == 'undefined'

            resolve({
              ok: typeof ack.err == 'undefined',
              messages: typeof ack.err == 'string' ? [ack.err] : [],
              details: {},
            })
          })
        }).catch(e => ({
          ok: false,
          messages: [Utils.reasonToString(e)],
          details: {},
        }))
      },
    }
  }

  /**
   * @param {Function} cb
   * @returns {void}
   */
  on(cb) {
    // TODO: fix memory leak
    this.subscribers.push(cb)
  }

  /**
   * @param {Function} cb
   * @returns {void}
   */
  off(cb) {
    const idx = this.subscribers.indexOf(cb)
    this.subscribers.splice(idx, 1)
  }

  /**
   * It also returns a promise.
   * @param {Function=} cb
   * @returns {Promise<object>}
   */
  async once(cb) {
    cb && cb(this.currentData)
    return new Promise(resolve => {
      resolve(this.currentData)
    })
  }
}
