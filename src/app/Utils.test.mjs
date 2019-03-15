import * as Utils from './Utils'

console.log('\n\n\n\n')

let result

const notSchemas = [
  {},
  {
    [Utils.SCHEMA_NAME]: 'schemawithoutleaves',
  },
  {
    foo: 'notALeaf',
    alsoNotALeaf: 3,
  },
  {
    alsoNotALeaf: 3,
  },
]

result = notSchemas.every(Utils.isSchema)

if (result) throw new TypeError('notSchemas false positive')

const schemas = [
  {
    [Utils.SCHEMA_NAME]: 'foo',
    foo: {
      type: 'string',
      async onChange() {},
    },
  },
  {
    [Utils.SCHEMA_NAME]: 'baz',
    foo: {
      type: 'number',
      async onChange() {},
    },
  },
]

result = schemas.every(Utils.isSchema)

if (!result) throw new TypeError('isSchema() false negative')

// edge leaves

const SomeSchema = {
  [Utils.SCHEMA_NAME]: 'foo',
  baz: {
    type: 'string',
    async onChange() {},
  },
}

const withEdge = {
  [Utils.SCHEMA_NAME]: 'foo',
  foo: {
    type: SomeSchema,
    async onChange() {},
  },
}

result = Utils.isSchema(withEdge)

if (!result) throw new Error('isSchema() false negative')
