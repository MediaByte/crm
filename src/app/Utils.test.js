import * as Utils from './Utils'

console.log('\n\n\n\n')

describe('isValidSchema()', () => {
  it('detects invalid Schemas', () => {
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

    for (const schema of notSchemas) {
      expect(Utils.isSchema(schema)).toBe(false)
    }
  })

  it('approves valid schemas ', () => {
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

    for (const schema of schemas) {
      expect(Utils.isSchema(schema)).toBe(true)
    }
  })

  it('accepts an schema with an edge leaf', () => {
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

    const result = Utils.isSchema(withEdge)

    expect(result).toBe(true)
  })
})
