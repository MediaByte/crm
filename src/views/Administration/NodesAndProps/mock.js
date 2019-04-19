// https://wireframepro.mockflow.com/editor.jsp?editor=off&publicid=M10f2562067b22bbebd01be0ba6995f511555377621866&projectid=M93c5c9d9f368a3b02546fe072e14b48a1549844765299&perm=Reviewer#/page/D5d3b69f8bce0ccc9164aa40b91ceb415

/*
  Instead of receiving it as a prop, this will actually be stored in state.
  So access it through `state.nodes`.

  We'll have something similar to manually susbcribing to redux (or some other
  subscription thing) but with gun, so we subscribe on componentDidMount() and
  unsubscribe in componentWillUnmount(), and the subscription copies things to
  state on updates.

*/

export const nodes = [
  {
    name: 'CAR', // secondary text
    label: 'Cars', // primary text
    iconName: 'access_time',
    _: {
      '#': Math.random().toString(), // this is  the id, you can use it as a react key
    },
  },
  {
    name: 'PERSON',
    label: 'People',
    iconName: 'person',
    _: {
      '#': Math.random().toString(),
    },
  },
  {
    name: 'PEOPLE',
    label: 'People',
    iconName: 'date_range',
    _: {
      '#': Math.random().toString(),
    },
  },
  {
    name: 'SHOP',
    label: 'Shops',
    iconName: 'location_on',
    _: {
      '#': Math.random().toString(),
    },
  },
]

export const relationships = [
  {
    name: 'CAR', // secondary text
    label: 'Cars', // primary text
    iconName: 'access_time',
    node: Math.random().toString(),
    _: {
      '#': Math.random().toString(), // this is  the id, you can use it as a react key
    },
  },
  {
    name: 'PERSON',
    label: 'People',
    iconName: 'person',
    node: Math.random().toString(),
    _: {
      '#': Math.random().toString(),
    },
  },
  {
    name: 'PEOPLE',
    label: 'People',
    iconName: 'date_range',
    node: Math.random().toString(),
    _: {
      '#': Math.random().toString(),
    },
  },
  {
    name: 'SHOP',
    label: 'Shops',
    iconName: 'location_on',
    unused: true,
    node: Math.random().toString(),
    _: {
      '#': Math.random().toString(),
    },
  },
]

// https://wireframepro.mockflow.com/editor.jsp?editor=off&publicid=Mb463e057e92c741775914daa3f0d85dc1555362653946&projectid=M04a8571b048cf9b9fe440fd668645c4a1552258306778&perm=Reviewer#/page/D85aa2ea3a8c9e923614a86b90e6fa358

// if clicking on an edit button pass this same data to the component that
// handles the edit screen

export const propTypes = [
  {
    name: 'Text Field',
    params: {
      paramid1: {
        name: 'Max Length',
        multiple: false,
        type: 'number',
      },
    },
    _: {
      '#': 'textfielddTypeId',
    },
  },
  {
    name: 'Picklist',
    params: {
      paramid1: {
        name: 'Choices',
        multiple: true,
        type: 'string',
      },
      paramid2: {
        name: 'Multiple Selection',
        multiple: false,
        type: 'boolean',
      },
    },
    _: {
      '#': 'picklistTypeId',
    },
  },
  {
    name: 'Name',
    params: {
      paramid1: {
        name: 'Use prefix',
        multiple: false,
        type: 'boolean',
      },
      paramid2: {
        name: 'Use middle name',
        multiple: false,
        type: 'boolean',
      },
    },
    _: {
      '#': 'nameTypeId',
    },
  },
  {
    name: 'Address',
    params: {},
    _: {
      '#': 'addressTypeId',
    },
  },
]

const textFieldPropType = propTypes.find(p => p._['#'] === 'textfielddTypeId')
const picklistType = propTypes.find(p => p._['#'] === 'picklistTypeId')
const nameType = propTypes.find(p => p._['#'] === 'nameTypeId')
// Imma mix stuff that would belong to the cars node
// and stuff that would belong to a People node. Just for
// demo purposes
export const propDefs = [
  {
    name: 'Make',
    propType: textFieldPropType,
    helpText: 'The one that builds the car',
    iconName: 'person',
    arguments: {
      [Math.random().toString()]: {
        param: textFieldPropType.params.paramid1,
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
    name: 'Picklist',
    propType: picklistType,
    helpText: 'The one that builds the car',
    iconName: 'location_on',
    arguments: {
      [Math.random().toString()]: {
        param: picklistType.params.paramid1,
        value: {
          valueIfBoolean: null,
          valueIfNumber: 55,
          valueIfString: null,
          valuesIfMultipleBoolean: {},
          valuesIfMultipleNumber: {},
          valuesIfMultipleString: {},
        },
      },
      [Math.random().toString()]: {
        param: picklistType.params.paramid2,
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
    name: 'Name',
    propType: nameType,
    helpText: 'The one that builds the car',
    iconName: 'location_on',
    arguments: {
      [Math.random().toString()]: {
        param: nameType.params.paramid1,
        value: {
          valueIfBoolean: null,
          valueIfNumber: 55,
          valueIfString: null,
          valuesIfMultipleBoolean: {},
          valuesIfMultipleNumber: {},
          valuesIfMultipleString: {},
        },
      },
      [Math.random().toString()]: {
        param: nameType.params.paramid2,
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
]
