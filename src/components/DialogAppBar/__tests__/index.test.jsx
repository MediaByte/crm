import React from 'react'

import DialogAppBar from '..'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { createMount, createShallow } from '@material-ui/core/test-utils'

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

it('renders without crashing when given its mandatory props', () => {
  mount(<DialogAppBar actionButtonText="foo" title="baz" />)
})

it('shallowly renders without crashing too', () => {
  shallow(<DialogAppBar actionButtonText="foo" title="baz" />)
})

it('renders the title', () => {
  const title = Math.random().toString()

  const wrapper = mount(<DialogAppBar actionButtonText="foo" title={title} />)

  const html = wrapper.html()

  expect(html.indexOf(title) > -1).toBe(true)
})

it('renders the action button text', () => {
  const actionButtonText = Math.random().toString()

  const wrapper = mount(
    <DialogAppBar actionButtonText={actionButtonText} title="baz" />,
  )

  const html = wrapper.html()

  expect(html.indexOf(actionButtonText) > -1).toBe(true)
})

it('calls the onClickActionButton prop when that button is clicked', () => {
  const mockOnClick = jest.fn(() => {})

  const wrapper = mount(
    <DialogAppBar
      actionButtonText="foo"
      title="baz"
      onClickActionButton={mockOnClick}
    />,
  )

  const actionButton = wrapper.find(Button)

  actionButton.simulate('click')

  expect(mockOnClick.mock.calls.length).toBe(1)
})

it('calls the onClickCloseButton prop when that button is clicked', () => {
  const mockOnClick = jest.fn(() => {})

  const wrapper = mount(
    <DialogAppBar
      actionButtonText="foo"
      title="baz"
      onClickCloseButton={mockOnClick}
    />,
  )

  const closeButton = wrapper.find(IconButton)

  closeButton.simulate('click')

  expect(mockOnClick.mock.calls.length).toBe(1)
})
