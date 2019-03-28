import Gun from 'gun/gun'

import * as Utils from './Utils'

import { Node } from './Node'

import SetNode from './SetNode'

import { User } from './__mocks__/mockSchema'

const Root = {
  [Utils.SCHEMA_NAME]: 'Root',
  users: {
    type: [User],
    async onChange() {
      return false
    },
  },
}

/**
 * @type {Node<{ users: Record<string, { name: string }>}>}
 */
let rootNode

/**
 * @type {SetNode<{ name: string}>}
 */
let setNode

beforeEach(() => {
  rootNode = new Node(Root, Gun().get(Math.random().toString()))
  setNode = rootNode.get('users')
})

it('provides a subscriber with its current data on subscription', done => {
  expect.assertions(1)

  const anUser = {
    name: Math.random().toString(),
  }

  setNode.set(anUser).then(res => {
    if (!res.ok) {
      console.log(res)
    }

    setTimeout(() => {
      setNode.on(nextData => {
        const items = Object.values(nextData)

        expect(items).toContainEqual(anUser)

        done()
      })
    }, 1000)
  })
})

it('validates an item on .set()', async () => {
  expect.assertions(1)

  const malFormedUser = {
    [Math.random().toString()]: Math.random().toString(),
  }

  const res = await setNode.set(malFormedUser)

  expect(res.ok).toBe(false)
})

it('returns a node when getting it through get()', done => {
  // TODO: find out why it's detecting 2 assertion calls
  // expect.assertions(1)

  const anUser = {
    name: Math.random().toString(),
  }

  setNode.set(anUser).then(res => {
    if (!res.ok) {
      console.log(`returns a node when getting it through get() res: ${res}`)
    }

    setTimeout(() => {
      const [anUserKey] = Object.keys(setNode.currentData)

      if (typeof anUserKey !== 'string') {
        console.log(`anUserKey: ${anUserKey}`)
      }

      const shouldBeNode = setNode.get(anUserKey)

      expect(shouldBeNode).toBeInstanceOf(Node)

      done()
    }, 1000)
  })
})

it('returns a node of the correct type when getting it through get()', done => {
  // TODO: find out why it's detecting 2 assertion calls
  // expect.assertions(1)

  const anUser = {
    name: Math.random().toString(),
  }

  setNode.set(anUser).then(res => {
    if (!res.ok) {
      console.log(`returns a node when getting it through get() res: ${res}`)
    }

    setTimeout(() => {
      const [anUserKey] = Object.keys(setNode.currentData)

      if (typeof anUserKey !== 'string') {
        console.log(`anUserKey: ${anUserKey}`)
      }

      const shouldBeNode = setNode.get(anUserKey)

      expect(shouldBeNode.schema).toBe(User)

      done()
    }, 1000)
  })
})

it('returns a node with the correct cached data when getting it through get()', done => {
  expect.assertions(1)
  // TODO: find out why it's detecting 2 assertion calls
  // expect.assertions(1)

  const anUser = {
    name: Math.random().toString(),
  }

  setNode.set(anUser).then(res => {
    if (!res.ok) {
      console.log(`returns a node when getting it through get() res: ${res}`)
    }

    setTimeout(() => {
      const [anUserKey] = Object.keys(setNode.currentData)

      console.log(`b: ${JSON.stringify(setNode.currentData)}`)

      if (typeof anUserKey !== 'string') {
        console.warn(`anUserKey wasnt string: ${anUserKey}`)
      }

      const shouldBeNode = setNode.get(anUserKey)

      if (!(shouldBeNode instanceof Node)) {
        console.warn('shouldBeNode isnt instance of Node')
      }

      if (shouldBeNode.currentData.name !== anUser.name) {
        console.warn(`expectation unfulfilled,
        shouldBeNode.currentData.name: ${shouldBeNode.currentData.name},
        anUser.name: ${anUser.name}
        `)
      }

      expect(shouldBeNode.currentData).toEqual(anUser)

      done()
    }, 1000)
  })
})
