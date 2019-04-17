import Gun from 'gun/gun'

import { Node } from './gun-wrapper/Node'
import SetNode from './gun-wrapper/SetNode'
import { Root } from './appSchema'

/**
 * @typedef {import('./gun-wrapper/simple-typings').}
 */

const GUN_ROOT_KEY = 'PINECONE_CIVIC_ROOT'

const root = new Node(Root, Gun().get(GUN_ROOT_KEY))

/** @type {SetNode<{}>} */
export const nodes = /** @type {SetNode<{}>} */ root.get('nodes')
