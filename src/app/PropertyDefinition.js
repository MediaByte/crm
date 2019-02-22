import Icon from './Icon'
import * as PropertyType from './PropertyType'
/**
 * @typedef {import('./Icon').Icon} IconType
 * @typedef {import('./Node').NodeInstance} NodeInstance
 * @typedef {import('./Graph').PropertyDefinition} PropertyDefinition
 * @typedef {import('./GunInstance').GunInstance<PropertyDefinition>} PropDefInstance
 */
/**
 * @typedef {object} CreatePropDefParamsBaseA
 * @prop {IconType} icon
 * @prop {string|NodeInstance} node Either the key in the nodes node, or the
 * instance itself, to which the created property definition will belong to, it
 * will also hold a reference to this node.
 */

/**
 * @typedef {object} CreateAddressPropDefParams
 * @prop {PropertyType.ADDRESS} type
 */

/**
 * @typedef {object} CreateCheckboxPropDefParams
 * @prop {PropertyType.CHECKBOX} type
 */

/**
 * @typedef {object} CreateDatePropDefParams
 * @prop {PropertyType.DATE} type
 */

/**
 * @typedef {object} CreateMemoPropDefParams
 * @prop {PropertyType.MEMO} type
 */

/**
 * @typedef {object} CreatePhonePropDefParams
 * @prop {PropertyType.PHONE} type
 */

/**
 * @typedef {object} CreatePicklistPropDefParams
 * @prop {PropertyType.PICKLIST} type
 */

/**
 * @typedef {object} CreateRadioPropDefParams
 * @prop {PropertyType.RADIO} type
 */

/**
 * @typedef {object} CreateTextfieldPropDefParams
 * @prop {PropertyType.TEXTFIELD} type
 * @prop {number} maxLen
 */

/**
 * @typedef {object} CreateTimePropDefParams
 * @prop {PropertyType.TIME} type
 */

/**
 * @typedef {CreateAddressPropDefParams |CreateCheckboxPropDefParams| CreateDatePropDefParams| CreateMemoPropDefParams| CreatePhonePropDefParams| CreatePicklistPropDefParams| CreateRadioPropDefParams| CreateTextfieldPropDefParams| CreateTimePropDefParams} CreatePropDefParamsBaseB
 * @typedef {CreatePropDefParamsBaseA & CreatePropDefParamsBaseB} CratePropDefParams
 */
export {} // stop jsdoc comments from merging

/**
 * @param {CratePropDefParams} params
 * @returns {PropDefInstance}
 * @throws {TypeError} If the type parameter is unknown.
 */
export const createPropertyDefinition = params => {
  switch (params.type) {
    case PropertyType.TEXTFIELD:
      return createTextfieldPropertyDefinition(params)
    case PropertyType.ADDRESS:
    case PropertyType.CHECKBOX:
    case PropertyType.DATE:
    case PropertyType.MEMO:
    case PropertyType.PHONE:
    case PropertyType.PICKLIST:
    case PropertyType.RADIO:
    case PropertyType.TIME:
      return createPropDef(params)
  }

  throw new TypeError(`Incorrect type `)
}

/**
 * @param {CreateTextfieldPropDefParams & CreatePropDefParamsBaseA} params
 * @returns {PropDefInstance}
 */
export const createTextfieldPropertyDefinition = params => {}
