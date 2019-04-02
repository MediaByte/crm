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
 * @typedef {import('./simple-typings').SetResponse} SetResponse
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
   * @param {SimpleNode} object
   * @returns {Promise<SetResponse>}
   */
  async set(object) {
    const validationRes = await this.isValidSet(object)

    if (!validationRes.ok) {
      return validationRes
    }

    const primitiveSetsAndLiteralsData = {}
    const edgeData = {}

    Object.keys(Utils.getEdgeLeaves(this.itemSchema)).forEach(key => {})

    Object.keys(Utils.getPrimitiveLeaves(this.itemSchema))
      .concat(Object.keys(Utils.getLiteralLeaves(this.itemSchema)))
      .forEach(key => {
        primitiveSetsAndLiteralsData[key] = object[key]
      })

    // add empty sets to primitive put
    Object.keys(Utils.getSetLeaves(this.itemSchema)).forEach(k => {
      primitiveSetsAndLiteralsData[k] = {}
    })

    return new Promise(async resolve => {
      try {
        const writes = []

        /** @type {object} */
        let gunRef

        writes.push(
          new Promise(resolve => {
            gunRef = this.gunInstance.set(primitiveSetsAndLiteralsData, ack => {
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
              gunRef.get(k).put(edge, ack => {
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

        const res = Utils.mergeResponses(...writeResults)

        const refKey = gunRef._.get

        const wrapperRef = new Node(
          this.itemSchema,
          gunRef,
          false,
          nextValOrNull => this.setOnChange(nextValOrNull, refKey),
        )

        wrapperRef.currentData = primitiveSetsAndLiteralsData

        Object.entries(edgeData).forEach(([k, n]) => {
          wrapperRef.currentData[k] = n.currentData
        })

        if (res.ok) {
          resolve({
            ...res,
            reference: wrapperRef,
          })
        } else {
          resolve(res)
        }
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
   * @param {SimpleNode} objectData
   * @returns {Promise<Response>}
   */
  async isValidSet(objectData) {
    const errorMap = new Utils.ErrorMap()

    const primitiveLeaves = Utils.getPrimitiveLeaves(this.itemSchema)
    const literalLeaves = Utils.getLiteralLeaves(this.itemSchema)
    const edgeLeaves = Utils.getEdgeLeaves(this.itemSchema)
    const setLeaves = Utils.getSetLeaves(this.itemSchema)

    Object.entries(primitiveLeaves).forEach(([key, leaf]) => {
      if (!(key in objectData)) {
        errorMap.puts(
          key,
          `missing key: ${key} in setNode for ${
            this.itemSchema[Utils.SCHEMA_NAME]
          }, all keys of the initial value for a node (except sub-sets) must be initialized to either null, a primitive or a reference to a node`,
        )

        return // continue
      }

      const value = objectData[key]

      const isNull = value == null

      const isCorrectType = Utils.valueIsOfType(
        // @ts-ignore
        leaf.type,
        // @ts-ignore
        objectData[key],
      )

      if (!isNull && !isCorrectType) {
        errorMap.puts(key, `wrong data type or empty string`)
      }
    })

    Object.entries(literalLeaves).forEach(([key, leaf]) => {
      if (!(key in objectData)) {
        errorMap.puts(
          key,
          `missing key: ${key} in setNode for ${
            this.itemSchema[Utils.SCHEMA_NAME]
          }, all keys of the initial value for a node (except sub-sets) must be initialized to either null, a primitive or a reference to a node`,
        )

        return // continue
      }

      const literalLeafType = Utils.extractLiteralLeafType(leaf)

      if (!Utils.conformsToSchema(literalLeafType, objectData[key])) {
        errorMap.puts(
          key,
          `wrong data layout for literal given to SetNode.set()`,
        )
      }
    })

    Object.entries(edgeLeaves).forEach(([key, leaf]) => {
      if (!(key in objectData)) {
        errorMap.puts(key, 'must initialize to a reference or a null value')

        return // continue
      }

      const value = objectData[key]
      const itemSchema = leaf.type

      const valueIsNull = value === null
      const conformsToSchema = valueIsNull
        ? true
        : Utils.conformsToSchema(itemSchema, value.currentData)

      if (!valueIsNull && !conformsToSchema) {
        errorMap.puts(key, 'wrong node type received for reference')
      }
    })

    Object.entries(setLeaves).forEach(([key, leaf]) => {
      if (key in objectData) {
        errorMap.puts(
          key,
          `value given for sub-set node, this value must not be initialized as it will be automatically be initialized to empty and populated by data from peers`,
        )
      }
    })

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

    const setItemSchema = this.itemSchema

    // validate the node itself
    for (const key of Object.keys(objectData)) {
      const self = {
        // give all other data to the onChange() call if it needs to look at it
        ...objectData,
        [key]: undefined, // signals that this is a new node being created
      }

      // @ts-ignore
      validations[key] = setItemSchema[key].onChange(self, objectData[key])
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
