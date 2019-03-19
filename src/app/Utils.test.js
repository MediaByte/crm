import * as Utils from './Utils'

describe('valueIsOfType()', () => {
  it('throws TypeError if given an illegal type argument', () => {
    expect(() => {
      Utils.valueIsOfType('string', '')
      Utils.valueIsOfType('number', 5)
    }).not.toThrow()

    expect(() => {
      // @ts-ignore
      Utils.valueIsOfType('foo', '')
      // @ts-ignore
      Utils.valueIsOfType('baz', 5)
    }).toThrowError(TypeError)
  })
})

describe('reasonToString()', () => {
  it('returns the string if provided with one', () => {
    const str = 'foo'
    expect(Utils.reasonToString(str)).toBe(str)
  })

  it('returns the message prop on an object if given one', () => {
    const obj = { message: 'foo' }
    expect(Utils.reasonToString(obj)).toBe(obj.message)
  })

  it('returns "Unknown error" otherwise', () => {
    expect(Utils.reasonToString({})).toBe('Unknown error')
  })
})

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

  it('approves valid schemas', () => {
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

describe('ErrorMap', () => {
  /**
   * @type {Utils.ErrorMap<{}>}
   */
  let errorMap

  beforeEach(() => {
    errorMap = new Utils.ErrorMap()
  })

  it('starts with an empty error map', () => {
    expect(errorMap.map).toEqual({})
  })

  it('starts with the hasErrors prop set to false', () => {
    expect(errorMap.hasErrors).toBe(false)
  })

  it('populates the map with an error on the corresponding key when given that one', () => {
    const err = 'foo'
    const key = 'baz'
    // @ts-ignore
    errorMap.puts(key, err)

    expect(errorMap.map).toEqual({
      [key]: [err],
    })
  })

  it('sets the hasErrors props to true when given one error', () => {
    // @ts-ignore
    errorMap.puts('foo', 'baz')

    expect(errorMap.hasErrors).toBe(true)
  })

  it('accepts arrays as errors and concats them at the specified key', () => {
    const initialErr = 'foo'
    const key = 'baz'
    const subsequentErrors = ['bar', 'bam']
    const expected = [initialErr].concat(subsequentErrors)

    // @ts-ignore
    errorMap.puts(key, initialErr)
    // @ts-ignore
    errorMap.puts(key, subsequentErrors)

    expect(errorMap.map).toEqual({
      [key]: expected,
    })
  })
})

describe('mergeResponses()', () => {
  const resA = {
    ok: true,
    messages: ['foo'],
    details: {
      anotherKey: ['foo'],
      baz: ['foo'],
    },
  }

  const resB = {
    ok: false,
    messages: ['bar'],
    details: {
      baz: ['bar'],
    },
  }

  const aPlusB = {
    ok: resA.ok && resB.ok,
    messages: ['foo', 'bar'],
    details: {
      anotherKey: ['foo'],
      baz: ['foo', 'bar'],
    },
  }

  it('returns the same response if given just one', () => {
    expect(Utils.mergeResponses(resA)).toEqual(resA)
  })

  it('merges as espected two example responses', () => {
    expect(Utils.mergeResponses(resA, resB)).toEqual(aPlusB)
  })
})

const Student = {
  [Utils.SCHEMA_NAME]: 'subSchema',
  name: {
    type: 'string',
    async onChange() {},
  },
}

const loneSetSchema = {
  [Utils.SCHEMA_NAME]: 'loneSetSchema',
  students: {
    type: [Student],
    async onChange() {},
  },
}

const ReferencesStudent = {
  [Utils.SCHEMA_NAME]: 'ReferencesStudent',
  bestStudent: {
    type: Student,
    async onChange() {},
  },
}

const someSchema = {
  [Utils.SCHEMA_NAME]: 'someSchema',
  bestStudent: {
    type: Student,
    async onChange() {},
  },
  numberOfStudents: {
    type: 'number',
    async onChange() {},
  },
  students: {
    type: [Student],
    async onChange() {},
  },
}

describe('getEdgeLeaves()', () => {
  it('returns the edge leaves only', () => {
    // @ts-ignore
    const result = Utils.getEdgeLeaves(someSchema)

    expect(result).toEqual({
      bestStudent: someSchema.bestStudent,
    })
  })
})

describe('getPrimitiveLeaves()', () => {
  it('returns the primitive leaves only', () => {
    // @ts-ignore
    const result = Utils.getPrimitiveLeaves(someSchema)

    expect(result).toEqual({
      numberOfStudents: someSchema.numberOfStudents,
    })
  })
})

describe('getSetLeaves()', () => {
  it('returns the set leaves only', () => {
    // @ts-ignore
    const result = Utils.getSetLeaves(someSchema)

    expect(result).toEqual({
      students: someSchema.students,
    })
  })
})

describe('conformsToSchema()', () => {
  it('returns false for an empty object', () => {
    const validator = Utils.conformsToSchema.bind(null, someSchema)
    expect(validator({})).toBe(false)
  })

  it('validates nullable primitive leaves', () => {
    const validator = Utils.conformsToSchema.bind(null, Student)
    const numberValidator = Utils.conformsToSchema.bind(null, {
      // @ts-ignore
      age: {
        type: 'number',
        async onChange() {},
      },
    })

    expect(
      validator({
        name: null,
      }),
    ).toBe(true)

    expect(
      validator({
        name: 'john',
      }),
    ).toBe(true)

    expect(
      numberValidator({
        age: null,
      }),
    ).toBe(true)

    expect(
      numberValidator({
        age: 50,
      }),
    ).toBe(true)
  })

  it('rejects undefined or null as valid sets', () => {
    expect(
      Utils.conformsToSchema(loneSetSchema, {
        students: null,
      }),
    ).toBe(false)

    expect(
      Utils.conformsToSchema(loneSetSchema, {
        students: undefined,
      }),
    ).toBe(false)
  })

  it('validates empty objects as valid sets', () => {
    expect(
      Utils.conformsToSchema(loneSetSchema, {
        students: {},
      }),
    ).toBe(true)
  })

  it('validates the items contained in the sets', () => {
    expect(
      Utils.conformsToSchema(loneSetSchema, {
        students: {
          [Math.random()]: {
            // incomplete student
          },
        },
      }),
    ).toBe(false)

    expect(
      Utils.conformsToSchema(loneSetSchema, {
        students: {
          [Math.random()]: null,
        },
      }),
    ).toBe(false)

    expect(
      Utils.conformsToSchema(loneSetSchema, {
        students: {
          [Math.random()]: {
            name: 'John Smith',
          },
        },
      }),
    ).toBe(true)
  })

  it('validatesReferences', () => {
    const data = {
      bestStudent: {
        name: 'John Smith',
      },
    }

    const badData = {
      bestStudent: null,
    }

    const badData2 = {
      bestStudent: {},
    }

    expect(Utils.conformsToSchema(ReferencesStudent, data)).toBe(true)

    expect(Utils.conformsToSchema(ReferencesStudent, {})).toBe(false)

    expect(Utils.conformsToSchema(ReferencesStudent, badData)).toBe(false)

    expect(Utils.conformsToSchema(ReferencesStudent, badData2)).toBe(false)
  })
})
