// https://wireframepro.mockflow.com/editor.jsp?editor=off&publicid=Mb463e057e92c741775914daa3f0d85dc1555362653946&projectid=M04a8571b048cf9b9fe440fd668645c4a1552258306778&perm=Reviewer#/page/D85aa2ea3a8c9e923614a86b90e6fa358

// if clicking on an edit button pass this same data to the component that
// handles the edit screen

export const propertyItems = [
  {
    iconName: 'person',
    id: 17,
    unused: false,
    name: 'nametype',
    label: 'namelabel',
    type: 'name',
  },
  {
    iconName: 'text_fields',
    id: 1,
    unused: false,
    name: 'esse',
    label: 'esse',
    type: 'textfield',
  },
  {
    iconName: 'phone',
    id: 2,
    unused: false,
    name: 'deserunt',
    label: 'deserunt',
    type: 'phone',
  },
  {
    iconName: 'location_on',
    id: 3,
    unused: false,
    name: 'cillum',
    label: 'cillum',
    type: 'address',
  },
  {
    iconName: 'format_list_numbered',
    id: 4,
    unused: false,
    name: 'elit',
    label: 'elit',
    type: 'picklist',
  },
  {
    iconName: 'select_all',
    id: 5,
    unused: false,
    name: 'reprehenderit',
    label: 'reprehenderit',
    type: 'multiselect',
  },
  {
    iconName: 'search',
    id: 6,
    unused: false,
    name: 'dolore',
    label: 'dolore',
    type: 'lookup',
  },
  {
    iconName: 'check_box',
    id: 7,
    unused: false,
    name: 'et',
    label: 'et',
    type: 'checkbox',
  },
  {
    iconName: 'access_time',
    id: 8,
    unused: false,
    name: 'aliqua',
    label: 'aliqua',
    type: 'time',
  },
  {
    iconName: 'date_range',
    id: 9,
    unused: false,
    name: 'ut',
    label: 'ut',
    type: 'date',
  },
  {
    iconName: 'data_usage',
    id: 10,
    unused: false,
    name: 'aliquip',
    label: 'aliquip',
    type: 'percent',
  },
  {
    iconName: 'wrap_text',
    id: 11,
    unused: false,
    name: 'velit',
    label: 'velit',
    type: 'memo',
  },
  {
    iconName: 'control_camera',
    id: 12,
    unused: false,
    name: 'culpa',
    label: 'culpa',
    type: 'decimal',
  },
  {
    iconName: 'exposure_plus_2',
    id: 13,
    unused: false,
    name: 'ullamco',
    label: 'ullamco',
    type: 'number',
  },
  {
    iconName: 'http',
    id: 14,
    unused: true,
    name: 'id',
    label: 'id',
    type: 'url',
  },
  {
    iconName: 'send',
    id: 15,
    unused: true,
    name: 'voluptate',
    label: 'voluptate',
    type: 'email',
  },
  {
    iconName: 'attach_money',
    id: 16,
    unused: false,
    name: 'amet',
    label: 'amet',
    type: 'currency',
  },
]

const TextFieldPropType = {
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

const PicklistPropType = {
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

const NamePropType = {
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

const AddressPropType = {
  name: 'Address',
  params: {},
  _: {
    '#': Math.random().toString(),
  },
}

// Imma mix stuff that would belong to the cars node
// and stuff that would belong to a People node. Just for
// demo purposes
const propDefs = [
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
