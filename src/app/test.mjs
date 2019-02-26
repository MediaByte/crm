import { Node, SCHEMA_NAME } from './index'

/**
 * @type {import('./index').Schema}
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
        errs.push("names can't contain number")
      }
      if (nextVal.indexOf('#') > -1) {
        errs.push("names can't contain special characters")
      }
      return undefined
    },
  },
}

const node = new Node(mySchema)

node.on(n => {
  console.log(n)
})

node
  .put({
    age: 45,
    name: 2,
  })
  .then(console.log)
  .catch(console.log)
