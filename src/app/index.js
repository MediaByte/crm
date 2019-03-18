import { SCHEMA_NAME } from './Utils.mjs'

import Gun from 'gun'
import SetNode from './SetNode'

const gun = Gun().get('root')

const UserGroup = {
  [SCHEMA_NAME]: 'UserGroup',
  name: {
    type: 'string',
    async onChange(self, nextVal) {
      if (nextVal === 'foo') {
        return self && 'illegal name'
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
  label: {
    type: 'string',
    async onChange() {},
  },
  name: {
    type: 'string',
    async onChange() {},
  },
  propType: {
    type: 'string',
    async onChange() {},
  },
  tooltip: {
    type: 'string',
    async onChange() {},
  },
}

const RelDef = {
  [SCHEMA_NAME]: 'RelDef',
  name: {
    type: 'string',
    async onChange() {},
  },
  iconName: {
    type: 'string',
    async onChange() {},
  },
  relatedNode: {
    type: PineconeNode,
    async onChange() {},
  },
}

const PineconeNode = {
  [SCHEMA_NAME]: 'Node',
  iconName: {
    type: 'string',
    async onChange() {},
  },
  identifier: {
    type: 'string',
    async onChange() {},
  },
  label: {
    type: 'string',
    async onChange() {},
  },
  name: {
    type: 'string',
    async onChange() {},
  },
  propDefs: {
    type: [PropDef],
    async onChange() {},
  },
  relDefs: {
    type: [RelDef],
  },
}

const PineconeNodes = {
  [SCHEMA_NAME]: 'Nodes',
  type: [PineconeNode],
  async onChange() {
    return false
  },
}

export const userGroups = new SetNode(UserGroups, gun.get('userGroups'))
export const users = new SetNode(Users, gun.get('users'))
export const nodes = new SetNode(PineconeNodes, gun.get('nodes'))
