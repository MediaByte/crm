/**
 * @typedef {import('./PropConstant').ADDRESS} ADDRESS
 * @typedef {import('./PropConstant').BOOLEAN} BOOLEAN
 * @typedef {import('./PropConstant').MULTI_SELECT} MULTI_SELECT
 * @typedef {import('./PropConstant').PHONE_NUMBER} PHONE_NUMBER
 * @typedef {import('./PropConstant').PropConstant} PropConstant
 * @typedef {import('./PropConstant').SINGLE_SELECT} SINGLE_SELECT
 * @typedef {import('./PropConstant').TEXT_FIELD} TEXT_FIELD
 */

/**
 * A prop declaration, is a user-provided prop kind. User picks a kind of prop
 * most suited for their use case and uses these declarations for defining a
 * node. This is different from the actual prop schemas. For example an address
 * prop declaration can look as simple as `{ type: ADDRESS }` but the actual
 * address prop schema might look like `{ street: string, locality: string }`.
 * Any extra arguments in prop declarations MUST BE SERIALIZABLE as these will
 * go into the DB for referential integrity.
 * @typedef {object} PropDeclarationBase
 * @prop {string} key The key with which this prop kind will accessed in the
 * resulting data entries.
 * @prop {PropConstant} kind Discriminating type. This is used for
 * identifying prop declarations from one another inside the construction of the
 * node declaration, certain prop declarations can have extra 'arguments' (that
 * is, extra key-value pairs in interfaces extending this one), and this kind
 * prop is used to safely access these extra arguments. An example would be a
 * `values` or `relationship` argument for selection props. A `maxLength` for
 * text props, etc.
 */

/**
 * @typedef {{kind: ADDRESS} & PropDeclarationBase} AddressPropDeclaration
 */

/**
 * @typedef {{kind: BOOLEAN} & PropDeclarationBase} BooleanPropDeclaration
 */

/**
 * Base interface for both single select and multi select props
 * @typedef {object} _SelectPropDeclarationBase
 * @prop {MULTI_SELECT} kind
 * @prop {Node} relatedNode
 * @prop {Node} displayKey The key from the related node from which
 * a display value for the selection interface will be takethis must be Text Field prop)
 * @template ValueType
 */

/**
 * @type {_SelectPropDeclarationBase<{x: string, t: any}>}
 */

/**
 * @typedef {AddressPropDeclaration|BooleanPropDeclaration} PropDeclaration
 */

export {} // avoid typescript's 'file is not a module' error
