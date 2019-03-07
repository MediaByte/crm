// @ts-check
import Gun from 'gun/gun'
import 'gun/lib/store'

console.log('\n\n\n\n\n\n\n\n\n\n\n')

import { Node, NodeSet } from '.'

import { SCHEMA_NAME } from './Utils'

const gun = Gun().get('root')

const UserGroup = {
  [SCHEMA_NAME]: 'UserGroup',
  name: {
    type: 'string',
    async onChange(self, nextVal) {
      if (nextVal === 'foo') {
        return 'illegal name'
      }
    },
  },
}

/**
 * @type {import('./typings').Schema}
 */
const User = {
  [SCHEMA_NAME]: 'User',
  age: {
    type: 'number',
    async onChange(self, nextVal) {
      if (nextVal < 0 || nextVal > 120) {
        return 'invalid age'
      }
      if (self.name == 'fitzgerald' && nextVal < 20) {
        return "millenials aren't usually named fitzgerald"
      }
      return undefined
    },
  },
  name: {
    type: 'string',
    async onChange(_, nextVal) {
      const errs = []
      if (nextVal.indexOf('1') > -1) {
        errs.push('names cannot contain numbers')
      }
      if (nextVal.indexOf('#') > -1) {
        errs.push('names cannot contain special characters')
      }
      return errs
    },
  },
  userGroup: {
    type: UserGroup,
    async onChange() {},
  },
}

;(async () => {
  try {
    const node = new Node(User, gun.get(Math.random()))
    const userGroup = new Node(UserGroup, gun.get(Math.random()))

    const userGroups = new NodeSet(
      {
        [SCHEMA_NAME]: 'UserGroups',
        type: [UserGroup],
        async onChange() {
          return undefined
        },
      },
      gun.get(Math.random()),
    )
    let cache = {}

    userGroups.on(c => {
      cache = c
    })

    await userGroups.set({ name: 'alice' })

    await userGroups.set({ name: 'bob' })

    const [key] = Object.entries(cache)[0]

    const someNode = userGroups.get(key)
    console.log(someNode)
  } catch (e) {
    console.log(e)
  }
})()
