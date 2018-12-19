import React from 'react'
import ReactDOM from 'react-dom'

import { MemoryRouter } from 'react-router-dom'

import UsersListItem from '../index'

it('renders without crashing when given its mandatory props', () => {
  const div = document.createElement('div')

  ReactDOM.render(
    <MemoryRouter>
      <UsersListItem name="John Smith" employeeRole="Administrator" />
    </MemoryRouter>,
    div,
  )
})
