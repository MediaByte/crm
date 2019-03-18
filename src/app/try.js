// @ts-check
import Gun from 'gun/gun'
import 'gun/lib/store'
import 'gun/lib/open'

import { Node } from './Node'
import * as Utils from './Utils'

console.log('\n\n\n\n\n\n\n\n\n')

const gunRootInstance = new Gun().get(Math.random())

const UserGroup = {
  [Utils.SCHEMA_NAME]: 'UserGroup',
  name: {
    type: 'string',
    async onChange(self, nextVal) {
      return undefined
    },
  },
}

const User = {
  [Utils.SCHEMA_NAME]: 'User',
  name: {
    type: 'string',
    async onChange() {},
  },
  userGroup: {
    type: UserGroup,
    async onChange() {},
  },
}

const Root = {
  [Utils.SCHEMA_NAME]: 'Root',
  foo: {
    type: 'string',
    async onChange() {},
  },
  users: {
    type: [User],
    async onChange() {},
  },
  mainUserGroup: {
    type: UserGroup,
    async onChange() {},
  },
  userGroups: {
    type: [UserGroup],
    async onChange(ugs, next, key) {
      if (key in ugs) {
        // the node is being updated
      } else {
        for (const [key, ug] of Object.entries(ugs)) {
          if (ug.name == next.name) {
            return 'userGroup name duplicated'
          }
        }
      }
    },
  },
}

const root = new Node(Root, gunRootInstance)

const users = root.get('users')
const userGroups = root.get('userGroups')

let res

root.on(console.log)

let data
;(async () => {
  await userGroups.set({
    name: 'myUserGroup',
  })

  res = await userGroups.set({
    name: 'myUserGroupx',
  })

  console.log(res)
})()
