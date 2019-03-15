// @ts-check
import Gun from 'gun/gun'
import 'gun/lib/store'
import 'gun/lib/open'

import { Node } from './Node'
import * as Utils from './Utils.mjs'

console.log('\n\n\n\n\n\n\n\n\n')

const gunRootInstance = new Gun().get(Math.random())

const UserGroup = {
  [Utils.SCHEMA_NAME]: 'UserGroup',
  name: {
    type: 'string',
    async onChange() {},
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
    async onChange() {},
  },
}

const root = new Node(Root, gunRootInstance)

const users = root.get('users')
const userGroups = root.get('userGroups')

let res

root.on(console.log)

let data
;(async () => {
  await userGroups.set({ name: 'myUserGroup' })

  const [key] = Object.keys(userGroups.currentData)

  if (key) {
    const myUserGroup = userGroups.get(key)

    await myUserGroup.put({
      name: 'MYNEWUSERGROUPNAME',
    })

    await users.set({
      name: 'myUser',
    })

    const [userKey] = Object.keys(users.currentData)

    if (userKey) {
      const myUser = users.get(userKey)

      await myUser.put({
        name: 'fakeMyUser',
      })

      await myUser.get('userGroup').put(myUserGroup)

      root.get('mainUserGroup').put(myUserGroup)
    } else {
      console.log('no user key')
    }
  } else {
    console.log('no userGroup key')
  }
})()
