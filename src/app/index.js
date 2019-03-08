import { SCHEMA_NAME } from './Utils'

import Gun from 'gun/gun'
import 'gun/lib/store'
import NodeSet from './NodeSet'

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
  async onChange(self, nextNodeVal, setKey) {
    return false
  },
}

const PropDef = {
  [SCHEMA_NAME]: 'PropDef',
  name: {
    type: 'string',
    async onChange() {},
  },
  propType: {
    type: 'string',
    async onChange() {},
  },
}

const PineconeNode = {
  [SCHEMA_NAME]: 'Node',
  name: {
    type: 'string',
    async onChange() {},
  },
  label: {
    type: 'string',
    async onChange() {},
  },
  propDefs: {
    type: [PropDef],
    async onChange() {},
  },
}

const PineconeNodes = {
  [SCHEMA_NAME]: 'Nodes',
  type: [PineconeNode],
  async onChange() {
    return false
  },
}

export const userGroups = new NodeSet(UserGroups, gun.get('userGroups'))
export const users = new NodeSet(Users, gun.get('users'))
export const nodes = new NodeSet(PineconeNodes, gun.get('nodes'))
