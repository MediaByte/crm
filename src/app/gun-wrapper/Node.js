// @ts-check
import Gun from 'gun/gun'
import 'gun/lib/open'
import * as Utils from './Utils'
import size from 'lodash/size'
import SetNode from './SetNode'

// allow self to be undefined for intiial valuez?

/**
 * @typedef {import('./simple-typings').Ack} Ack
 * @typedef {import('./simple-typings').OnChangeReturn} SimpleOnChangeReturn
 * @typedef {import('./simple-typings').Data} Data
 * @typedef {import('./simple-typings').Response} Response
 * @typedef {import('./simple-typings').WrapperNode} WrapperNode
 * @typedef {import('./simple-typings').WrapperReferenceNode} WrapperReferenceNode
 * @typedef {import('./simple-typings').WrapperSetNode} WrapperSetNode
 * @typedef {import('./simple-typings').Schema} Schema'
 * @typedef {import('./simple-typings').Listener} Listener
 * @typedef {import('./simple-typings').Literal} Literal
 * @typedef {import('./simple-typings').Primitive} Primitive
 * @typedef {import('./simple-typings').EdgeLeaf} EdgeLeaf
 * @typedef {import('./simple-typings').PrimitiveLeaf} PrimitiveLeaf
 */

/**
 * @typedef {object} SplitPuts
 * @prop {Record<string, WrapperNode|null>} edgePuts
 * @prop {Record<string, Literal|null>} literalPuts
 * @prop {Record<string, Primitive|null>} primitivePuts
 */

/*******************************************************************************
 *******************************************************************************
 ******************************************************************************/

// validatee edge success before writing primitives

export {} // stop jsdoc comments from merging

const DEFAULT_ON_SET_CHANGE = () => Promise.resolve(false)

export class Node {
  /**
   * @param {Schema} schema
   * @param {object} gunInstance
   * @param {boolean=} isRoot
   * @param {((nextVal: Data) => SimpleOnChangeReturn)=} onSetChange
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
        'if a node is not root it must have an onChangeSet() provided since non-root nodes always belong to a set, if this is an spawned edge ref node provide a mock onSetChange()',
      )
    }

    this.schema = schema
    this.gunInstance = gunInstance
    this.onSetChange = onSetChange

    /**
     * @type {Data}
     */
    this.currentData = {}

    /** @type {Listener[]} */
    this.subscribers = []

    /**
     * @type {Record<string, WrapperSetNode>}
     */
    this.setNodes = {}

    /**
     * @type {Record<string, WrapperNode|undefined>}
     */
    this.spawnedNodes = {}

    for (const [key, setLeaf] of Object.entries(
      Utils.getSetLeaves(this.schema),
    )) {
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

    /**
     * @type {WrapperNode}
     */
    const instance = this
    // eslint-disable-next-line
    instance
  }

  /**
   * @param {Data} data
   */
  cachePut(data) {
    this.onOpen(data)
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

    Object.entries(Utils.getEdgeLeaves(this.schema)).forEach(
      ([key, edgeLeaf]) => {
        if (!(key in nextData)) return

        const edgeSchema = edgeLeaf.type
        const itemReceived = nextData[key]

        if (
          itemReceived === null ||
          Utils.conformsToSchema(edgeSchema, itemReceived)
        ) {
          this.currentData[key] = itemReceived

          const spawnedNode = this.spawnedNodes[key]

          if (spawnedNode) {
            spawnedNode.cachePut(itemReceived)
          }
        }
      },
    )

    Object.entries(Utils.getPrimitiveLeaves(this.schema)).forEach(
      ([key, primitiveLeaf]) => {
        const { type } = primitiveLeaf

        if (!(key in nextData)) return

        const value = nextData[key]

        if (value === null || Utils.valueIsOfType(type, value)) {
          this.currentData[key] = value
        }
      },
    )

    Object.entries(Utils.getLiteralLeaves(this.schema)).forEach(
      ([key, literalLeaf]) => {
        if (!(key in nextData)) return

        const itemSchema = Utils.extractLiteralLeafType(literalLeaf)

        const value = nextData[key]

        if (!(key in nextData)) return

        if (value === null || Utils.conformsToSchema(itemSchema, value)) {
          this.currentData[key] = value
        }
      },
    )

    Object.entries(Utils.getSetLeaves(this.schema)).forEach(
      ([setKey, setLeaf]) => {
        if (setKey in nextData) {
          /**
           * @type {Record<string, Data>}
           */
          const itemsReceived = nextData[setKey]

          if (typeof itemsReceived !== 'object') {
            return
          }

          const [setItemSchema] = setLeaf.type

          for (const [itemKey, item] of Object.entries(itemsReceived)) {
            if (Utils.conformsToSchema(setItemSchema, item)) {
              // CAST: This gets set in
              const set = /** @type {Record<string, Data>} */ (this.currentData[
                setKey
              ])

              set[itemKey] = item
            }
          }

          this.setNodes[setKey].cachePut(itemsReceived)
        }
      },
    )

    this.subscribers.forEach(cb => cb(this.currentData))
  }

  // uses for putedge:
  // collections

  // references

  /**
   * @private
   * @param {Record<string, WrapperNode | null>} data
   * @returns {Promise<Response>}
   */
  async validateEdgePut(data) {
    const errorMap = new Utils.ErrorMap()

    for (const [key, wrapperNodeOrNull] of Object.entries(data)) {
      if (key in Utils.getEdgeLeaves(this.schema)) {
        if (wrapperNodeOrNull !== null) {
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

    const filteredData = /** @type {Record<string, null>} */ (data)

    const validationPromises = Object.entries(filteredData).map(
      ([key, value]) => {
        const subschema = /** @type {EdgeLeaf} */ (this.schema[key])

        const self = {
          ...this.currentData, // start with the cached objects
          ...filteredData, // actually provide the other values on this put() call to
          // ensure the onChange gets the whole picture.
          [key]: this.currentData[key], // keep the old value for key we are
          // updating so onChange() can compare it to the new value if needed.
        }

        return subschema.onChange(self, value).then(err => {
          // ignore empty arrays
          if (Array.isArray(err) && err.length) errorMap.puts(key, err)
          // don't ignore empty strings just in case
          if (typeof err === 'string') errorMap.puts(key, err)

          return err
        })
      },
    )

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
   * @param {Record<string, Primitive|null>} data
   * @returns {Promise<Response>}
   */
  async validatePrimitivePut(data) {
    const errorMap = new Utils.ErrorMap()

    // onChange() is guaranteed to receive the correct data type
    // so we check for that first and bail out early if the data isn't of the
    // correct types
    for (const [key, value] of Object.entries(data)) {
      if (key in Utils.getPrimitiveLeaves(this.schema)) {
        const type = /** @type {import('./simple-typings').PrimitiveLeaf['type']} */ (this
          .schema[key].type)

        if (value === null) {
          continue // it is up to the onChange() handler to handle null
        }

        if (!Utils.valueIsOfType(type, value)) {
          const msg = `Must be ${type === 'number' ? 'a number' : 'text'}`

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

      const subschema = /** @type {PrimitiveLeaf} */ (this.schema[key])

      try {
        err = await subschema.onChange(self, /** @type {any} */ (value))
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
   * @param {Record<string, Literal|null>} data
   * @returns {Promise<Response>}
   */
  async validateLiteralPut(data) {
    const errorMap = new Utils.ErrorMap()
    const literalLeaves = Utils.getLiteralLeaves(this.schema)

    Object.keys(literalLeaves).forEach(key => {
      const leafTypeSchema = Utils.extractLiteralLeafType(literalLeaves[key])

      if (!(key in data)) return

      const value = data[key]

      if (value === null) return

      const conformsToSchema = Utils.conformsToSchema(leafTypeSchema, value)

      if (!conformsToSchema) {
        errorMap.puts(key, `literal at ${key} doesn't conform to schema`)
      }
    })

    // we'll do async validations later to enable returning sync validation
    // quicker if there was an error in there

    if (errorMap.hasErrors) {
      return {
        ok: false,
        messages: [],
        details: errorMap.map,
      }
    }

    /** @type {([ string , string[] ])[]} */
    const validations = await Promise.all(
      Object.keys(literalLeaves).map(async key => {
        const self = {
          ...this.currentData, // start with the cached objects
          ...data, // actually provide the other values on this put() call to
          // ensure the onChange gets the whole picture.
          [key]: this.currentData[key], // keep the old value for key we are
          // updating so onChange() can compare it to the new value if needed.
        }

        /** @type {string[]} */
        let err = []

        try {
          const maybeErr = await literalLeaves[key].onChange(self, data[key])

          if (Array.isArray(maybeErr)) {
            err = maybeErr
          }
        } catch (e) {
          err = [Utils.reasonToString(e)]
        }

        /** @type {[ string , string[] ]} */
        const res = [key, err]

        return res
      }),
    )

    validations.forEach(([key, errArr]) => {
      if (Array.isArray(errArr) && errArr.length) {
        errorMap.puts(key, errArr)
      }
    })

    return {
      ok: !errorMap.hasErrors,
      messages: [],
      details: errorMap.map,
    }
  }

  /**
   * @private
   * @param {Data} data
   * @returns {SplitPuts}
   */
  splitPuts(data) {
    /** @type {SplitPuts['edgePuts']} */
    const edgePuts = {}
    /** @type {SplitPuts['literalPuts']} */
    const literalPuts = {}
    /** @type {SplitPuts['primitivePuts']} */
    const primitivePuts = {}

    Object.keys(Utils.getEdgeLeaves(this.schema)).forEach(key => {
      if (key in data) {
        const value = /** @type {WrapperNode|null} */ (data[key])

        edgePuts[key] = value
      }
    })

    Object.keys(Utils.getLiteralLeaves(this.schema)).forEach(key => {
      if (key in data) {
        literalPuts[key] = /** @type {Literal|null} */ (data[key])
      }
    })

    Object.keys(Utils.getPrimitiveLeaves(this.schema)).forEach(key => {
      if (key in data) {
        // CAST: If it corresponds to a primitive key, it should hopefully be
        // an actual primitive or null, this however gets validated elsewhere.
        primitivePuts[key] = /** @type {Primitive|null} */ (data[key])
      }
    })

    return {
      edgePuts,
      literalPuts,
      primitivePuts,
    }
  }

  /**
   * @private
   * @param {Data} data
   * @returns {Promise<Response>}
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
        const keyIsLiteral = key in Utils.getLiteralLeaves(this.schema)
        const isValidKey = keyIsEdge || keyIsPrimitive || keyIsLiteral

        if (!isValidKey) {
          errorMap.puts(key, 'unexpected key')
        }
      }

      if (errorMap.hasErrors) {
        return {
          ok: false,
          messages: [],
          details: errorMap.map,
        }
      }

      const { edgePuts, literalPuts, primitivePuts } = this.splitPuts(data)

      const hasEdges = size(edgePuts) > 0
      const hasLiterals = size(literalPuts) > 0
      const hasPrimitives = size(primitivePuts) > 0

      /** @type {Response} */
      let edgeRes = { ok: true, messages: [], details: {} }
      /** @type {Response} */
      let literalRes = { ok: true, messages: [], details: {} }
      /** @type {Response} */
      let primitiveRes = { ok: true, messages: [], details: {} }

      // It is more probable that an onChange() call for a reference has to take
      // a look at the primitives and literals on its node than an onChange()
      // call for a primitive has to take a look at the references on that node.
      // Therefore we wait for the edge put's completion before writing
      // primitives. we don't have to worry much about calling putEdge first
      // because putEdge() is only used for nulling out references, so it pretty
      // much will have an error only if there's an error from gun's part
      if (hasEdges) {
        edgeRes = await this.validateEdgePut(edgePuts)

        if (!edgeRes.ok) return edgeRes
      }

      if (hasLiterals) {
        literalRes = await this.validateLiteralPut(literalPuts)

        if (!literalRes.ok) return literalRes
      }

      if (hasPrimitives) {
        primitiveRes = await this.validatePrimitivePut(primitivePuts)

        if (!primitiveRes.ok) return primitiveRes
      }

      const onSetChangeErr = await this.onSetChange({
        ...this.currentData,
        ...data,
      })

      if (Array.isArray(onSetChangeErr) && onSetChangeErr.length) {
        return {
          ok: false,
          messages: onSetChangeErr,
          details: {},
        }
      }

      if (hasEdges) {
        edgeRes = await new Promise(resolve => {
          /**
           * @param {Ack} ack
           */
          const cb = ack => {
            resolve({
              ok: typeof ack.err === 'undefined',
              messages: typeof ack.err === 'string' ? [ack.err] : [],
              details: {},
            })
          }

          this.gunInstance.put(edgePuts, cb)
        })

        if (!edgeRes.ok) return edgeRes
      }

      if (hasLiterals) {
        literalRes = await new Promise(resolve => {
          /**
           * @param {Ack} ack
           */
          const cb = ack => {
            resolve({
              ok: typeof ack.err === 'undefined',
              messages: typeof ack.err === 'string' ? [ack.err] : [],
              details: {},
            })
          }

          this.gunInstance.put(literalPuts, cb)
        })

        if (!literalRes.ok) return edgeRes
      }

      if (hasPrimitives) {
        primitiveRes = await new Promise(resolve => {
          /**
           * @param {Ack} ack
           */
          const cb = ack => {
            resolve({
              ok: typeof ack.err === 'undefined',
              messages: typeof ack.err === 'string' ? [ack.err] : [],
              details: {},
            })
          }

          this.gunInstance.put(data, cb)
        })

        if (!primitiveRes.ok) return primitiveRes
      }

      // TODO: Why did we merge again?
      const finalRes = Utils.mergeResponses(edgeRes, literalRes, primitiveRes)

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
   * @param {string} key
   * @returns {WrapperReferenceNode | WrapperSetNode}
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
       * @param {WrapperNode} node
       * @returns {Promise<Response>}
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
          /**
           * @param {Ack} ack
           */
          const cb = ack => {
            resolve({
              ok: typeof ack.err === 'undefined',
              messages: typeof ack.err === 'string' ? [ack.err] : [],
              details: {},
            })
          }

          this.gunInstance.get(key).put(node.gunInstance, cb)
        }).catch(e => ({
          ok: false,
          messages: [Utils.reasonToString(e)],
          details: {},
        }))
      },
    }
  }

  /**
   * Helps avoid the union type returned by get().
   * @param {string} edgeKey
   * @throws {ReferenceError} A runtimne check is performed to ensure the key
   * supplied belongs to an edge, if it doesn't, this error is thrown.
   * @returns {WrapperReferenceNode}
   */
  getEdge(edgeKey) {
    const edgeKeys = Object.keys(Utils.getEdgeLeaves(this.schema))

    if (!edgeKeys.includes(edgeKey)) {
      throw new ReferenceError(
        `Invalid key supplied to Node.prototype.getEdge(), expected a key belonging to en edge of this node, one of these: ${edgeKeys} but got: ${edgeKey}`,
      )
    }

    return /** @type {WrapperReferenceNode} */ (this.get(edgeKey))
  }

  /**
   * Returns a node corresponding to the edge chosen. Use them for acquiring
   * data from it or for setting it as references in other nodes. If the
   * edge is set to null, null will be returned.
   * @param {string} edgeKey
   * @throws {ReferenceError} A runtimne check is performed to ensure the key
   * supplied belongs to an edge, if it doesn't, this error is thrown.
   * @returns {WrapperNode|null}
   */
  getEdgeRef(edgeKey) {
    const edgeLeaves = Utils.getEdgeLeaves(this.schema)
    const edgeKeys = Object.keys(edgeLeaves)

    if (!edgeKeys.includes(edgeKey)) {
      throw new ReferenceError(
        `Invalid key supplied to Node.prototype.getEdge(), expected a key belonging to en edge of this node, one of these: ${edgeKeys} but got: ${edgeKey}`,
      )
    }

    const currentData = this.currentData[edgeKey]

    if (currentData === null) {
      return null
    }

    const theNode = new Node(
      edgeLeaves[edgeKey].type,
      this.gunInstance.get(edgeKey),
      false,
      () => Promise.resolve(undefined),
    )

    this.spawnedNodes[edgeKey] = theNode

    theNode.cachePut(/** @type {Data} */ (currentData))

    return theNode
  }

  /**
   * Helps avoid the union type returned by get().
   * @param {string} setKey
   * @throws {ReferenceError} A runtimne check is performed to ensure the key
   * supplied belongs to a set, if it doesn't, this error is thrown.
   * @returns {WrapperSetNode}
   */
  getSet(setKey) {
    const setKeys = Object.keys(Utils.getSetLeaves(this.schema))

    if (!setKeys.includes(setKey)) {
      throw new ReferenceError(
        `Invalid key supplied to Node.prototype.getSet(), expected a key belonging to a set child, one of these: ${setKeys} but got: ${setKey}`,
      )
    }

    return /** @type {WrapperSetNode} */ (this.get(setKey))
  }

  /**
   * @param {Listener} cb
   * @returns {void}
   */
  on(cb) {
    // TODO: fix memory leak
    cb(this.currentData)
    this.subscribers.push(cb)
  }

  /**
   * @param {Listener=} cb
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
