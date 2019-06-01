import { isAZLower, isAZUpper, sanitizeOrderedItems } from './utils'

describe('isAZLower', () => {
  it('returns true for a-z', () => {
    const result = 'abcdefghijklmnopqrstuvwxyz'.split('').every(isAZLower)

    expect(result).toBe(true)
  })

  it('returns false for A-Z', () => {
    const result = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').every(isAZLower)

    expect(result).toBe(false)
  })

  it('returns false for some other chars', () => {
    const result = '"2357890{}_!?><+_=-'.split('').every(isAZLower)

    expect(result).toBe(false)
  })

  it("throws TypeError if provided with an empty string that doesn't represent a char", () => {
    expect(() => {
      isAZLower('')
    }).toThrowError(TypeError)

    expect(() => {
      isAZLower('foo')
    }).toThrowError(TypeError)
  })
})

describe('isAZUpper', () => {
  it('returns true for A-Z', () => {
    const result = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').every(isAZUpper)

    expect(result).toBe(true)
  })

  it('returns false for a-z', () => {
    const result = 'abcdefghijklmnopqrstuvwxyz'.split('').every(isAZUpper)

    expect(result).toBe(false)
  })

  it('returns false for some other chars', () => {
    const result = '"2357890{}_!?><+_=-'.split('').every(isAZUpper)

    expect(result).toBe(false)
  })

  it("throws TypeError if provided with an empty string that doesn't represent a char", () => {
    expect(() => {
      isAZUpper('')
    }).toThrowError(TypeError)

    expect(() => {
      isAZUpper('foo')
    }).toThrowError(TypeError)
  })
})

describe('sanitizing ordered items', () => {
  /**
   * @param {number[]} orders
   * @returns {{ order: number }[]}
   */
  const generateSample = (...orders) => orders.map(n => ({ order: n }))

  it('returns the array untouched if it is shorter than 2 items in length', () => {
    /**
     * @type {{ order: number }[]}
     */
    const empty = []
    const withOne = [{ order: Math.random() }]

    expect(sanitizeOrderedItems(empty)).toEqual(empty)
    expect(sanitizeOrderedItems(withOne)).toEqual(withOne)
  })

  it('lefts sane inputs untouched', () => {
    expect(generateSample(1, 2)).toEqual(generateSample(1, 2))
    expect(generateSample(1, 2, 3)).toEqual(generateSample(1, 2, 3))
  })

  it('sanitizes items', () => {
    expect(sanitizeOrderedItems(generateSample(1, 1))).toEqual(
      generateSample(0, 1),
    )

    expect(sanitizeOrderedItems(generateSample(1, 3, 3))).toEqual(
      generateSample(1, 2, 3),
    )

    expect(sanitizeOrderedItems(generateSample(1, 2, 2, 2, 3))).toEqual(
      generateSample(1, 1.5, (2 + 1.5) / 2, 2, 3),
    )
  })
})
