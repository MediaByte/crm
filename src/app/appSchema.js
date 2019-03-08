// @ts-check
import Gun from 'gun/gun'
import 'gun/lib/store'

console.log('\n\n\n\n\n\n\n\n\n\n\n')

import { Node } from '.'
import NodeSet from './NodeSet'

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

const UserGroups = {
  [SCHEMA_NAME]: 'UserGroups',
  type: [UserGroup],
  async onChange() {
    return false
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

const Users = {
  [SCHEMA_NAME]: 'Users',
  type: [User],
  async onChange() {
    return false
  },
}

;(async () => {
  try {
    const userGroups = new NodeSet(UserGroups, Gun().get(Math.random()))
    const users = new NodeSet(Users, Gun().get(Math.random()))

    let ugCache = {}
    let cache = {}

    userGroups.on(c => {
      ugCache = c
      console.log(`userGroups = ${JSON.stringify(c)}`)
    })

    users.on(c => {
      cache = c
      console.log(`users = ${JSON.stringify(c)}`)
    })

    await users.set({ age: 15, name: 'john1' })
    await userGroups.set({ name: 'myUserGroup' })

    const [key] = Object.entries(cache)[0]
    const [ugKey] = Object.entries(ugCache)[0]

    const ugNode = userGroups.get(ugKey)

    const res = await users
      .get(key)
      .get('userGroup')
      .put(ugNode)

    console.log(res)
  } catch (e) {
    console.log(e)
  }
})()
