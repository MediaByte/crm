import React from 'react'

import { createMount, createShallow } from '@material-ui/core/test-utils'

import IconA from '@material-ui/icons/QueueMusic'
import IconB from '@material-ui/icons/MailOutlined'

import SelectIconDialog from '..'
/**
 * @typedef {import('..').Props} Props
 */

/**
 * @type {ReturnType<typeof createMount>}
 */
let mount
/**
 * @type {ReturnType<typeof createShallow>}
 */
let shallow

beforeEach(() => {
  shallow = createShallow()
  mount = createMount()
})

afterEach(() => {
  mount.cleanUp()
})

/**
 * @type {Required<Pick<Props, Exclude<keyof Props, 'classes'|'handleClose'|'onClickIcon'|'onTabChange'>>>}
 */
const baseProps = {
  children: [<IconA />, <IconB />],
  currentIconStyle: 'filled',
  open: true,
  selectedIconIndex: 0,
}

it('renders without crashing when given its mandatory props', () => {
  mount(<SelectIconDialog {...baseProps} />)
})

it('shallowly renders without crashing too', () => {
  shallow(<SelectIconDialog {...baseProps} />)
})

it('renders the current selected icon', () => {
  const wrapper = mount(<SelectIconDialog {...baseProps} />)

  // cast: I know type is a component here
  const SelectedIconType =
    /** @type {React.ComponentClass} */ (baseProps.children[
      baseProps.selectedIconIndex
    ].type)

  // we use find(Type) instead of contains(Element) because of:
  // https://github.com/jsdom/jsdom/issues/2128
  expect(wrapper.find(SelectedIconType).length).toBeGreaterThan(1)
  // it should be rendered twice, once for the big selected at the top and once
  // inside the list
})

it('renders no icons when no icon is selected', () => {
  const wrapper = mount(
    <SelectIconDialog {...baseProps} selectedIconIndex={undefined} />,
  )

  baseProps.children.forEach(icon => {
    // cast: I know type is a component here
    const Type = /** @type {React.ComponentClass} */ (icon.type)

    expect(wrapper.find(Type).length).toBe(0)
  })
})

it('renders no icons list when no icon style is specified', () => {
  const wrapper = mount(
    <SelectIconDialog
      {...baseProps}
      currentIconStyle={undefined}
      selectedIconIndex={0}
    />,
  )

  const selectedIcon = baseProps.children[0]

  // cast: I know type is a component here
  const SelectedIconType =
    /** @type {React.ComponentClass} */ (selectedIcon.type)

  // only the big selected icon at the top should show up
  expect(wrapper.find(SelectedIconType).length).toBe(1)

  const otherIcons = baseProps.children.slice(1)

  otherIcons.forEach(icon => {
    // cast: I know type is a component here
    const Type = /** @type {React.ComponentClass} */ (icon.type)

    expect(wrapper.find(Type).length).toBe(0)
  })
})

it('calls the handleClose prop when clicking on the close button', () => {
  const mockfn = jest.fn(() => {})

  const wrapper = mount(
    <SelectIconDialog {...baseProps} handleClose={mockfn} />,
  )

  wrapper.find('button[aria-label="Close"]').simulate('click')

  expect(mockfn.mock.calls.length).toBe(1)
})

it('calls the onClickIcon prop with the correct index when an icon is clicked', () => {
  const mockfn = jest.fn(() => {})
  const wrapper = mount(
    <SelectIconDialog
      {...baseProps}
      onClickIcon={mockfn}
      selectedIconIndex={0}
    />,
  )

  const selectedIcon = baseProps.children[0]

  // cast: I know type is a component here
  const SelectedIconType =
    /** @type {React.ComponentClass} */ (selectedIcon.type)

  // ignore the icon at the top
  const selectedIconInList = wrapper.find(SelectedIconType).last()

  selectedIconInList.simulate('click')

  expect(mockfn.mock.calls[0][0]).toBe(0)

  const otherIcons = baseProps.children.slice(1)

  otherIcons.forEach((icon, i) => {
    // cast: I know type is a component here
    const Type = /** @type {React.ComponentClass} */ (icon.type)

    wrapper.find(Type).simulate('click')

    expect(mockfn.mock.calls[i + 1][0]).toBe(i + 1)
  })
})

it('calls the onTabChange prop when trying to change tabs', () => {
  const mockfn = jest.fn(() => {})

  const wrapper = mount(
    <SelectIconDialog {...baseProps} onTabChange={mockfn} />,
  )

  const tabs = wrapper.find('button[role="tab"]')

  expect(tabs.length).toBeGreaterThan(0)

  tabs.last().simulate('click')

  expect(mockfn.mock.calls.length).toBe(1)
})
