import React from 'react'
import ReactDOM from 'react-dom'

import { createMount, createShallow } from '@material-ui/core/test-utils'

import UsersFilter from '../index'

describe('<UsersFilter />', () => {
  let div, mount, shallow

  beforeEach(() => {
    div = document.createElement('div')
    shallow = createShallow()
    mount = createMount()
  })

  afterEach(() => {
    mount.cleanUp()
  })

  it('renders without crashing when given its mandatory props', () => {
    const wrapper = mount(
      <UsersFilter anchorEl={div} open possibleStatuses={[]} />,
    )

    expect(wrapper.find(<div>All</div>)).toBeTruthy()
  })

  it('shallowly renders without crashing too', () => {
    shallow(<UsersFilter anchorEl={div} open possibleStatuses={[]} />)
  })

  it('has populated static defaultStatuses array', () => {
    expect(Array.isArray(UsersFilter.defaultStatuses)).toBeTruthy()
    expect(UsersFilter.defaultStatuses.length > 0).toBeTruthy()
  })

  it('displays given statuses along with the default one', () => {
    const wrapper = shallow(
      <UsersFilter
        anchorEl={div}
        open
        possibleStatuses={[
          {
            displayValue: 'FOO',
            value: 'foo',
          },
          {
            displayValue: 'BAR',
            value: 'bar',
          },
          {
            displayValue: 'BAZ',
            value: 'baz',
          },
        ]}
      />,
    )

    expect(
      wrapper.contains(<em>{UsersFilter.defaultStatuses[0].displayValue}</em>),
    ).toBe(true)
  })
})
