/**
 * @param {string} char
 * @returns {boolean}
 */
export const isAZLower = char => {
  if (char.length !== 1) {
    throw new TypeError('isAzLower called with a non-char string')
  }

  const charCode = char.charCodeAt(0)

  return charCode >= 97 && charCode <= 122
}

/**
 * @param {string} char
 * @returns {boolean}
 */
export const isAZUpper = char => {
  if (char.length !== 1) {
    throw new TypeError('isAZUpper called with a non-char string')
  }

  const charCode = char.charCodeAt(0)

  return charCode >= 65 && charCode <= 90
}

/**
 * @param {string} char
 * @returns {boolean}
 */
export const isAZ = char => isAZLower(char) || isAZLower(char)

/**
 * @param {string} char
 * @returns {boolean}
 */
export const isNumber = char => '0123456789'.indexOf(char) > -1

/**
 * @param {string} char
 * @returns {boolean}
 */
export const isSpace = char => {
  if (char.length !== 1) {
    throw new TypeError('isSpace called with a non-char string')
  }

  return char === ' '
}

/**
 *
 * @param {object} array
 * @param {number} from
 * @param {number} to
 */
export const arrayMoveMutate = (array, from, to) => {
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0])
}
/**
 *
 * @param {object} array
 * @param {number} from
 * @param {number} to
 */
export const arrayMove = (array, from, to) => {
  array = array.slice()

  arrayMoveMutate(array, from, to)

  return array
}
