import { root } from './Gun'
/**
 * @typedef {import('./Graph').User} User
 */
/**
 * @template T
 * @typedef {import('./GunInstance').GunInstance<T>} GunInstance
 */

export {} // stop jsdoc comments from merging

/**
 * Gets an agency from the db.
 * @param {string} agencyName
 * @returns {import('./GunInstance').GunInstance<import('./Graph').Agency>}
 */
export const getAgency = agencyName => root.get('agencies').get(agencyName)

/**
 * @param {string|GunInstance<User>}
 */
export const getAgencyForUser = user => {}
