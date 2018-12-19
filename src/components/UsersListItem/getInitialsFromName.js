/**
 * Gets the initials from a name for displaying them as a fallback avatar
 * (e.g. material style avatars).
 * @param {string} name The name from which the initials will be obtained
 * @returns {string} The initials, in uppercase, as a single string e.g. `'JD'`
 * for John Doe. Returns an empty string if the name is an empty string. Returns
 *  the first letter if provided a single word name.
 */
const getInitialsFromName = name => {
  if (name.length <= 1) {
    return name.toUpperCase()
  }

  const words = name.split(' ')

  const [first, last] = words

  if (words.length === 1) {
    return first[0].toUpperCase()
  }

  return first[0].toUpperCase() + last[0].toUpperCase()
}

export default getInitialsFromName
