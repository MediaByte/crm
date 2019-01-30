import React from 'react'

import { createMount, createShallow } from '@material-ui/core/test-utils'

import PuzzleFilled from '@material-ui/icons/Extension'
import QueueMusic from '@material-ui/icons/QueueMusic'

import IconTextDropDown from '.'

/**
 * @type {import('.').Props}
 */
const baseProps = {
  items: [
    { icon: QueueMusic, value: 'audio' },
    { readableText: 'Date', value: 'date' },
    { icon: PuzzleFilled, readableText: 'Plug-in', value: 'plugin' },
  ],
}

/**
 * @type {ReturnType<typeof createMount>}
 */
let mount

beforeEach(() => {
  mount = createMount()
})

afterEach(() => {
  mount.cleanUp()
})

it('renders without crashing when given its mandatory props', () => {
  mount(<IconTextDropDown {...baseProps} />)
})

it('shallowly renders without crashing too', () => {
  createShallow()(<IconTextDropDown {...baseProps} />)
})

it('renders the icon for an item when provided with one', () => {
  const wrapper = mount(<IconTextDropDown {...baseProps} />)

  // open up the menu
  wrapper.find('[aria-haspopup="true"]').simulate('click')

  baseProps.items.forEach(item => {
    const Icon = item.icon

    if (Icon) {
      const iconIsThere = wrapper.contains(<Icon />)

      expect(iconIsThere).toBe(true)
    }
  })
})

it('renders the readable text for an item when provided with one', () => {
  const baseWrapper = mount(<IconTextDropDown {...baseProps} />)

  // open up the menu
  baseWrapper.find('[aria-haspopup="true"]').simulate('click')

  // I don't know why enzyme doesn't just render this html right away without
  // having to go and find the ul element
  const html = baseWrapper.find('ul').html()

  baseProps.items.forEach(item => {
    const readableText = item.readableText

    if (readableText) {
      expect(html).toContain(readableText)
    }
  })
})

it("calls the onValueChange() prop with an item's value when clicking on that item", () => {
  const mockfn = jest.fn(() => {})
  const baseWrapper = mount(
    <IconTextDropDown {...baseProps} onValueChange={mockfn} />,
  )

  // open up the menu
  baseWrapper.find('[aria-haspopup="true"]').simulate('click')

  const wrapper = baseWrapper.find('ul')

  wrapper.find('li').forEach((item, i) => {
    item.simulate('click')
    expect(mockfn.mock.calls[i][0]).toBe(baseProps.items[i].value)
  })
})
