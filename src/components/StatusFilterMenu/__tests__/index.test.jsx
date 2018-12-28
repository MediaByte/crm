import React from 'react'

import { createMount, createShallow } from '@material-ui/core/test-utils'

import StatusFilterMenu from '../index'

describe('<StatusFilterMenu />', () => {
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
      <StatusFilterMenu anchorEl={div} open possibleStatuses={[]} />,
    )

    expect(wrapper.find(<div>All</div>)).toBeTruthy()
  })

  it('shallowly renders without crashing too', () => {
    shallow(<StatusFilterMenu anchorEl={div} open possibleStatuses={[]} />)
  })

  it('has populated static defaultStatuses array', () => {
    expect(Array.isArray(StatusFilterMenu.defaultStatuses)).toBeTruthy()
    expect(StatusFilterMenu.defaultStatuses.length > 0).toBeTruthy()
  })

  it('displays given statuses along with the default one', () => {
    const possibleStatuses = [
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
    ]

    const wrapper = mount(
      <StatusFilterMenu
        anchorEl={div}
        open
        possibleStatuses={possibleStatuses}
      />,
    )

    // open up the selection menu<
    wrapper.find('[aria-haspopup="true"]').simulate('click')

    const html = wrapper.html()

    possibleStatuses.forEach(status => {
      expect(html.indexOf(status.displayValue) > -1).toBe(true)
    })
  })
})
