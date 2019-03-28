import { FreeValue } from './BuiltIn'

// these methods don't use `this` so they can be safely aliased without binding
// nthem to any instance
// They also needed casting because typescript kept insiting they were
// exclusively SetLeaf['onChange].

const booleanOnChange =
  /** @type {import('./simple-typings').BooleanPrimitiveLeaf['onChange']} */ (FreeValue
    .valueIfBoolean.onChange)
const numberOnChange =
  /** @type {import('./simple-typings').NumberPrimitiveLeaf['onChange']} */ (FreeValue
    .valueIfNumber.onChange)
const valueIfString =
  /** @type {import('./simple-typings').StringPrimitiveLeaf['onChange']} */ (FreeValue
    .valueIfString.onChange)

describe('FreeValue', () => {
  describe('onChange() for each prop', () => {
    it('returns an error array if all properties are initialized to null', async () => {
      expect.assertions(6)

      const results = await Promise.all([
        booleanOnChange(
          {
            valueIfBoolean: undefined,
            valueIfNumber: null,
            valueIfString: null,
          },
          null,
        ),
        numberOnChange(
          {
            valueIfBoolean: null,
            valueIfNumber: undefined,
            valueIfString: null,
          },
          null,
        ),
        valueIfString(
          {
            valueIfBoolean: null,
            valueIfNumber: null,
            valueIfString: undefined,
          },
          null,
        ),
      ]) // results

      results.forEach(res => {
        if (!Array.isArray(res)) return

        expect(Array.isArray(res)).toBe(true)
        expect(res.length > 0).toBe(true)
      })
    }) // it

    it('accepts updates when other props are null and one is being updated', async () => {
      expect.assertions(3)

      const results = await Promise.all([
        booleanOnChange(
          {
            valueIfBoolean: Math.random() > 0.5,
            valueIfNumber: null,
            valueIfString: null,
          },
          Math.random() > 0.5,
        ),
        numberOnChange(
          {
            valueIfBoolean: null,
            valueIfNumber: Math.random(),
            valueIfString: null,
          },
          Math.random(),
        ),
        valueIfString(
          {
            valueIfBoolean: null,
            valueIfNumber: null,
            valueIfString: Math.random().toString(),
          },
          Math.random().toString(),
        ),
      ]) // results

      results.forEach(res => {
        expect(res).toBe(false)
      })
    })

    it('ignores a null put when any other value is not null', async () => {
      expect.assertions(3)

      const results = await Promise.all([
        booleanOnChange(
          {
            valueIfBoolean: Math.random() > 0.5,
            valueIfNumber: null,
            valueIfString: Math.random().toString(),
          },
          null,
        ),
        numberOnChange(
          {
            valueIfBoolean: Math.random() > 0.5,
            valueIfNumber: Math.random(),
            valueIfString: null,
          },
          null,
        ),
        valueIfString(
          {
            valueIfBoolean: null,
            valueIfNumber: Math.random(),
            valueIfString: Math.random().toString(),
          },
          null,
        ),
      ]) // results

      results.forEach(res => {
        expect(res).toBe(false)
      })
    }) // it()

    it("rejects an update to a prop, when any other prop wasn't previously null", async () => {
      expect.assertions(6)

      const results = await Promise.all([
        booleanOnChange(
          {
            valueIfBoolean: null,
            valueIfNumber: null,
            valueIfString: Math.random().toString(),
          },
          Math.random() > 0.5,
        ),
        numberOnChange(
          {
            valueIfBoolean: Math.random() > 0.5,
            valueIfNumber: null,
            valueIfString: null,
          },
          Math.random(),
        ),
        valueIfString(
          {
            valueIfBoolean: null,
            valueIfNumber: Math.random(),
            valueIfString: null,
          },
          Math.random().toString(),
        ),
      ]) // results

      results.forEach(res => {
        if (!Array.isArray(res)) return

        expect(Array.isArray(res)).toBe(true)
        expect(res.length > 0).toBe(true)
      })
    })
  })
})
