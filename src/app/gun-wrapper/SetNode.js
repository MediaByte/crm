// @ts-check
import * as Utils from './Utils'

import { Node } from './Node'

export {} // stop jsdoc comments from merging

/**
 * @typedef {import('./simple-typings').Schema} Schema
 * @typedef {import('./simple-typings').EdgeLeaf} EdgeLeaf
 * @typedef {import('./simple-typings').Data} Data
 * @typedef {import('./simple-typings').Response} Response
 * @typedef {import('./simple-typings').GunCallback} GunCallback
 * @typedef {import('./simple-typings').SetResponse} SetResponse
 * @typedef {import('./simple-typings').WrapperNode} WrapperNode
 * @typedef {import('./simple-typings').WrapperSetNode} WrapperSetNode
 * @typedef {import('./simple-typings').OnChangeReturn} OnChangeReturn
 * @typedef {import('./simple-typings').Listener} Listener
 * @typedef {import('./simple-typings').ValidPut} ValidPut
 * @typedef {import('./simple-typings').Primitive} Primitive
 * @typedef {import('./simple-typings').PrimitiveLeaf} PrimitiveLeaf
 * @typedef {import('./simple-typings').Literal} Literal
 * @typedef {import('./simple-typings').LiteralLeaf} LiteralLeaf
 * @typedef {import('./simple-typings').ValidSetPut} ValidSetPut
 */

export {} // stop jsdoc comments from merging

export default class SetNode {
  /**
   * @param {Schema} itemSchema
   * @param {object} gunInstance
   * @param {(nextVal: Data, key?: string) => OnChangeReturn} setOnChange
   */
  constructor(itemSchema, gunInstance, setOnChange) {
    if (!Utils.isSchema(itemSchema)) {
      throw new TypeError('invalid schema SetNode()')
    }

    /**
     * @private
     */
    this.itemSchema = itemSchema

    this.gunInstance = gunInstance

    /**
     * @type {Listener[]}
     */
    this.subscribers = []

    /**
     * @type {Record<string, Data>}
     */
    this.currentData = {}

    this.setOnChange = setOnChange

    /** @type {WrapperSetNode} */
    const instance = this
    // eslint-disable-next-line
    instance
  }

  /**
   * @protected
   * @param {Record<string, Data>} nextData
   * @returns {void}
   */
  cachePut(nextData) {
    for (const [key, value] of Object.entries(nextData)) {
      if (Utils.conformsToSchema(this.itemSchema, value)) {
        this.currentData[key] = value
      }
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
   * @param {ValidSetPut} object
   * @returns {Promise<SetResponse>}
   */
  async set(object) {
    const validationRes = await this.isValidSet(object)

    // need to do it this way otherwise typescript borks out
    if (!validationRes.ok) {
      return {
        ok: false,
        details: validationRes.details,
        messages: validationRes.messages,
      }
    }

    /**
     * @type {Record<string, Primitive|Literal|null|{}>}
     */
    const primitiveSetsAndLiteralsData = {}

    /**
     * @type {Record<string, object|null>}
     */
    const edgeData = {}

    Object.keys(Utils.getEdgeLeaves(this.itemSchema)).forEach(key => {
      // CAST: Already validated in isValidSet()
      const value = /** @type {WrapperNode|null}  */ (object[key])
      edgeData[key] = value === null ? null : value.gunInstance
    })

    Object.keys(Utils.getPrimitiveLeaves(this.itemSchema))
      .concat(Object.keys(Utils.getLiteralLeaves(this.itemSchema)))
      .forEach(key => {
        // CAST: Already validated in isValidSet()
        primitiveSetsAndLiteralsData[key] =
          /** @typedef {Primitive|Literal|null} */ object[key]
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
            gunRef = this.gunInstance.set(
              primitiveSetsAndLiteralsData,
              /** @type {GunCallback} */ (ack => {
                resolve({
                  ok: typeof ack.err === 'undefined',
                  messages: typeof ack.err === 'string' ? [ack.err] : [],
                  details: {},
                })
              }),
            )
          }),
        )

        for (const [k, edge] of Object.entries(edgeData)) {
          writes.push(
            // eslint-disable-next-line no-loop-func
            new Promise(resolve => {
              gunRef.get(k).put(
                edge,
                /** @type {GunCallback} */ (ack => {
                  resolve({
                    ok: typeof ack.err === 'undefined',
                    messages: [],
                    details: {
                      [k]: typeof ack.err === 'string' ? [ack.err] : [],
                    },
                  })
                }),
              )
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
            ok: true, // typescript borks out otherwise
            reference: wrapperRef,
          })
        } else {
          resolve({
            ...res,
            ok: false,
          })
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
      throw new ReferenceError(
        `unexistant key in SetNode.get(), in set: ${
          this.itemSchema[Utils.SCHEMA_NAME]
        }, got key: ${setKey} --  currentData: ${JSON.stringify(
          this.currentData,
        )}`,
      )
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

  // 88           8b           d8            88  88           88   ad88888ba
  // ""           `8b         d8'            88  ""           88  d8"     "8b                ,d
  //               `8b       d8'             88               88  Y8,                        88
  // 88  ,adPPYba,  `8b     d8'  ,adPPYYba,  88  88   ,adPPYb,88  `Y8aaaaa,     ,adPPYba,  MM88MMM
  // 88  I8[    ""   `8b   d8'   ""     `Y8  88  88  a8"    `Y88    `"""""8b,  a8P_____88    88
  // 88   `"Y8ba,     `8b d8'    ,adPPPPP88  88  88  8b       88          `8b  8PP"""""""    88
  // 88  aa    ]8I     `888'     88,    ,88  88  88  "8a,   ,d88  Y8a     a8P  "8b,   ,aa    88,
  // 88  `"YbbdP"'      `8'      `"8bbdP"Y8  88  88   `"8bbdP"Y8   "Y88888P"    `"Ybbd8"'    "Y888

  /**
   * Validates an object according to an schema
   * @param {ValidSetPut} objectData
   * @returns {Promise<Response>}
   */
  async isValidSet(objectData) {
    const errorMap = new Utils.ErrorMap()

    const primitiveLeaves = Utils.getPrimitiveLeaves(this.itemSchema)
    const literalLeaves = Utils.getLiteralLeaves(this.itemSchema)
    const edgeLeaves = Utils.getEdgeLeaves(this.itemSchema)

    Object.keys(objectData).forEach(key => {
      const isValidKey =
        key in primitiveLeaves || key in literalLeaves || key in edgeLeaves

      if (!isValidKey) {
        errorMap.puts(key, 'unexpected key')
      }
    })

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

      const isNull = value === null

      const isCorrectType = Utils.valueIsOfType(leaf.type, objectData[key])

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
          `wrong data layout for literal given to SetNode.set(), schema: ${JSON.stringify(
            literalLeafType,
            null,
            4,
          )} -- data: ${JSON.stringify(objectData[key], null, 4)}`,
        )
      }
    })

    Object.entries(edgeLeaves).forEach(([key, leaf]) => {
      if (!(key in objectData)) {
        errorMap.puts(key, 'must initialize to a reference or a null value')

        return // continue
      }

      const value = objectData[key]

      //  @ts-ignore stupid instanceof typescript rule
      if (value !== null && !(value instanceof Node)) {
        errorMap.puts(key, 'must initialize to a reference or a null value')
      }

      const itemSchema = leaf.type

      const conformsToSchema =
        value === null
          ? true
          : Utils.conformsToSchema(
              itemSchema,
              // CAST: we already verify above that this is an instance of Node
              /** @type {WrapperNode} */ (value).currentData,
            )

      if (!value === null && !conformsToSchema) {
        errorMap.puts(key, 'wrong node type received for reference')
      }
    })

    if (errorMap.hasErrors) {
      return {
        ok: false,
        messages: [],
        details: errorMap.map,
      }
    }

    ////////////////////////////////////////////////////////////////////////////

    /**
     * @type {Record<string, OnChangeReturn>}
     */
    const validations = {}

    const setItemSchema = this.itemSchema

    // now validate the whole object against the setSchemaLeaf, this allows
    // for example, to prevent 2 items with the same value for a property and
    // what not

    const objectDataWithEmptySets = {
      ...objectData,
    }

    Object.keys(Utils.getSetLeaves(this.itemSchema)).forEach(k => {
      objectDataWithEmptySets[k] = {}
    })

    /**
     * @type {Data}
     */
    const objForValidation = {}

    for (const [key, value] of Object.entries(objectDataWithEmptySets)) {
      if (key in edgeLeaves) {
        // CAST: Already validated in isValidSet()
        objForValidation[key] =
          value === null ? null : /** @type {WrapperNode} */ (value).currentData
      } else {
        objForValidation[key] = /** @type {Literal|Primitive} */ (value)
      }
    }

    // validate the node itself
    for (const k of Object.keys(objectData)) {
      const leaf =
        /** @type {PrimitiveLeaf|EdgeLeaf|LiteralLeaf} */ (setItemSchema[k])

      validations[k] = leaf.onChange(
        {
          ...objForValidation,
          [k]: undefined,
        },
        /** @type {any} */ (objForValidation[k]),
      )
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

    const err = await this.setOnChange(objForValidation)

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
  } // isValidSet()

  /**
   * @param {Listener} cb
   * @returns {void}
   */
  on(cb) {
    cb(this.currentData)

    this.subscribers.push(cb)
  }

  /**
   * @param {Listener} cb
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
