import * as BuiltIn from './gun-wrapper/BuiltIn'
import * as Utils from './gun-wrapper/Utils'

/**
 * @typedef {import('./gun-wrapper/simple-typings').Schema} Schema
 */

export {} // stop jsdoc comments from merging

/**
 * @type {Schema}
 */
const UserGroup = {
  [Utils.SCHEMA_NAME]: 'UserGroup',
  name: {
    type: 'string',
    async onChange() {},
  },
}

/**
 * @type {Schema}
 */
const User = {
  [Utils.SCHEMA_NAME]: 'User',
  name: {
    type: 'string',
    async onChange() {},
  },
  userGroup: {
    type: UserGroup,
    async onChange() {},
  },
}

/**
 * @type {Schema}
 */
const RecordProp = {
  [Utils.SCHEMA_NAME]: 'RecordProp',
  /**
   * The name of the prop, for example 'phone'. Allows the node owning the
   * record to identify to which prop the value belongs.
   */
  name: {
    type: 'string',
    onChange: BuiltIn.nonNullableOnChange,
  },
  /**
   * The value for the prop the name identifies.
   */
  value: {
    type: BuiltIn.FreeValue,
    onChange: BuiltIn.nullableOnChange,
  },
}

/**
 * Pending.
 * @type {Schema}
 */
const RecordRel = {
  [Utils.SCHEMA_NAME]: 'RecordRel',
}

/**
 * @type {Schema}
 */
const Record = {
  [Utils.SCHEMA_NAME]: 'Record',
  props: {
    type: [RecordProp],
    // we let the node containing the records to handle this as it has access
    // to the prop definitionss
    async onChange() {
      return false
    },
  },
}

/**
 * @type {Schema}
 */
const PropTypeParam = {
  [Utils.SCHEMA_NAME]: 'PropTypeParam',
  /**
   * An identifiable name for the parameter.
   */
  name: {
    type: 'string',
    async onChange(_, nextVal) {
      if (nextVal == null) {
        return ['value must be specified']
      }
      return undefined
    },
  },
  /**
   * Indicates whether the data type for this param is a number or an string.
   * The wrapper doesn't have OR types.
   */
  type: {
    type: 'string',
    async onChange(_, nextVal) {
      const dataTypes = ['number', 'string']

      if (nextVal == null) {
        return ['type must be defined']
      }

      if (!dataTypes.includes(nextVal)) {
        return [`expected 'number' or 'string' but got: ${nextVal}`]
      }

      return undefined
    },
  },
}

/**
 * @type {Schema}
 */
const PropType = {
  [Utils.SCHEMA_NAME]: 'PropType',
  name: {
    type: 'string',
    async onChange(self, nextVal) {
      const initialization = typeof self.params === 'undefined'

      if (nextVal === null) {
        return ['cannot be null']
      }

      if (initialization) {
        return false
      }

      return
    },
  },
  params: {
    type: [PropTypeParam],
    async onChange(_, __, key) {
      const initialization = typeof key === 'undefined'

      if (initialization) {
        return false
      }

      return ['cannot change any proptype data after it exists']
    },
  },
}

/**
 * An argument for a parameter of a prop type, to be found inside prop
 * definitions.
 * @type {Schema}
 */
const PropDefArgument = {
  [Utils.SCHEMA_NAME]: 'PropDefArgument',
  // akin to a named parameter in a function
  paramName: {
    type: 'string',
    async onChange() {},
  },
  values: {
    type: [BuiltIn.StringValue],
    async onChange() {},
  },
}

/**
 * @type {Schema}
 */
const PropDef = {
  [Utils.SCHEMA_NAME]: 'PropDef',
  name: {
    type: 'string',
    async onChange() {},
  },
  propType: {
    type: PropType,
    async onChange() {},
  },
  arguments: {
    type: [PropDefArgument],
    async onChange() {},
  },
}

/**
 * @type {Schema}
 */
const Node = {
  [Utils.SCHEMA_NAME]: 'Node',
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
  records: {
    type: [Record],
    async onChange() {},
  },
}

/**
 * @type {Schema}
 */
export const Root = {
  [Utils.SCHEMA_NAME]: 'Root',
  users: {
    type: [User],
    async onChange() {},
  },
  userGroups: {
    type: [UserGroup],
    async onChange() {},
  },
  nodes: {
    type: [Node],
    async onChange() {},
  },
  /**
   *
   */
  propTypes: {
    type: [PropType],
    async onChange(_, __, key) {
      const initialization = typeof key === 'undefined'

      if (initialization) {
        return false
      } else {
        // here check that the caleer is authorized to delete or edit prop types
        // prop types shouldn't be changed after making them available to
        // agencies
        return ['no modifications for now']
      }
    },
  },
}
