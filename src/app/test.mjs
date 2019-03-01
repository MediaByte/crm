// @ts-check
import Gun from 'gun/gun'
import 'gun/lib/store'

import { Node } from './index'

import { SCHEMA_NAME } from './Utils'

const gun = Gun()

/**
 * @type {import('./typings').Schema}
 */
const mySchema = {
  [SCHEMA_NAME]: 'User',
  age: {
    type: 'number',
    onChange(self, nextVal) {
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
    onChange(_, nextVal) {
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
}

const node = new Node(mySchema, gun.get(Math.random()))

node.on(cache => {
  console.log(cache)
})

node
  .put({
    age: 4,
    name: 'john',
  })
  .then(console.log)
  .catch(() => {
    console.log('error')
  })
