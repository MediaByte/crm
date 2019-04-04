import * as BuiltIn from './gun-wrapper/BuiltIn'
import * as Utils from './gun-wrapper/Utils'

const FreeValue = BuiltIn.FreeValue

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
      const dataTypes = ['number', 'string', 'boolean']

      if (nextVal == null) {
        return ['type must be defined']
      }

      if (!dataTypes.includes(nextVal)) {
        return [`expected 'number' or 'string' but got: ${nextVal}`]
      }

      return undefined
    },
  },
  /**
   * Indicates whether there should be multiple values, picklists for example.
   */
  multiple: {
    type: 'boolean',
    async onChange(_, nextVal) {
      // TODO: disallow multiple boolean
      if (nextVal === null) {
        return ['must be specified']
      } else {
        return false
      }
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
  param: {
    type: PropTypeParam,
    async onChange() {},
  },
  value: {
    type: { FreeValue },
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
  helpText: {
    type: 'string',
    async onChange() {},
  },
}

/**
 * @type {Schema}
 */
const RecordProp = {
  [Utils.SCHEMA_NAME]: 'RecordProp',
  /**
   * The prop definition for which the prop's value is given.
   */
  propDef: {
    type: PropDef,
    async onChange() {},
  },
  /**
   * The value for the prop the name identifies.
   */
  value: {
    type: { FreeValue },
    onChange: BuiltIn.nullableOnChange,
  },
}

const RecordRel = {
  [Utils.SCHEMA_NAME]: 'RecordRel',
  relDefName: {
    type: 'string',
    async onChange() {},
  },
  relatedRecordKey: {
    type: 'string',
    async onChange() {},
  },
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
    async onChange() {},
  },
  relations: {
    type: [RecordRel],
    async onChange() {},
  },
}

/**
 * @type {Schema}
 */
const RelDef = {
  [Utils.SCHEMA_NAME]: 'RelDef',
  name: {
    type: 'string',
    async onChange() {},
  },
  relatedNodeName: {
    type: 'string',
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
  relDefs: {
    type: [RelDef],
    async onChange() {},
  },
  records: {
    type: [Record],
    async onChange(self) {
      const relDefs = {}
    },
  },
}

/**
 * @type {Schema}
 */
export const Root = {
  [Utils.SCHEMA_NAME]: 'Root',
  users: {
    type: [User],
    async onChange(_, nextVal, key) {
      if (typeof key === 'undefined') {
        if (nextVal.userGroup === null) {
          return ['user must be assigned user group at creation']
        } else {
          return false
        }
      } else {
        return ['not reachable for now']
      }
    },
  },
  userGroups: {
    type: [UserGroup],
    async onChange() {},
  },
  nodes: {
    type: [Node],
    async onChange(self, nextData, key) {
      console.log(arguments)
    },
  },
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
