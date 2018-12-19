import getInitialsFromName from '../getInitialsFromName'

it('returns an empty string if provided with an empty string', () => {
  expect(getInitialsFromName('')).toEqual('')
})

it('returns a single uppercase letter if provided with a single letter', () => {
  const A = 'A'
  expect(getInitialsFromName(A)).toEqual(A)
})

it('returns a single uppercase letter if provided with a single name', () => {
  const NAME = 'John'
  const INITIAL = 'J'

  expect(getInitialsFromName(NAME)).toEqual(INITIAL)
})

it('returns 2 uppercase letters if provided with 2 names', () => {
  const NAME = 'John Smith'
  const INITIALS = 'JS'

  expect(getInitialsFromName(NAME)).toEqual(INITIALS)
})

it('returns the initials from the first 2 names if provided with more than 2', () => {
  const LONG_NAME = 'John Carl Smith'
  const INITIALS = 'JC'

  expect(getInitialsFromName(LONG_NAME)).toEqual(INITIALS)
})

it('always returns uppercase initials even if provided with lowercase names', () => {
  const LOWERCASE_NAME = 'john smith'
  const INITIALS = 'JS'

  expect(getInitialsFromName(LOWERCASE_NAME)).toEqual(INITIALS)
})
