// @ts-check
import Gun from 'gun/gun'
import 'gun/lib/store'

console.log('\n\n\n\n\n\n\n\n\n\n\n')

import { Node } from '.'

import { SCHEMA_NAME } from './Utils'

const gun = Gun()

const UserGroup = {
  [SCHEMA_NAME]: 'UserGroup',
  name: {
    type: 'string',
    async onChange() {},
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
    // const userGroupEdge = node.get('userGroup')

    node.on(r => {
      console.log(r)
    })

    await node.put({
      age: 4,
      name: 'john',
    })

    await userGroup.put({
      name: 'myUserGroup',
    })

    const res = await node.get('userGroup').put(userGroup)

    console.log(res)
  } catch (e) {
    console.log(e)
  }
})()
