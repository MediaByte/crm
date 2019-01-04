/**
 * @typedef {object} Address
 * @prop {string} country
 * @prop {string} locality
 * @prop {string} postalCode
 * @prop {string} street
 * @prop {string} type
 */

const propTypesConstants = {
  TEXT_FIELD: 'TEXT_FIELD',
  PHONE_NUMBER: 'PHONE_NUMBER',
  SINGLE_SELECT: 'SINGLE_SELECT',
}

const personNode = {
  id: 45645,
  name: 'Person',
  props: [
    {
      type: propTypesConstants.TEXT_FIELD,
      name: 'Name',
    },
  ],
}

const someUserDefinedNode = {
  name: 'Shipping Route',
  propDeclarations: [
    {
      type: propTypesConstants.TEXT_FIELD,
      name: 'routeName',
    },
    {
      type: propTypesConstants.SINGLE_SELECT,
      name: 'assigneeEmployee',
      relationhip: personNode,
    },
  ],
}

const someEmployee = {
  id: 1234,
  name: 'John smith',
}

const bigDataTable = [
  {
    id: 4564,
    node: someUserDefinedNode,
    name: 'my super special route',
    assigneeEmployee: someEmployee,
  },
]

const myShippingRoutes = bigDataTable.filter(
  data => data.node === someUserDefinedNode,
)
