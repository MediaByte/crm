// https://wireframepro.mockflow.com/editor.jsp?editor=off&publicid=Mb463e057e92c741775914daa3f0d85dc1555362653946&projectid=M04a8571b048cf9b9fe440fd668645c4a1552258306778&perm=Reviewer#/page/D85aa2ea3a8c9e923614a86b90e6fa358

// if clicking on an edit button pass this same data to the component that
// handles the edit screen

interface PropTypeParam {
  name: string
  type: 'number' | 'string' | 'boolean'
  multiple: boolean
}

interface PropertyType {
  name: string
  params: Record<string, PropTypeParam>
  _: {
    '#': string
  }
}

interface FreeValue {
  valueIfBoolean: boolean | null
  valueIfNumber: number | null
  valueIfString: string | null
  valuesIfMultipleNumber: Record<string, number>
  valuesIfMultipleBoolean: Record<string, boolean>
  valuesIfMultipleString: Record<string, string>
}

interface PropDefArgument {
  param: PropTypeParam
  /**
   * Look at the param reference, and based on the combination of param.type and
   * param.multiple, you'll know whether to access value.valueIfboolean or
   * value.valuesIfMultipleString, etc.
   */
  value: FreeValue
}

interface PropertyDefinition {
  name: string
  propType: PropertyType
  arguments: Record<string, PropDefArgument>
  helpText: string
  _: {
    '#': string
  }
}

const TextFieldPropType: PropertyType = {
  name: 'Text Field',
  params: {
    asfh8987asf9bbuc987f: {
      name: 'Max Length',
      multiple: false,
      type: 'number',
    },
  },
  _: {
    '#': Math.random().toString(),
  },
}

const PicklistPropType: PropertyType = {
  name: 'Picklist',
  params: {
    [Math.random().toString()]: {
      name: 'Choices',
      multiple: true,
      type: 'string',
    },
    [Math.random().toString()]: {
      name: 'Multiple Selection',
      multiple: false,
      type: 'boolean',
    },
  },
  _: {
    '#': Math.random().toString(),
  },
}

const NamePropType: PropertyType = {
  name: 'Name',
  params: {
    [Math.random().toString()]: {
      name: 'Use prefix',
      multiple: false,
      type: 'boolean',
    },
    [Math.random().toString()]: {
      name: 'Use middle name',
      multiple: false,
      type: 'boolean',
    },
  },
  _: {
    '#': Math.random().toString(),
  },
}

const AddressPropType: PropertyType = {
  name: 'Address',
  params: {},
  _: {
    '#': Math.random().toString(),
  },
}

// Imma mix stuff that would belong to the cars node
// and stuff that would belong to a People node. Just for
// demo purposes
const propDefs: PropertyDefinition[] = [
  {
    name: 'Make',
    propType: TextFieldPropType,
    helpText: 'The one that builds the car',
    arguments: {
      [Math.random().toString()]: {
        param: TextFieldPropType.params['asfh8987asf9bbuc987f'],
        value: {
          valueIfBoolean: null,
          valueIfNumber: 55,
          valueIfString: null,
          valuesIfMultipleBoolean: {},
          valuesIfMultipleNumber: {},
          valuesIfMultipleString: {},
        },
      },
    },
    _: {
      '#': Math.random().toString(),
    },
  },
  {
    name: 'Address',
    propType: TextFieldPropType,
    helpText: 'The one that builds the car',
    arguments: {},
    _: {
      '#': Math.random().toString(),
    },
  },
]
