import React from 'react'
import ReactDOM from 'react-dom'

import UsersFilter from '../index'

it('renders without crashing when given its mandatory props', () => {
  const div = document.createElement('div')

  ReactDOM.render(
    <UsersFilter anchorEl={div} open possibleStatuses={[]} />,
    div,
  )
})
