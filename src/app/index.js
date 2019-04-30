import Gun from 'gun/gun'

import { Node } from './gun-wrapper/Node'
import { Root } from './appSchema'

/**
 * @typedef {import('./gun-wrapper/SetNode').default} SetNode
 */

const GUN_ROOT_KEY = 'PINECONE_CIVIC_ROOT'

const root = new Node(Root, Gun().get(GUN_ROOT_KEY))

/** @type {SetNode} */
export const nodes = /** @type {SetNode<{}>} */ root.get('nodes')

/** @type {SetNode} */
export const propTypes = /** @type {SetNode<{}>} */ root.get('propTypes')

window.propTypes = propTypes
