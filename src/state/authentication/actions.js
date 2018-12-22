import { USER_VALID } from './constants.js'

export const isUserAuthorized = event => ({ type: USER_VALID, payload: event })
