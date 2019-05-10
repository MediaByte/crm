import Gun from 'gun/gun'

import { Node } from './gun-wrapper/Node'
import { Root } from './appSchema'

/**
 * @typedef {import('./gun-wrapper/SetNode').default} SetNode
 */

const GUN_ROOT_KEY = 'PINECONE_CIVIC_ROOT'

const root = new Node(Root, Gun().get(GUN_ROOT_KEY))

export const nodes = root.getSet('nodes')

export const propTypes = root.getSet('propTypes')

window.propTypes = propTypes // for testing
