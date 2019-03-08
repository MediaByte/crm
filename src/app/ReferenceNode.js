// @ts-check
/**
 * @typedef {import('./Node').Node<any>} Node
 * @typedef {import('./typings').PutResponse<any>} PutResponse
 */

export default class ReferenceNode {
  /**
   * @param {object} schema
   * @param {object} gunInstance The gun instance for the key of the owner node.
   * For example, `car.get('driver')`, NOT the car instance or an instance of
   * the related node gotten by any other means (e.g. `drivers.get('foo')`).
   * @param {Function} onChange An onchange callback provided by the owner node.
   */
  constructor(schema, gunInstance, onChange) {
    this.schema = schema
    this.gunInstance = gunInstance
    this.onChange = onChange
    /**
     * Holds the current node assigned to this reference.
     * @type {Node}
     */
    this.currentNode = null
  }

  /**
   * @param {Node} node
   * @returns {Promise<object>}
   */
  async put(node) {
    if (node.schema !== this.schema) {
      throw new TypeError('Wrong node type')
    }

    const err = this.onChange(this.currentNode.cache, node.cache)
 
    if (err) {
      return Promise.resolve({
        ok: false,
        message: '',
        details: {
          '*': 
        },
      })
    }

    return new Promise(resolve => {
      this.gunInstance.put(node.gunInstance, ack => {
        resolve({
          ok: typeof ack.err == 'undefined',
          message: ack.err || '',
          details: {},
        })
      })
    })
  }

  get() {
    throw new Error()
  }

  on() {
    throw new Error()
  }

  off() {
    throw new Error()
  }
}
