import * as Utils from 'common/utils'

export const Node = {
  /**
   * @param {string} name
   * @throws {TypeError} Check the error's message for relevant information
   * @returns {void}
   */
  isValidName: name => {
    const chars = name.split('')

    if (chars.length === 0) {
      throw new TypeError('Must have a name')
    }

    if (!chars.every(Utils.isAZUpper)) {
      throw new TypeError('Must be all-caps')
    }
  },
  /**
   * @param {string} label
   * @throws {TypeError} Check the error's message for relevant information
   * @returns {void}
   */
  isValidLabel: label => {},
}

export const PropDef = {
  /**
   * @param {string} name
   * @throws {TypeError} Check the error's message for relevant information
   * @returns {void}
   */
  isValidName: name => {
    const chars = name.split('')

    if (chars.length === 0) {
      throw new TypeError('Must have a name')
    }

    if (!chars.every(Utils.isAZUpper)) {
      throw new TypeError('Must be all-caps')
    }
  },
  /**
   * @param {string} label
   * @throws {TypeError} Check the error's message for relevant information
   * @returns {void}
   */
  isValidLabel: label => {},
}
