// @ts-check
import flattenDeep from 'lodash/flattenDeep'
import size from 'lodash/size'

/**
 * @typedef {import('./simple-typings').Schema} Schema
 * @typedef {import('./simple-typings').Leaf} Leaf
 * @typedef {import('./simple-typings').LiteralLeaf} LiteralLeaf
 * @typedef {import('./simple-typings').Schema} SimpleSchema
 * @typedef {import('./simple-typings').EdgeLeaf} EdgeLeaf
 * @typedef {import('./simple-typings').PrimitiveLeaf} PrimitiveLeaf
 * @typedef {import('./simple-typings').SetLeaf} SetLeaf
 * @typedef {import('./simple-typings').Response} Response
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

export class ErrorMap {
  constructor() {
    this.hasErrors = false

    /**
     * @type {Record<string, string[]>}
     */
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
 * @param {Response[]} responses
 * @returns {Response}
 */
export const mergeResponses = (...responses) =>
  responses.reduce((finalRes, nextRes) => ({
    ok: finalRes.ok && nextRes.ok,
    messages: finalRes.messages.concat(nextRes.messages),
    details: _mergeResponseDetails(finalRes.details, nextRes.details),
  }))

/**
 * @param {Array<Response['details']>} detailsObjects
 * @returns {Response['details']}
 */
const _mergeResponseDetails = (...detailsObjects) => {
  /**
   * @type {Response['details']}
   */
  const finalDetails = {}

  detailsObjects.forEach(dObj => {
    for (const [key, msgs] of Object.entries(dObj)) {
      if (!finalDetails[key]) finalDetails[key] = []
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
 * @param {any} leaf
 * @returns {leaf is Leaf}
 */
const isSchemaLeaf = leaf =>
  isEdgeLeaf(leaf) ||
  isPrimitiveLeaf(leaf) ||
  isSetLeaf(leaf) ||
  isLiteralLeaf(leaf)

/**
 * @param {any} leaf
 * @returns {leaf is EdgeLeaf}
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
 * @param {any} leaf
 * @returns {leaf is PrimitiveLeaf}
 */
const isPrimitiveLeaf = leaf => {
  if (typeof leaf !== 'object') return false
  if (typeof leaf.type !== 'string') return false
  if (!['number', 'string', 'boolean'].includes(leaf.type)) return false
  if (typeof leaf.onChange !== 'function') return false
  return true
}

/**
 * @param {any} leaf
 * @returns {leaf is SetLeaf}
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
 * @param {Schema} schema
 * @returns {Record<string, EdgeLeaf>}
 */
export const getEdgeLeaves = schema => {
  /**
   * @type {Record<string, EdgeLeaf>}
   */
  const o = {}

  for (const [key, leaf] of Object.entries(schema)) {
    if (isEdgeLeaf(leaf)) {
      o[key] = leaf
    }
  }

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
 * @param {Schema} schema
 * @returns {Record<string, PrimitiveLeaf>}
 */
export const getPrimitiveLeaves = schema => {
  /** @type {Record<string, PrimitiveLeaf>} */
  const o = {}

  for (const [key, leaf] of Object.entries(schema)) {
    if (isPrimitiveLeaf(leaf)) {
      o[key] = leaf
    }
  }

  return o
}

/**
 * @param {Schema} schema
 * @returns {Record<string, SetLeaf>}
 */
export const getSetLeaves = schema => {
  /**
   * @type {Record<string, SetLeaf>}
   */
  const o = {}

  for (const [key, leaf] of Object.entries(schema)) {
    if (isSetLeaf(leaf)) {
      o[key] = leaf
    }
  }

  return o
}

/**
 * @param {Schema} schema
 * @param {any} data
 * @returns {boolean}
 */
export const conformsToSchema = (schema, data) => {
  if (data === null || typeof data === 'undefined') {
    return false
  }

  if (typeof data !== 'object') {
    return false
  }

  if (Array.isArray(data)) {
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
