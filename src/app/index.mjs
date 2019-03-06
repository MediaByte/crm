// @ts-check
//import Gun from 'gun'
import * as Utils from './Utils'
import size from 'lodash/size'

// allow self to be undefined for intiial valuez?

/**
 * @typedef {import('./typings').Leaf<any>} Leaf
 * @typedef {import('./typings').Schema} Schema
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
  constructor(schema, gunInstance) {
    this.schema = schema
    this.gunInstance = gunInstance
    /**
     * @type {Record<keyof T, string|number|object>}
     */
    this.cache = {}
    /**
     * @type {Record<keyof T, import('./typings')._referenceLeaf<{}, {}>}
     */
    this.edgeSchemas = {}
    /**
     * @type {Record<keyof T, Leaf>}
     */
    this.leafSchemas = {}
    /** @type {Function[]} */
    this.subscribers = []
    /**
     * @type {Partial<Record<keyof T, Node>>}
     */
    this.edgeNodes = {}

    if (!isSchema(schema)) {
      throw new TypeError()
    }

    for (const [key, leafOrSubschema] of Object.entries(schema)) {
      if (typeof leafOrSubschema.type === 'string') {
        this.leafSchemas[key] = leafOrSubschema
      } else if (typeof leafOrSubschema.type === 'object') {
        this.edgeSchemas[key] = leafOrSubschema
      } else {
        throw new TypeError('invalid schema')
      }
    }

    this.gunInstance.on(
      nodeValue => {
        for (const [key, value] of Object.entries(nodeValue)) {
          if (key in this.leafSchemas) {
            this._cachePut({
              [key]: value,
            })
          } else if (key in this.edgeSchemas) {
            this._cachePut({
              [key]: value == null ? null : this.edgeNodes[key].cache,
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
      },
      {
        // delta updates
        change: true,
      },
    )
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
      if (key in this.edgeSchemas) {
        if (value !== null) {
          errorMap.put(key, 'can only be null')
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
        ...this.cache, // start with the cached objects
        ...data, // actually provide the other values on this put() call to
        // ensure the onChange gets the whole picture.
        [key]: this.cache[key], // keep the old value for key we are updating so
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
   *
   * @param {Partial<T>} data
   * @returns {Promise<PutResponse<T>>}
   */
  async validatePrimitivePut(data) {
    const errorMap = new Utils.ErrorMap()

    // onChange() is guaranteed to receive the correct data type
    // so we check for that first and bail out early if the data isn't of the
    // correct types
    for (const [key, value] of Object.entries(data)) {
      if (key in this.leafSchemas) {
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

    return {
      ok: !errorMap.hasErrors,
      messages: [],
      details: errorMap.map,
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

      const primitivePuts = {}
      const edgePuts = {}

      for (const [key, value] of Object.entries(data)) {
        if (!(key in this.schema)) {
          errorMap.puts(key, 'unexpected key')
        }

        if (key in this.edgeSchemas) {
          edgePuts[key] = value
        } else {
          primitivePuts[key] = value
        }
      }

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

      const finalRes = mergeResponses(edgeRes, primitiveRes)

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
    if (!(key in this.edgeSchemas)) {
      throw new Error(
        `Invalid key for get() call in ${
          this.schema[Utils.SCHEMA_NAME]
        } node. Got key: ${key}`,
      )
    }

    return {
      /**
       * @param {Node<T[K]>} node
       * @returns {Promise<PutResponse<T>>}
       */
      put: async node => {
        const subschema = this.edgeSchemas[key]

        if (node.schema != subschema.type) {
          return {
            ok: false,
            messages: ['wrong type of edge'],
            details: {},
          }
        }

        const err = await subschema.onChange(this.cache, node.cache)

        let ok = true
        /** @type {string|string[]} */
        let messages = []

        if (typeof err == 'string') {
          // don't ignore empty strings, just in case.
          ok = false
          message = err
        }

        if (Array.isArray(err)) {
          ok = err.length > 0
          messages = err
        }

        if (ok) {
          // gunInstance.on() will fire before this promise resolves, therefore
          // we preemptively add the node to the edges so _onChange() can
          // actually retrieve its value
          this.edgeNodes[key] = node
          return new Promise(resolve => {
            this.gunInstance.get(key).put(node.gunInstance, ack => {
              const ok = typeof ack.err == 'undefined'

              if (!ok) this.edgeNodes[key] = null

              resolve({
                ok: typeof ack.err == 'undefined',
                messages: typeof ack.err == 'string' ? [ack.err] : [],
                details: {},
              })
            })
          }).catch(e => {
            this.edgeNodes[key] = null

            return {
              ok: false,
              messages: [Utils.reasonToString(e)],
              details: {},
            }
          })
        }

        return Promise.resolve({
          ok,
          messages,
          details: {},
        })
      },
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
    // avoid broadcasting cache if the whole object hasn't been received from
    // gun yet
    if (Object.keys(this.cache).length == Object.keys(this.schema).length) {
      this.subscribers.forEach(cb => cb(this.cache))
    }
  }

  /**
   * @param {Function} cb
   * @returns {void}
   */
  on(cb) {
    this.subscribers.push(cb)
  }

  /**
   * It also returns a promise.
   * @param {Function} cb
   * @returns {Promise<object>}
   */
  async once(cb) {
    cb(this.cache)
    return new Promise(resolve => {
      resolve(this.cache)
    })
  }

  /**
   * @returns {void}
   */
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
 *
 * @param {import('./typings').PutResponse<{}>[]} responses
 * @returns {import('./typings').PutResponse<{}>}
 */
const mergeResponses = (...responses) =>
  responses.reduce((finalRes, nextRes) => ({
    ok: finalRes.ok && nextRes.ok,
    messages: finalRes.messages.concat(nextRes.messages),
    details: _mergeResponseDetails(finalRes.details, nextRes.details),
  }))

/**
 *
 * @param {Array<import('./typings').PutResponse<{}>['details']>} detailsObjects
 */
const _mergeResponseDetails = (...detailsObjects) =>
  detailsObjects.reduce((finalDetails, nextDetails) => ({
    ...finalDetails,
    ...nextDetails,
  }))
