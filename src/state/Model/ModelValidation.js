/**
 * A reusable type to model validation messages in modeled objects. The
 * resulting object is a partial record of the keys in the original model. If a
 * key appears, there was a validation error somewhere in a routine for that
 * key. The value for each key is an string array containing 1 or more messages
 * explaning in plain english the reason for the validation error. This is
 * similar to the maps returned by cerberus or validatejs.
 * Example:
```
const badObject =  { name: 'numb3r', age 33 }

const res = validateSomewhere(badObject)
assertDeepEqual(res, {
  name: ['Name must not contain number']
})
```
 * @template T
 * @typedef {Partial<Record<keyof T, ReadonlyArray<string>>} ModelValidation
 */
