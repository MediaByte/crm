import { root } from './Root'
import { exists } from './Icon'
/**
 * @typedef {import('./Graph').Node} Node
 * @typedef {import('./Icon').Icon} IconEnum
 * @typedef {import('./GunInstance').GunInstance<Node>} NodeInstance
 */

/**
 * @typedef {object} CreateNodeParams
 * @prop {IconEnum} icon
 * @prop {string} name
 * @prop {string} label
 */
export {} // stop jsdoc comments from merging

/**
 * @param {CreateNodeParams} params
 * @returns {Promise<NodeInstance>} A promise that resolves to the newly created
 * node, or throws if there was a db-level error while trying to create it.
 * @throws {TypeError} Rejects the promise if the icon isn't valid or if the
 * name or label are empty or contains invalid characters.
 */
export const createNode = ({ icon, name, label }) =>
  new Promise((res, rej) => {
    if (!exists(icon)) {
      throw new TypeError('')
    }

    if (name.length == 0) {
      throw new TypeError('')
    }

    if (label.length === 0) {
      throw new TypeError('')
    }

    /** @type {Node} */
    const newNode = {
      icon,
      name,
      label,
      propertyDefinitions: {},
      relationshipDefinitions: {},
    }
  })
