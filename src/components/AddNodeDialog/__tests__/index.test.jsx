import React from 'react'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Select from '@material-ui/core/Select'
import { createMount, createShallow } from '@material-ui/core/test-utils'

import SomeIcon from '@material-ui/icons/QueueMusic'
import Someicon2 from '@material-ui/icons/ErrorOutline'

import AddNodeDialog from '..'

/**
 * @type {ReturnType<typeof createMount>}
 */
let mount
/**
 * @type {ReturnType<typeof createShallow>}
 */
let shallow

beforeEach(() => {
  mount = createMount()
  shallow = createShallow()
})

const mockPreventDefaultEvent = {
  preventDefault() {},
}

const someSvgIcon = { iconNode: SomeIcon, id: '0' }
const someSvgIcon2 = { iconNode: Someicon2, id: '1' }

const mandatoryProps = {
  handleClose: () => {},
  handleSave: () => {},
  iconSelectValue: someSvgIcon.id,
  identifierFieldError: false,
  labelFieldError: false,
  nameFieldError: false,
  onChangeIconSelect: () => {},
  onChangeIdentifierField: () => {},
  onChangeLabelField: () => {},
  onChangeNameField: () => {},
  open: true,
  svgIcons: [someSvgIcon, someSvgIcon2],
}

afterEach(() => {
  mount.cleanUp()
})

it('renders without crashing when given its mandatory props', () => {
  mount(<AddNodeDialog {...mandatoryProps} />)
})

it('shallowly renders without crashing when given its mandatory props', () => {
  shallow(<AddNodeDialog {...mandatoryProps} />)
})

it('calls the handleClose prop when that button is clicked', () => {
  const mockOnClick = jest.fn(() => {})

  const wrapper = mount(
    <AddNodeDialog {...mandatoryProps} handleClose={mockOnClick} />,
  )

  const actionButton = wrapper.find(IconButton)

  actionButton.simulate('click')

  expect(mockOnClick.mock.calls.length).toBe(1)
})

it('calls the handleSave prop when that button is clicked', () => {
  const mockOnClick = jest.fn(() => {})

  const wrapper = mount(
    <AddNodeDialog {...mandatoryProps} handleSave={mockOnClick} />,
  )

  const actionButton = wrapper.find(Button)

  actionButton.simulate('click')

  expect(mockOnClick.mock.calls.length).toBe(1)
})

it('renders the values for the controlled text inputs', () => {
  const identifierFieldValue = Math.random().toString()
  const labelFieldValue = Math.random().toString()
  const nameFieldValue = Math.random().toString()

  const wrapper = mount(
    <AddNodeDialog
      {...mandatoryProps}
      identifierFieldValue={identifierFieldValue}
    />,
  )

  const html = wrapper.html()

  expect(html.indexOf(identifierFieldValue) > -1).toBe(true)
  expect(html.indexOf(labelFieldValue) > 1).toBe(true)
  expect(html.indexOf(nameFieldValue) > 1).toBe(true)
})

it('calls the onChangeIconSelect when changing that select', () => {
  const mockFn = jest.fn(() => {})

  const wrapper = mount(
    <AddNodeDialog {...mandatoryProps} onChangeIconSelect={mockFn} />,
  )

  const select = wrapper.find(Select)

  select.simulate('click')

  select.find(`input[value="${someSvgIcon2.id}"]`).simulate('click', {
    target: {
      value: someSvgIcon2.id,
    },
  })

  expect(mockFn.mock.calls.length).toBe(1)
})

it('calls the onChangeIdentifierField when changing that field', () => {
  const mockFn = jest.fn(() => {})

  const wrapper = mount(
    <AddNodeDialog {...mandatoryProps} onChangeIdentifierField={mockFn} />,
  )

  const input = wrapper.find('input[name="identifier"]')

  input.simulate('change', mockPreventDefaultEvent)

  expect(mockFn.mock.calls.length).toBe(1)
})

it('calls the onChangeLabelField when changing that field', () => {
  const mockFn = jest.fn(() => {})

  const wrapper = mount(
    <AddNodeDialog {...mandatoryProps} onChangeLabelField={mockFn} />,
  )

  const input = wrapper.find('input[name="label"]')

  input.simulate('change', mockPreventDefaultEvent)

  expect(mockFn.mock.calls.length).toBe(1)
})

it('calls the onChangeNameField when changing that field', () => {
  const mockFn = jest.fn(() => {})

  const wrapper = mount(
    <AddNodeDialog {...mandatoryProps} onChangeNameField={mockFn} />,
  )

  const input = wrapper.find('input[name="name"]')

  input.simulate('change', mockPreventDefaultEvent)

  expect(mockFn.mock.calls.length).toBe(1)
})

it('renders the provided icons', () => {
  const wrapper = mount(<AddNodeDialog {...mandatoryProps} />)

  mandatoryProps.svgIcons.forEach(({ iconNode: Icon }) => {
    expect(wrapper.find(Icon).length).toBeTruthy()
  })
})
