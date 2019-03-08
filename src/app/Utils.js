// @ts-check
import flattenDeep from 'lodash/flattenDeep'

export const SCHEMA_NAME = Symbol('SCHEMA_NAME')

/**
 * @param {'number'|'string'} type
 * @param {any} value
 * @returns {boolean}
 * @throws {TypeError}
 */
export const valueIsOfType = (type, value) => {
  const map = {
    /** @param {any} value */
    number: value => typeof value == 'number',
    /** @param {any} value */
    string: value => typeof value == 'string' && value.length > 0,
  }
  if (!(type in map)) {
    throw new TypeError('value')
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
 */
const _mergeResponseDetails = (...detailsObjects) =>
  detailsObjects.reduce((finalDetails, nextDetails) => ({
    ...finalDetails,
    ...nextDetails,
  }))
