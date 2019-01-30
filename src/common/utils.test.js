import { isAZLower, isAZUpper } from './utils'

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
