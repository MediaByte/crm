import { root } from './Root'
/**
 * @typedef {import('./Graph').Agency} Agency
 * @typedef {import('./GunInstance').GunInstance<Agency>} AgencyInstance
 * @typedef {import('./Graph').User} User
 */
/**
 * @template T
 * @typedef {import('./GunInstance').GunInstance<T>} GunInstance
 */

export {} // stop jsdoc comments from merging

/**
 * Gets an agency from the db.
 * @param {string} agencyName Since this is the first thing the app looks up
 * after login, we only accept strings as the caller won't probably readily have
 * an Agency Gun Instance.
 * @returns {AgencyInstance}
 */
export const getAgency = agencyName => root.get('agencies').get(agencyName)
