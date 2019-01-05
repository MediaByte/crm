import React from 'react'

import { createMount, createShallow } from '@material-ui/core/test-utils'
import PhoneIcon from '@material-ui/icons/Phone'

import TitleShortTextTuple from '..'

it('renders without crashing when given its mandatory props', () => {
  const mount = createMount()

  mount(<TitleShortTextTuple text="text" title="Title" />)
})

it('renders both the title and text', () => {
  const mount = createMount()
  const title = Math.random().toString()
  const text = Math.random().toString()

  const wrapper = mount(<TitleShortTextTuple text={text} title={title} />)

  const html = wrapper.html()

  expect(html.indexOf(title) > -1).toBeTruthy()
  expect(html.indexOf(title) > -1).toBeTruthy()
})

it('calls the onclick prop when clicked on', () => {
  const shallow = createShallow()
  const mockOnClick = jest.fn(() => {})

  const wrapper = shallow(
    <TitleShortTextTuple onClick={mockOnClick} text="text" title="title" />,
  )

  wrapper.simulate('click')

  expect(mockOnClick.mock.calls.length).toBe(1)
})

it('renders an icon if provided with one', () => {
  const mount = createMount()

  const wrapper = mount(
    <TitleShortTextTuple icon={PhoneIcon} text="text" title="title" />,
  )

  const wrapperContainsPhoneIcon = wrapper.contains(<PhoneIcon />)

  expect(wrapperContainsPhoneIcon).toBeTruthy()
})
