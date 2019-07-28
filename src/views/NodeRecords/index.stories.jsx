import React from 'react'

import { storiesOf } from '@storybook/react'

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { userGroups } from 'state/userGroups/reducers.js'
import { MemoryRouter } from 'react-router-dom'

import Component from '.'

// need to mock all of this for <NavigationColumn />
const rootReducer = combineReducers({ userGroups })
const store = createStore(
  rootReducer,
  undefined,
  /** @type {any} */ (window).__REDUX_DEVTOOLS_EXTENSION__ &&
    /** @type {any} */ (window).__REDUX_DEVTOOLS_EXTENSION__(),
)

/** @type {import('.').Props} */
const baseProps = {
  nodeName: 'PERSON',
  records: [
    {
      displayValue: 'Danika Driggers',
      id: Math.random(),
      properties: [
        {
          name: 'Name',
          type: 'textfield',
          value: 'Danika Driggers',
        },
      ],
      relationships: [
        {
          displayValue: 'Ford GT',
          icon: 'puzzle',
          name: 'Drives',
        },
      ],
    },
    {
      displayValue: 'Una Pickrell',
      id: Math.random(),
      properties: [
        {
          name: 'Name',
          type: 'textfield',
          value: 'Una Pickrell',
        },
      ],
      relationships: [
        {
          displayValue: 'Lexus',
          icon: 'puzzle',
          name: 'Drives',
        },
      ],
    },
    {
      displayValue: 'Sherise Giffen',
      id: Math.random(),
      properties: [
        {
          name: 'Name',
          type: 'textfield',
          value: 'Sherise Giffen',
        },
      ],
      relationships: [
        {
          displayValue: 'Toyota Celica',
          icon: 'puzzle',
          name: 'Drives',
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
