// @ts-check
import Gun from 'gun/gun'
import 'gun/lib/open'
import * as Utils from './Utils'
import size from 'lodash/size'
import SetNode from './SetNode'

// allow self to be undefined for intiial valuez?

/**
 * @typedef {import('./simple-typings').OnChangeReturn} SimpleOnChangeReturn
 * @typedef {import('./simple-typings').Node} SimpleNode
 */

/**
 * @typedef {import('./typings').Leaf<any>} Leaf
 *
 * @typedef {import('./SetNode').default<{}>} SetNode
 */

/**
 * @template T
 * @typedef {import('./typings').Schema<T>} Schema
 */

/**
 * @template T
 * @typedef {import('./typings').PutResponse<T>} PutResponse
 */

/**
 * @template T
 * @typedef {import('./typings').SetNodes<T>} SetNodes
 */

/*******************************************************************************
 *******************************************************************************
 ******************************************************************************/

// validatee edge success before writing primitives

export {} // stop jsdoc comments from merging

const DEFAULT_ON_SET_CHANGE = () => Promise.resolve(false)

/**
 * @template T
 */
export class Node {
  /**
   * @param {Schema<T>} schema
   * @param {object} gunInstance
   * @param {boolean=} isRoot
   * @param {((nextVal: SimpleNode|null) => SimpleOnChangeReturn)=} onSetChange
   */
  constructor(
    schema,
    gunInstance,
    isRoot = true,
    onSetChange = DEFAULT_ON_SET_CHANGE,
  ) {
    if (!Utils.isSchema(schema)) {
      throw new TypeError('invalid schema')
    }

    if (!(gunInstance instanceof Gun)) {
      throw new TypeError('invalid gunInstance')
    }

    if (isRoot && onSetChange !== DEFAULT_ON_SET_CHANGE) {
      throw new TypeError(
        'node cannot be root and not have the default onSetChange() at the same time, root nodes do not belong to any set therefore cannt actually have an onSetChange() attached to them',
      )
    }

    if (!isRoot && onSetChange === DEFAULT_ON_SET_CHANGE) {
      throw new TypeError(
        'if a node is not root it must have an onChangeSet() provided since non-root nodes always belong to a set',
      )
    }

    this.schema = schema
    this.gunInstance = gunInstance
    this.onSetChange = onSetChange

    /**
     * @type {T}
     */
    // @ts-ignore
    this.currentData = {}

    /** @type {Function[]} */
    this.subscribers = []

    /**
     * @type {Record<keyof T, SetNode<T[keyof T]>>}
     */
    // @ts-ignore
    this.setNodes = {}

    for (const [key, setLeaf] of Object.entries(
      Utils.getSetLeaves(this.schema),
    )) {
      // @ts-ignore
      this.setNodes[key] = new SetNode(
        setLeaf.type[0],
        this.gunInstance.get(key),
        (nextVal, key) => setLeaf.onChange(this.currentData, nextVal, key),
      )

      this.currentData[key] = {}
    }

    this.onOpen = this.onOpen.bind(this)

    if (isRoot) {
      this.gunInstance.open(this.onOpen)
    }

    this.isRoot = isRoot
  }

  /**
   * @private
   * @param {object} nextData
   */
  onOpen(nextData) {
    // TODO: Optimize set updating according to schema on a per item basis

    // when the node is the root one, we don't have to wait before all of the
    // data is available befor notifying the subscribers
    // TODO: de-duplicate primitive validation logic that also happens to be in
    // Utils.conformsToSchema()
    if (this.isRoot) {
      for (const [k, leaf] of Object.entries(this.schema)) {
        const isPrimitive = leaf.type === 'string' || leaf.type === 'number'
        const dataReceived = typeof nextData[k] !== 'undefined'

        if (!dataReceived) {
          continue
        }

        if (isPrimitive) {
          this.currentData[k] = nextData[k]
        } else {
          const isObj = typeof nextData[k] === 'object'
          // sanity check
          if (!isObj) {
            continue
          }

          const isSet = Array.isArray(leaf.type)

          if (isSet) {
            const allItemsInSetConform = Object.values(nextData[k]).every(
              item => Utils.conformsToSchema(leaf.type[0], item),
            )

            if (allItemsInSetConform) {
              this.currentData[k] = nextData[k]
              this.setNodes[k].cachePut(nextData[k])
            }
          } else {
            // it's an edge
            if (Utils.conformsToSchema(leaf.type, nextData[k])) {
              this.currentData[k] = nextData[k]
            }
          }
        }
      }

      this.subscribers.forEach(cb => cb(this.currentData))
    }
  }

  // uses for putedge:
  // collections

  // references

  /**
   * @private
   * @param {object} data
   * @returns {Promise<PutResponse<T>>}
   */
  async validateEdgePut(data) {
    /**
     * @type {Utils.ErrorMap<T>}
     */
    const errorMap = new Utils.ErrorMap()

    for (const [key, value] of Object.entries(data)) {
      if (key in Utils.getEdgeLeaves(this.schema)) {
        if (value !== null) {
          // @ts-ignore
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
      // @ts-ignore
      const subschema = this.schema[key]

      const self = {
        ...this.currentData, // start with the cached objects
        ...data, // actually provide the other values on this put() call to
        // ensure the onChange gets the whole picture.
        // @ts-ignore
        [key]: this.currentData[key], // keep the old value for key we are
        // updating so onChange() can compare it to the new value if needed.
      }

      // @ts-ignore
      return subschema.onChange(self, value).then(err => {
        // ignore empty arrays
        // @ts-ignore
        if (Array.isArray(err) && err.length) errorMap.puts(key, err)
        // don't ignore empty strings just in case
        // @ts-ignore
        if (typeof err === 'string') errorMap.puts(key, err)

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
   * @private
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
        if (value === null) {
          continue // it is up to the onChange() handler to handle null
        }
        // @ts-ignore
        if (!Utils.valueIsOfType(this.schema[key].type, value)) {
          const msg = `Must be ${
            // @ts-ignore
            this.schema[key].type === 'number' ? 'a number' : 'text'
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
        // @ts-ignore
        [key]: this.currentData[key], // keep the old value for key we are updating so
        // onChange() can compare it to the new value if
        // needed.
      }

      let err

      try {
        // @ts-ignore
        err = await this.schema[key].onChange(self, value)
      } catch (e) {
        err = Utils.reasonToString(e)
      }

      // ignore empty arrays
      if (Array.isArray(err) && err.length) errorMap.puts(key, err)
      if (typeof err === 'string') errorMap.puts(key, err)
    }

    return {
      ok: !errorMap.hasErrors,
      messages: [],
      details: errorMap.map,
    }
  }

  /**
   * @private
   * @param {Partial<T>} data
   * @returns {{ edgePuts: Record<string, Node<{}>|null> , primitivePuts: Record<string, string|number|null> }}
   */
  splitPuts(data) {
    const edgePuts = {}
    const primitivePuts = {}

    for (const [key, value] of Object.entries(data)) {
      if (key in Utils.getEdgeLeaves(this.schema)) {
        // @ts-ignore
        edgePuts[key] = value
      } else {
        // @ts-ignore
        primitivePuts[key] = value
      }
    }

    return {
      // @ts-ignore
      edgePuts,
      // @ts-ignore
      primitivePuts,
    }
  }

  /**
   * @private
   * @param {Partial<T>} data
   * @returns {Promise<PutResponse<T>>}
   */
  async put(data) {
    try {
      if (size(data) === 0) {
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

        // @ts-ignore
        if (!edgeRes.ok) return edgeRes
      }

      if (hasPrimitives) {
        primitiveRes = await this.validatePrimitivePut(data)

        // @ts-ignore
        if (!primitiveRes.ok) return primitiveRes
      }

      if (hasEdges) {
        edgeRes = await new Promise(resolve => {
          // @ts-ignore
          this.gunInstance.put(data, ack => {
            resolve({
              ok: typeof ack.err === 'undefined',
              messages: typeof ack.err === 'string' ? [ack.err] : [],
              details: {},
            })
          })
        })

        // @ts-ignore
        if (!edgeRes.ok) return edgeRes
      }

      if (hasPrimitives) {
        primitiveRes = await new Promise(resolve => {
          // @ts-ignore
          this.gunInstance.put(data, ack => {
            resolve({
              ok: typeof ack.err === 'undefined',
              messages: typeof ack.err === 'string' ? [ack.err] : [],
              details: {},
            })
          })
        })

        // @ts-ignore
        if (!primitiveRes.ok) return primitiveRes
      }

      const onSetChangeErr = await this.onSetChange({
        ...this.currentData,
        ...data,
      })

      if (onSetChangeErr) {
        return {
          ok: false,
          messages: onSetChangeErr,
          details: {},
        }
      }

      // TODO: Why did we merge again?
      const finalRes = Utils.mergeResponses(edgeRes, primitiveRes)

      // @ts-ignore
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
   * @returns {import('./typings').ReferenceNode<T[K]> | SetNode<T[K]>}
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
      // @ts-ignore
      return this.setNodes[key]
    }

    return {
      /**
       * @param {Node<T[K]>} node
       * @returns {Promise<PutResponse<T[K]>>}
       */
      put: async node => {
        const subschema = Utils.getEdgeLeaves(this.schema)[key]

        if (node.schema !== subschema.type) {
          return {
            ok: false,
            messages: ['wrong type of edge'],
            details: {},
          }
        }

        let err = await subschema.onChange(this.currentData, node.currentData)

        if (Array.isArray(err)) {
          // @ts-ignore
          return {
            ok: false,
            messages: [],
            details: {
              [key]: typeof err === 'string' ? [err] : err,
            },
          }
        }

        // now check against the owner set's onChange

        err = await this.onSetChange(node.currentData)

        if (err) {
          return {
            ok: false,
            messages: /** @type {string[]} */ (err),
            details: {},
          }
        }

        return new Promise(resolve => {
          // @ts-ignore
          this.gunInstance.get(key).put(node.gunInstance, ack => {
            resolve({
              ok: typeof ack.err === 'undefined',
              messages: typeof ack.err === 'string' ? [ack.err] : [],
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
    cb(this.currentData)
    this.subscribers.push(cb)
  }

  /**
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

/**
 * @template T
 * @param {Schema<T>} schema
 * @param {object} gunInstance
 * @returns {Record<keyof T, SetNode<{}>>}
 */
export const getSetNodes = (schema, gunInstance) => {
  const setNodes = {}

  for (const [key, setLeaf] of Object.entries(Utils.getSetLeaves(schema))) {
    // @ts-ignore
    setNodes[key] = new SetNode(setLeaf, gunInstance.get(key))
  }

  // @ts-ignore
  return setNodes
}
