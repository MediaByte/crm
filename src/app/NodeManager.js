/**
 * @template T
 * @param {Schema<T>} schema
 * @returns {(keyof Schema<T>)[]}
 */
const getPrimitiveKeys = schema => schema && []

/**
 *
 * @param {import("./GunInstance").GunInstance<any>} node
 */
export const isRootLevelNode = node => {
  const root = node.back(-1)
  const parentNode = node.back(1)

  return parentNode === root
}

/**
 * Remember don't wrap root level nodes, try to have an 'app' root level node
 * for easier stuff.
 * @template T
 */
export default class NodeManager {
  constructor({ node, schema, validator }) {
    if (isRootLevelNode(node)) {
      throw new TypeError('root level node text here')
    }

    this.node = node
    this.validate = validator
    this.schema = schema
  }

  /**
   * @param {Partial<T>|number|string} partial
   */
  put(partial) {
    const primitives = getPrimitiveKeys(this.schema)
    const keys = Object.keys(partial)

    if (keys.some(k => primitives.includes(k))) {
    }
  }
}
