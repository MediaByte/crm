import size from 'lodash/size'

import * as Utils from './Utils'

/**
 * @typedef {import('./simple-typings').Schema} Schema
 * @typedef {import('./simple-typings').OnChangeReturn} OnChangeReturn
 */

export {} // prevent jsdoc comments from  merging

/**
 * @param {*} _
 * @param {boolean|number|string|null} nextVal
 * @returns {OnChangeReturn}
 */
export const nonNullableOnChange = (_, nextVal) => {
  if (nextVal === null) {
    return Promise.resolve(['value must not be null'])
  }

  // @ts-ignore
  return Promise.resolve(false)
}

/**
 * @returns {OnChangeReturn}
 */
export const nullableOnChange = () =>
  // @ts-ignore
  Promise.resolve(false)

/**
 * @type {Schema}
 */
export const StringValue = {
  [Utils.SCHEMA_NAME]: 'StringValue',
  value: {
    type: 'string',
    onChange: nonNullableOnChange,
  },
}

/**
 * @type {Schema}
 */
export const NullableStringValue = {
  [Utils.SCHEMA_NAME]: 'NullableStringValue',
  value: {
    type: 'string',
    onChange: nullableOnChange,
  },
}

/**
 * @type {Schema}
 */
export const NumberValue = {
  [Utils.SCHEMA_NAME]: 'NumberValue',
  value: {
    type: 'number',
    onChange: nonNullableOnChange,
  },
}

/**
 * @type {Schema}
 */
export const NullableNumberValue = {
  [Utils.SCHEMA_NAME]: 'NullableNumberValue',
  value: {
    type: 'number',
    onChange: nullableOnChange,
  },
}

/**
 * @type {Schema}
 */
export const BooleanValue = {
  [Utils.SCHEMA_NAME]: 'BooleanValue',
  value: {
    type: 'boolean',
    onChange: nonNullableOnChange,
  },
}

/**
 * @type {Schema}
 */
export const NullableBooleanValue = {
  [Utils.SCHEMA_NAME]: 'NullableBooleanValue',
  value: {
    type: 'boolean',
    onChange: nullableOnChange,
  },
}

/**
 * A value that can be either string, number or boolean or a list of those.
 * Validation has to be handled above, you'll probably use this in a set. Each
 * prop for the primitive values is nullable, if you need a nullable type, set
 * the edge itself to null, for consistency purposes, and set the unused
 * props to null.
 * @type {Schema}
 */
export const FreeValue = {
  [Utils.SCHEMA_NAME]: 'FreeValue',
  valueIfBoolean: {
    type: 'boolean',
    async onChange(self, nextVal) {
      const nextIsNull = nextVal === null
      const othersAreNull =
        self.valueIfNumber === null && self.valueIfString === null

      const multiplesAreEmpty =
        size(/** @type {object} */ (self.valuesIfMultipleBoolean)) === 0 &&
        size(/** @type {object} */ (self.valuesIfMultipleNumber)) === 0 &&
        size(/** @type {object} */ (self.valuesIfMultipleString)) === 0

      // we do this just in case but really this validation has to be done from
      // the consumer node, as these objects are initialized empty and there
      // might be pending information to be received from other peers
      if (!multiplesAreEmpty) {
        return [
          'tried to set a value even though a multiple sub-node had values in it',
        ]
      }

      if (nextIsNull && othersAreNull) {
        return ['at least one value has to be non null']
      }

      if (othersAreNull && !nextIsNull) {
        // update this prop's value
        return false
      }

      if (!othersAreNull && nextIsNull) {
        // let other onChange()s handle this
        return false
      }

      if (!othersAreNull && !nextIsNull) {
        return ['only one value has to be non-null']
      }

      // hopefully unreachable
      return ['an unknown error occurred, please contact your administrator']
    },
  },
  valueIfNumber: {
    type: 'number',
    async onChange(self, nextVal) {
      // initialization
      // only one value has to be non-null
      const nextIsNull = nextVal === null
      const othersAreNull =
        self.valueIfBoolean === null && self.valueIfString === null

      const multiplesAreEmpty =
        size(/** @type {object} */ (self.valuesIfMultipleBoolean)) === 0 &&
        size(/** @type {object} */ (self.valuesIfMultipleNumber)) === 0 &&
        size(/** @type {object} */ (self.valuesIfMultipleString)) === 0

      // we do this just in case but really this validation has to be done from
      // the consumer node, as these objects are initialized empty and there
      // might be pending information to be received from other peers
      if (!multiplesAreEmpty) {
        return [
          'tried to set a value even though a multiple sub-node had values in it',
        ]
      }

      if (nextIsNull && othersAreNull) {
        return ['at least one value has to be non null']
      }

      if (othersAreNull && !nextIsNull) {
        // update this prop's value
        return false
      }

      if (!othersAreNull && nextIsNull) {
        // let other onChange()s handle this
        return false
      }

      if (!othersAreNull && !nextIsNull) {
        return ['only one value has to be non-null']
      }

      // hopefully unreachable
      return ['an unknown error occurred, please contact your administrator']
    },
  },
  valueIfString: {
    type: 'string',
    async onChange(self, nextVal) {
      // initialization
      // only one value has to be non-null
      const nextIsNull = nextVal === null
      const othersAreNull =
        self.valueIfBoolean === null && self.valueIfNumber === null

      const multiplesAreEmpty =
        size(/** @type {object} */ (self.valuesIfMultipleBoolean)) === 0 &&
        size(/** @type {object} */ (self.valuesIfMultipleNumber)) === 0 &&
        size(/** @type {object} */ (self.valuesIfMultipleString)) === 0

      // we do this just in case but really this validation has to be done from
      // the consumer node, as these objects are initialized empty and there
      // might be pending information to be received from other peers
      if (!multiplesAreEmpty) {
        return [
          'tried to set a value even though a multiple sub-node had values in it',
        ]
      }

      if (nextIsNull && othersAreNull) {
        return ['at least one value has to be non null']
      }

      if (othersAreNull && !nextIsNull) {
        // update this prop's value
        return false
      }

      if (!othersAreNull && nextIsNull) {
        // let other onChange()s handle this
        return false
      }

      if (!othersAreNull && !nextIsNull) {
        return ['only one value has to be non-null']
      }

      // hopefully unreachable
      return ['an unknown error occurred, please contact your administrator']
    },
  },
  valuesIfMultipleNumber: {
    type: [NumberValue],
    async onChange(self) {
      // we do this just in case but really this validation has to be done from
      // the consumer node, as these objects are initialized empty and there
      // might be pending information to be received from other peers
      const primitivesAreNull =
        self.valueIfBoolean === null &&
        self.valueIfNumber === null &&
        self.valueIfString === null

      if (!primitivesAreNull) {
        return [
          'tried to add a value to a multiple value holder even though one of the primitive value holders was already set to non null',
        ]
      }

      const otherMultiplesArePopulated =
        size(/** @type {object} */ (self.valuesIfMultipleBoolean)) > 0 ||
        size(/** @type {object} */ (self.valuesIfMultipleString)) > 0

      if (otherMultiplesArePopulated) {
        return [
          'tried to add a value to a multiple value holder even though one of the other multiple value holders was already populated',
        ]
      }

      return false
    },
  },
  valuesIfMultipleBoolean: {
    type: [BooleanValue],
    async onChange(self) {
      // we do this just in case but really this validation has to be done from
      // the consumer node, as these objects are initialized empty and there
      // might be pending information to be received from other peers
      const primitivesAreNull =
        self.valueIfBoolean === null &&
        self.valueIfNumber === null &&
        self.valueIfString === null

      if (!primitivesAreNull) {
        return [
          'tried to add a value to a multiple value holder even though one of the primitive value holders was already set to non null',
        ]
      }

      const otherMultiplesArePopulated =
        size(/** @type {object} */ (self.valuesIfMultipleNumber)) > 0 ||
        size(/** @type {object} */ (self.valuesIfMultipleString)) > 0

      if (otherMultiplesArePopulated) {
        return [
          'tried to add a value to a multiple value holder even though one of the other multiple value holders was already populated',
        ]
      }

      return false
    },
  },
  valuesIfMultipleString: {
    type: [StringValue],
    async onChange(self) {
      // we do this just in case but really this validation has to be done from
      // the consumer node, as these objects are initialized empty and there
      // might be pending information to be received from other peers
      const primitivesAreNull =
        self.valueIfBoolean === null &&
        self.valueIfNumber === null &&
        self.valueIfString === null

      if (!primitivesAreNull) {
        return [
          'tried to add a value to a multiple value holder even though one of the primitive value holders was already set to non null',
        ]
      }

      const otherMultiplesArePopulated =
        size(/** @type {object} */ (self.valuesIfMultipleBoolean)) > 0 &&
        size(/** @type {object} */ (self.valuesIfMultipleNumber)) > 0

      if (otherMultiplesArePopulated) {
        return [
          'tried to add a value to a multiple value holder even though one of the other multiple value holders was already populated',
        ]
      }

      return false
    },
  },
}

/**
 * @param {number|null} number
 * @returns {object}
 */
export const createNumberFreeValue = number => ({
  valueIfBoolean: null,
  valueIfNumber: number,
  valueIfString: null,
  valuesIfMultipleBoolean: {},
  valuesIfMultipleNumber: {},
  valuesIfMultipleString: {},
})

/**
 * @param {string|null} string
 * @returns {object}
 */
export const createStringFreeValue = string => ({
  valueIfBoolean: null,
  valueIfNumber: null,
  valueIfString: string,
  valuesIfMultipleBoolean: {},
  valuesIfMultipleNumber: {},
  valuesIfMultipleString: {},
})
