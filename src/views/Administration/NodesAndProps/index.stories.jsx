import React from 'react'

import { storiesOf } from '@storybook/react'

// need to mock all of this for <NavigationColumn />
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { userGroups } from 'state/userGroups/reducers.js'
import { MemoryRouter } from 'react-router-dom'

import Component from '.'

const rootReducer = combineReducers({ userGroups })
const store = createStore(
  rootReducer,
  undefined,
  /** @type {any} */ (window).__REDUX_DEVTOOLS_EXTENSION__ &&
    /** @type {any} */ (window).__REDUX_DEVTOOLS_EXTENSION__(),
)

/**
 * @type {import('.').Props}
 */
const baseProps = {
  availableTypes: [
    'textfield',
    'phone',
    'address',
    'picklist',
    'radio',
    'checkbox',
    'time',
    'date',
    'memo',
  ],
  nodes: [
    {
      iconName: 'calendar',
      id: Math.random(),
      identifier: 'NOTERPT-0001',
      label: 'Notes and Reports',
      name: 'REPORT',
      propDefs: [
        {
          name: 'Title',
          propType: 'textfield',
        },
        {
          name: 'Content',
          propType: 'memo',
        },
      ],
      relationships: [],
    },
    {
      iconName: 'person',
      id: Math.random(),
      identifier: 'PRSN-0001',
      label: 'People',
      name: 'PERSON',
      propDefs: [
        {
          name: 'Name',
          propType: 'textfield',
        },
        {
          name: 'Phone',
          propType: 'textfield',
        },
        {
          name: 'Billing Address',
          propType: 'address',
        },
      ],
      relationships: [
        {
          iconName: 'checkbox',
          name: 'Works At',
          relatedNodeName: 'Establishment',
        },
        {
          iconName: 'puzzle',
          name: 'Owns',
          relatedNodeName: 'Vehicle',
        },
        {
          iconName: 'puzzle',
          name: 'Drives',
          relatedNodeName: 'Vehicle',
        },
      ],
    },
  ],
}

storiesOf(
  // @ts-ignore ES6 classes have a name property
  Component.name,
  module,
).add('default look', () => (
  <Provider store={store}>
    <MemoryRouter>
      <Component {...baseProps} />
    </MemoryRouter>
  </Provider>
))
