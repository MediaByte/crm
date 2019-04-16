// @ts-check
import flattenDeep from 'lodash/flattenDeep'
import size from 'lodash/size'

/**
 * @typedef {import('./simple-typings').LiteralLeaf} LiteralLeaf
 * @typedef {import('./simple-typings').Schema} SimpleSchema
 */

/**
 * @template T
 * @typedef {import('./typings').SetNodes<T>} SetNodes
 */

/**
 * @template T
 * @typedef {import('./typings').StringLeaf<T>} StringLeaf
 */

/**
 * @template T
 * @typedef {import('./typings').NumberLeaf<T>} NumberLeaf
 */

/**
 * @template T
 * @template RT
 * @typedef {import('./typings').ReferenceLeaf<T, RT>} ReferenceLeaf
 */

/**
 * @template T
 * @typedef {import('./typings').SetLeaf<T>} SetLeaf
 */

/**
 * @template T
 * @template RT
 * @typedef {import('./typings').Leaf<T, RT>} Leaf
 */

/**
 * @template T
 * @typedef {import('./typings').Schema<T>} Schema
 */

export {} // stop jsdoc comments from merging

export const SCHEMA_NAME = Symbol('SCHEMA_NAME')

/**
 * @param {'number'|'string'|'boolean'} type
 * @param {any} value
 * @returns {boolean} Returns false for empty strings.
 * @throws {TypeError}
 */
export const valueIsOfType = (type, value) => {
  const map = {
    /** @param {any} value */
    number: value => typeof value === 'number',

    /** @param {any} value */
    string: value => typeof value === 'string' && value.length > 0,

    /** @param {any} value */
    boolean: value => typeof value === 'boolean',
  }

  if (!(type in map)) {
    throw new TypeError(
      `valueIsOfType: illegal argument given for type parameter, expected ${Object.keys(
        map,
      ).toString()} but got: ${JSON.stringify(type)}`,
    )
  }

  return map[type](value)
}

/**
 * @param {any} reason
 * @returns {string}
 */
export const reasonToString = reason => {
  if (typeof reason === 'string') return reason
  if (typeof reason.message === 'string') return reason.message
  return 'Unknown error'
}

/**
 * @template T
 */
export class ErrorMap {
  constructor() {
    this.hasErrors = false

    /**
     * @type {Record<string, string[]>}
     */
    // @ts-ignore
    this.map = {}
  }

  /**
   * Arguments after the first one can be either strings or array of strings.
   * All will be flattened to.
   * @param {string} key
   * @returns {void}
   */
  puts(key) {
    if (!this.map[key]) this.map[key] = []

    const msgs = flattenDeep(Array.from(arguments).slice(1))

    if (msgs.length) {
      this.map[key].push(...msgs)
      this.hasErrors = true
    }
  }
}

/**
 * @param {import('./typings').PutResponse<{}>[]} responses
 * @returns {import('./typings').PutResponse<{}>}
 */
export const mergeResponses = (...responses) =>
  responses.reduce((finalRes, nextRes) => ({
    ok: finalRes.ok && nextRes.ok,
    messages: finalRes.messages.concat(nextRes.messages),
    details: _mergeResponseDetails(finalRes.details, nextRes.details),
  }))

/**
 * @param {Array<import('./typings').PutResponse<{}>['details']>} detailsObjects
 * @returns {import('./typings').PutResponse<{}>['details']}
 */
const _mergeResponseDetails = (...detailsObjects) => {
  const finalDetails = {}

  detailsObjects.forEach(dObj => {
    for (const [key, msgs] of Object.entries(dObj)) {
      // @ts-ignore
      if (!finalDetails[key]) finalDetails[key] = []
      // @ts-ignore
      finalDetails[key].push(...msgs)
    }
  })

  return finalDetails
}

//==============================================================================

/**
 * @param {any} o
 * @returns {boolean}
 */
export const isSchema = o => {
  if (typeof o[SCHEMA_NAME] !== 'string') return false
  const leaves = Object.values(o)
  if (leaves.length === 0) return false
  return leaves.every(isSchemaLeaf)
}

/**
 // @ts-ignore
 * @template T
 // @ts-ignore
 * @template RT
 * @param {any} leaf
 * @returns {leaf is Leaf<T, RT>}
 */
const isSchemaLeaf = leaf =>
  isEdgeLeaf(leaf) ||
  isPrimitiveLeaf(leaf) ||
  isSetLeaf(leaf) ||
  isLiteralLeaf(leaf)

/**
 * @template T
 * @template RT
 * @param {any} leaf
 * @returns {leaf is ReferenceLeaf<T, RT>}
 */
const isEdgeLeaf = leaf => {
  if (typeof leaf !== 'object') return false
  if (typeof leaf.type !== 'object') return false
  if (Array.isArray(leaf.type)) return false
  if (!isSchema(leaf.type)) return false
  if (typeof leaf.onChange !== 'function') return false
  return true
}

/**
 * @param {any} leaf
 * @returns {leaf is LiteralLeaf}
 */
export const isLiteralLeaf = leaf => {
  if (typeof leaf !== 'object') return false
  if (typeof leaf.onChange !== 'function') return false
  if (typeof leaf.type !== 'object') return false
  if (Array.isArray(leaf.type)) return false
  if (size(leaf.type) !== 1) return false
  const [key, shouldBeSchema] = Object.entries(leaf.type)[0]

  const schemaName = shouldBeSchema[SCHEMA_NAME]

  // discard edge leaves where the referenced schema has only one prop which
  // would pass the size filter above. This way we detect that object is an
  // object that:
  // 1) Has a property named 'foo'.
  // 2) the value at that property is an object with a value that can be
  //    accessed through the SCHEMA_NAME symbol and this value matches the key
  //    'foo'.
  if (schemaName !== key) {
    return false
  }

  return isSchema(shouldBeSchema)
}

/**
 * @template T
 * @param {any} leaf
 * @returns {leaf is NumberLeaf<T>|StringLeaf<T>}
 */
const isPrimitiveLeaf = leaf => {
  if (typeof leaf !== 'object') return false
  if (typeof leaf.type !== 'string') return false
  if (!['number', 'string', 'boolean'].includes(leaf.type)) return false
  if (typeof leaf.onChange !== 'function') return false
  return true
}

/**
 * @template T
 * @param {any} leaf
 * @returns {leaf is SetLeaf<T>}
 */
export const isSetLeaf = leaf => {
  if (typeof leaf !== 'object') return false
  if (!Array.isArray(leaf.type)) return false
  if (leaf.type.length !== 1) return false
  if (!isSchema(leaf.type[0])) return false
  if (typeof leaf.onChange !== 'function') return false
  return true
}

/**
 * @template T
 * @param {Schema<T>} schema
 * @returns {Record<keyof T, ReferenceLeaf<{}, {}>> }
 */
export const getEdgeLeaves = schema => {
  const o = {}

  for (const [key, leaf] of Object.entries(schema)) {
    if (isEdgeLeaf(leaf)) {
      // @ts-ignore
      o[key] = leaf
    }
  }

  // @ts-ignore
  return o
}

/**
 * @param {SimpleSchema} schema
 * @returns {Record<string, LiteralLeaf>}
 */
export const getLiteralLeaves = schema => {
  /** @type {Record<string, LiteralLeaf>} */
  const o = {}

  for (const [key, leaf] of Object.entries(schema)) {
    if (isLiteralLeaf(leaf)) {
      o[key] = leaf
    }
  }

  return o
}

/**
 * @param {LiteralLeaf} literalLeaf
 * @returns {SimpleSchema}
 */
export const extractLiteralLeafType = literalLeaf => {
  if (!isLiteralLeaf(literalLeaf)) {
    throw new TypeError(
      'expected a LiteralLeaf to be given to extractLiteralLeafType()',
    )
  }

  return Object.values(literalLeaf.type)[0]
}

/**
 * @template T
 * @param {Schema<T>} schema
 * @returns {Record<keyof T, StringLeaf<T> | NumberLeaf<T>>}
 */
export const getPrimitiveLeaves = schema => {
  const o = {}

  for (const [key, leaf] of Object.entries(schema)) {
    if (isPrimitiveLeaf(leaf)) {
      // @ts-ignore
      o[key] = leaf
    }
  }

  // @ts-ignore
  return o
}

/**
 * @template T
 * @param {Schema<T>} schema
 * @returns {Record<keyof T, SetLeaf<any>>}
 */
export const getSetLeaves = schema => {
  /**
   * @type {Record<string, SetLeaf<any>>}
   */
  const o = {}

  for (const [key, leaf] of Object.entries(schema)) {
    if (isSetLeaf(leaf)) {
      o[key] = leaf
    }
  }

  // @ts-ignore
  return o
}

/**
 * @param {Schema<{}>} schema
 * @param {Record<string, number|string|null|object>} data
 * @returns {boolean}
 */
export const conformsToSchema = (schema, data) => {
  if (typeof data !== 'object') {
    return false
  }

  if (Array.isArray(data)) {
    return false
  }

  if (data === null || typeof data === 'undefined') {
    return false
  }

  return Object.entries(schema).every(([key, leaf]) => {
    if (!(key in data)) {
      return false
    }

    if (isPrimitiveLeaf(leaf)) {
      return data[key] === null || valueIsOfType(leaf.type, data[key])
    }

    if (isEdgeLeaf(leaf)) {
      return conformsToSchema(leaf.type, data[key])
    }

    if (isLiteralLeaf(leaf)) {
      const type = extractLiteralLeafType(leaf)

      return conformsToSchema(type, data[key])
    }

    if (isSetLeaf(leaf)) {
      const isObject = typeof data[key] === 'object'
      const isNull = data[key] == null

      if (!isObject || isNull) {
        return false
      }

      return Object.values(data[key]).every(item =>
        conformsToSchema(leaf.type[0], item),
      )
    }

    console.error(`unknown type of leaf: ${JSON.stringify(leaf)}`)

    return false
  })
}

export const isObject = any => {
  if (typeof any !== 'object') return false
  if (Array.isArray(any)) return false
  if (any === null) return false
  if (typeof any.__proto__ === 'undefined') return false
  if (any.__proto__.constructor === String) return false
  if (any.__proto__.constructor === Number) return false
  if (any.__proto__.constructor === RegExp) return false
  return true
}
