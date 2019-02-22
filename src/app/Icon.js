import _ from 'lodash'

const IconEnum = {
  CALENDAR: 'CALENDAR',
  CHECKBOX: 'CHECKBOX',
  CLOCK: 'CLOCK',
  FILM: 'FILM',
  LIST: 'LIST',
  LONG_TEST: 'LONG_TEXT',
  PERSON: 'PERSON',
  PHONE: 'PHONE',
  PINDROP: 'PINDROP',
  PUZZLE: 'PUZZLE',
  RADIO_BUTTON: 'RADIO_BUTTON',
  TEXT: 'TEXT',
}

export default IconEnum

/**
 * @param {string} icon
 */
export const exists = icon => Object.values(IconEnum).includes(icon)

/**
 * @typedef {keyof typeof IconEnum} Icon
 */

// sanity check
const isSane = _.eq(Object.keys(IconEnum), Object.values(IconEnum))

if (!isSane) {
  throw new Error(
    "IconEnum keys don't match their values, this prevents the IconEnum type from being correct.",
  )
}
