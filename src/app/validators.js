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
  isValidLabel: label => {
    const chars = label.split('')

    if (chars.length === 0) {
      throw new TypeError('Must have a label')
    }

    const isAlphanumericalWithSpaces = chars.every(
      char => Utils.isAZ(char) || Utils.isSpace(char) || Utils.isNumber(char),
    )

    if (!isAlphanumericalWithSpaces) {
      throw new TypeError('Must be only letters, spaces and numbers')
    }
  },
}
