// @ts-check
import flattenDeep from 'lodash/flattenDeep'

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

export const SCHEMA_NAME = Symbol('SCHEMA_NAME')

/**
 *
 * @param {'number'|'number?'|'string'|'string?'} type
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
  if (typeof reason == 'string') return reason
  if (typeof reason.message == 'string') return reason.message
  return 'Unknown error'
}

/**
 * @template T
 */
export class ErrorMap {
  constructor() {
    this.hasErrors = false

    /**
     * @type {Record<keyof T, string[]>}
     */
    // @ts-ignore
    this.map = {}
  }

  /**
   * Arguments after the first one can be either strings or array of strings.
   * All will be flattened to.
   * @param {keyof T} key
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
 *
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
  if (leaves.length == 0) return false
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
  isEdgeLeaf(leaf) || isPrimitiveLeaf(leaf) || isSetLeaf(leaf)

/**
 * @template T
 * @template RT
 * @param {any} leaf
 * @returns {leaf is ReferenceLeaf<T, RT>}
 */
const isEdgeLeaf = leaf => {
  if (typeof leaf !== 'object') return false
  if (typeof leaf.type !== 'object') return false
  if (!isSchema(leaf.type)) return false
  if (typeof leaf.onChange !== 'function') return false
  return true
}

/**
 * @template T
 * @param {any} leaf
 * @returns {leaf is NumberLeaf<T>|StringLeaf<T>}
 */
const isPrimitiveLeaf = leaf => {
  if (typeof leaf !== 'object') return false
  if (typeof leaf.type !== 'string') return false
  if (!['number', 'string'].includes(leaf.type)) return false
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

  if (data == null) {
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
