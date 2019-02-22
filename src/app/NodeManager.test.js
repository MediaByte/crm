import gun from 'gun/gun'

import NodeManager from './NodeManager'

describe('NodeManager', () => {
  it('throws a TypeError if given a root-level node', () => {
    const rootLevelNode = gun().get('foo')

    expect(() => {
      new NodeManager({
        initialInstance: rootLevelNode,
      })
    }).toThrowError(TypeError)

    expect(() => {
      new NodeManager({
        initialInstance: rootLevelNode.get('foo'),
      })
    })
  })
})
