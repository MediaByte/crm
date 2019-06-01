/**
 * @typedef {import('components/PropDefsOverview').SimplePropDef} SimplePropDef
 */

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
 * @param {any} reason
 * @returns {string}
 */
export const reasonToString = reason => {
  if (typeof reason === 'string') return reason
  if (typeof reason.message === 'string') return reason.message
  return 'Unknown error'
}

// https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
/**
 * @template T
 * @param {T[]} arr
 * @param {number} oldIndex
 * @param {number} newIndex
 * @returns {T[]}
 */
export const arrayMove = (arr, oldIndex, newIndex) => {
  const newArr = arr.slice()

  if (oldIndex < 0) {
    throw new RangeError()
  }

  if (oldIndex > arr.length) {
    throw new RangeError()
  }

  if (newIndex < 0) {
    throw new RangeError()
  }

  if (newIndex > arr.length) {
    throw new RangeError()
  }

  if (oldIndex === newIndex) {
    return arr
  }

  // if (newIndex >= arr.length) {
  //     var k = newIndex - arr.length + 1;

  //     while (k--) {
  //         arr.push(undefined);
  //     }
  // }

  newArr.splice(newIndex, 0, newArr.splice(oldIndex, 1)[0])

  return newArr
}

// TODO: Minimize decimals

/**
 * @param {SimplePropDef[]} items
 * @returns {SimplePropDef[]}
 */
export const sanitizeOrderedItems = items => {
  if (items.length < 2) {
    return items
  }

  const newItems = items.slice(0).sort((a, b) => a.order - b.order)

  for (let i = 0; i < items.length; i++) {
    const prev = newItems[i - 1]
    const curr = newItems[i]
    const nxt = newItems[i + 1]

    if (nxt) {
      if (curr.order === nxt.order) {
        if (prev) {
          curr.order = (curr.order + prev.order) / 2
        } else {
          curr.order -= 1
        }
      }
    }
  }

  return newItems.sort((a, b) => a.order - b.order)
}

/**
 * @param {number} oldIndex
 * @param {number} newIndex
 * @param {SimplePropDef[]} sanitizedItems
 * @returns {SimplePropDef[]}
 */
export const reorder = (oldIndex, newIndex, sanitizedItems) => {
  if (sanitizedItems.length < 2) {
    return sanitizedItems
  }

  if (oldIndex === newIndex) {
    return sanitizedItems
  }

  const newItems = arrayMove(sanitizedItems, oldIndex, newIndex)

  const prev = newItems[newIndex - 1]
  const next = newItems[newIndex + 1]

  const newOrder = (() => {
    if (prev && next) {
      return (prev.order + next.order) / 2
    } else if (prev && !next) {
      return prev.order + 1
    } else if (!prev && next) {
      return next.order - 1
    } else {
      throw new Error(
        'assertionError: code that should be unreachable detected',
      )
    }
  })()

  newItems[newIndex] = {
    ...newItems[newIndex],
    order: newOrder,
  }

  return newItems
}
