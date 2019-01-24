import React from 'react'

import Button from '@material-ui/core/Button'
import { createMount, createShallow } from '@material-ui/core/test-utils'

import SomeIcon from '@material-ui/icons/QueueMusic'

import AddNodeDialog from '..'
/**
 * @typedef {import('..').Props} AddNodeDialogProps
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
  mount = createMount()
  shallow = createShallow()
})

afterEach(() => {
  mount.cleanUp()
})

const mockPreventDefaultEvent = {
  preventDefault() {},
}

/**
 * @type {Pick<AddNodeDialogProps, Exclude<keyof AddNodeDialogProps, 'classes'>>}
 */
const mandatoryProps = {
  open: true,
  selectedIcon: SomeIcon,
}

it('renders without crashing when given its mandatory props', () => {
  mount(<AddNodeDialog {...mandatoryProps} />)
})

it('shallowly renders without crashing when given its mandatory props', () => {
  shallow(<AddNodeDialog {...mandatoryProps} />)
})

it('renders the selected icon', () => {
  const wrapper = mount(<AddNodeDialog {...mandatoryProps} />)

  const TheIcon = mandatoryProps.selectedIcon
  // we use find(Type) instead of contains(Element) because of:
  // https://github.com/jsdom/jsdom/issues/2128
  const nodesWithThatIcon = wrapper.find(TheIcon).length

  expect(nodesWithThatIcon).toBeGreaterThan(0)
})

it('calls the handleClose prop when that button is clicked', () => {
  const mockOnClick = jest.fn(() => {})

  const wrapper = mount(
    <AddNodeDialog {...mandatoryProps} handleClose={mockOnClick} />,
  )

  const closeButton = wrapper.find('button[aria-label="Close"]')

  closeButton.simulate('click')

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

it('renders the value for the controlled identifier input', () => {
  const expectedValue = Math.random().toString()

  const wrapper = mount(
    <AddNodeDialog {...mandatoryProps} identifierFieldValue={expectedValue} />,
  )

  const { value } = wrapper.find('input[name="identifier"]').props()

  expect(value).toBe(expectedValue)
})

it('renders the value for the controlled label input', () => {
  const expectedValue = Math.random().toString()

  const wrapper = mount(
    <AddNodeDialog {...mandatoryProps} labelFieldValue={expectedValue} />,
  )

  const { value } = wrapper.find('input[name="label"]').props()

  expect(value).toBe(expectedValue)
})

it('renders the value for the controlled name input', () => {
  const expectedValue = Math.random().toString()

  const wrapper = mount(
    <AddNodeDialog {...mandatoryProps} nameFieldValue={expectedValue} />,
  )

  const { value } = wrapper.find('input[name="name"]').props()

  expect(value).toBe(expectedValue)
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
