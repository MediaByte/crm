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
let usersSetNode

beforeEach(() => {
  rootNode = new Node(Root, Gun().get(Math.random().toString()))
  usersSetNode = rootNode.get('users')
})

it('provides a subscriber with its current data on subscription', done => {
  expect.assertions(1)

  const anUser = {
    name: Math.random().toString(),
  }

  usersSetNode.set(anUser).then(res => {
    if (!res.ok) {
      console.warn(res)
    }

    setTimeout(() => {
      usersSetNode.on(nextData => {
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

  const res = await usersSetNode.set(malFormedUser)

  expect(res.ok).toBe(false)
})

it('returns a node when getting it through get()', done => {
  // TODO: find out why it's detecting 2 assertion calls
  // expect.assertions(1)

  const anUser = {
    name: Math.random().toString(),
  }

  usersSetNode.set(anUser).then(res => {
    if (!res.ok) {
      console.warn(`returns a node when getting it through get() res: ${res}`)
    }

    setTimeout(() => {
      const [anUserKey] = Object.keys(usersSetNode.currentData)

      if (typeof anUserKey !== 'string') {
        console.warn(`anUserKey: ${anUserKey}`)
      }

      const shouldBeNode = usersSetNode.get(anUserKey)

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

  usersSetNode.set(anUser).then(res => {
    if (!res.ok) {
      console.warn(`returns a node when getting it through get() res: ${res}`)
    }

    setTimeout(() => {
      const [anUserKey] = Object.keys(usersSetNode.currentData)

      if (typeof anUserKey !== 'string') {
        console.warn(`anUserKey: ${anUserKey}`)
      }

      const shouldBeNode = usersSetNode.get(anUserKey)

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

  usersSetNode.set(anUser).then(res => {
    if (!res.ok) {
      console.warn(`returns a node when getting it through get() res: ${res}`)
    }

    setTimeout(() => {
      const [anUserKey] = Object.keys(usersSetNode.currentData)

      if (typeof anUserKey !== 'string') {
        console.warn(`anUserKey wasnt string: ${anUserKey}`)
      }

      const shouldBeNode = usersSetNode.get(anUserKey)

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

const Address = {
  [Utils.SCHEMA_NAME]: 'Address',
  city: {
    type: 'string',
    async onChange() {},
  },
  zip: {
    type: 'number',
    async onChange() {},
  },
}

const UserWithLiteral = {
  [Utils.SCHEMA_NAME]: 'UserWithLiteral',
  name: {
    type: 'string',
    async onChange() {},
  },
  address: {
    type: { Address },
    async onChange() {},
  },
}

const UserWithRef = {
  [Utils.SCHEMA_NAME]: 'UserWithRef',
  name: {
    type: 'string',
    async onChange() {},
  },
  address: {
    type: Address,
    async onChange() {},
  },
}

const RootB = {
  [Utils.SCHEMA_NAME]: 'RootB',
  users: {
    type: [UserWithLiteral],
    async onChange() {},
  },
  usersWithRef: {
    type: [UserWithRef],
    async onChange() {},
  },
}

it('accepts a literaltype object at node creation', async () => {
  expect.assertions(2)

  const userData = {
    name: 'john',
    address: {
      city: 'NY',
      zip: 11001,
    },
  }
  const myRoot = new Node(RootB, Gun().get(Math.random()))

  const users = myRoot.get('users')

  const res = await users.set(userData)

  const { reference: user } = res

  expect(res.ok).toBe(true)
  expect(user.currentData).toEqual(userData)
})

it('rejects a literal of the wrong shape at creation', async () => {
  expect.assertions(2)

  const badUserData = {
    name: 'john',
    address: {
      city: 'NY',
      zipp: 11001,
    },
  }
  const myRoot = new Node(RootB, Gun().get(Math.random()))

  const users = myRoot.get('users')

  const res = await users.set(badUserData)

  expect(res.ok).toBe(false)
  expect(res.details['address'].length).toBeGreaterThan(0)
})

it('rejects a reference for a literal type at creation', async () => {
  expect.assertions(2)

  const myRoot = new Node(RootB, Gun().get(Math.random()))

  const users = myRoot.get('users')

  const fakeAddressNode = new Node(
    Address,
    Gun().get(Math.random()),
    false,
    () => Promise.resolve(false),
  )

  const res = await users.set({
    name: 'john',
    address: fakeAddressNode,
  })

  expect(res.ok).toBe(false)
  expect(res.details['address'].length).toBeGreaterThan(0)
})

it('rejects a literal for a reference type at creation', async () => {
  expect.assertions(2)

  const myRoot = new Node(RootB, Gun().get(Math.random()))

  const users = myRoot.get('usersWithRef')

  const addressLiteral = {
    city: 'NY',
    zip: 11001,
  }

  const res = await users.set({
    name: 'john',
    address: addressLiteral,
  })

  expect(res.ok).toBe(false)
  expect(res.details['address'].length).toBeGreaterThan(0)
})
