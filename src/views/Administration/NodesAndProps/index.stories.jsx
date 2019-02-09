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
      props: [
        {
          name: 'Title',
          type: 'textfield',
        },
        {
          name: 'Content',
          type: 'memo',
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
      props: [
        {
          name: 'Name',
          type: 'textfield',
        },
        {
          name: 'Phone',
          type: 'textfield',
        },
        {
          name: 'Billing Address',
          type: 'address',
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
