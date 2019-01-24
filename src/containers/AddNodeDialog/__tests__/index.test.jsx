import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import { createMount, createShallow } from '@material-ui/core/test-utils'

import { nameToIconMap } from '../../../common/NameToIcon'

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

/**
 * @type {AddNodeDialogProps}
 */
const mandatoryProps = {
  availableIconNames: Object.keys(nameToIconMap),
  handleClose: () => {},
  handleSave: () => {},
  isValidIdentifierValue: () => true,
  isValidLabelValue: () => true,
  isValidNameValue: () => true,
  open: true,
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

  const actionButton = wrapper.find('button[aria-label="Close"]')

  actionButton.simulate('click')

  expect(mockOnClick.mock.calls.length).toBe(1)
})

it('calls the handleSave prop with the correct values', () => {
  const mockOnClick = jest.fn(() => {})

  const wrapper = mount(
    <AddNodeDialog {...mandatoryProps} handleSave={mockOnClick} />,
  )

  const identifierInput = wrapper.find('input[name="identifier"]')
  const labelInput = wrapper.find('input[name="label"]')
  const nameInput = wrapper.find('input[name="name"]')

  // The close button is also an IconButton
  const selectedIcon = wrapper.find(IconButton).last()

  // simulate typing in all of the inputs and a selection of the last icon

  identifierInput.simulate('change', {
    target: {
      value: 'foo',
    },
  })

  labelInput.simulate('change', {
    target: {
      value: 'bar',
    },
  })

  nameInput.simulate('change', {
    target: {
      value: 'baz',
    },
  })

  // switch to the select icon dialog then click on an icon
  selectedIcon.simulate('click')

  // click the last icon from the list of icons
  wrapper
    .find(IconButton)
    .last()
    .simulate('click')

  // go back to the node dialog
  wrapper.find('button[aria-label="Close"]').simulate('click')

  // click the save button
  wrapper.find('button[aria-label="SAVE"]').simulate('click')

  const [
    finalSelectedIconIndex,
    finalIdentifierValue,
    finalLabelValue,
    finalNameValue,
  ] = mockOnClick.mock.calls[0]

  expect(finalSelectedIconIndex).toBe(
    mandatoryProps.availableIconNames.length - 1,
  )

  expect(finalIdentifierValue).toBe('foo')
  expect(finalLabelValue).toBe('bar')
  expect(finalNameValue).toBe('baz')
})

it('calls the isValidIdentifierValue prop when typing on the identifier text field', () => {
  const mockFn = jest.fn(() => {})

  const wrapper = mount(
    <AddNodeDialog {...mandatoryProps} isValidIdentifierValue={mockFn} />,
  )

  const identifierField = wrapper.find('input[name="identifier"]')

  identifierField.simulate('change', {
    target: {
      value: 'foo',
    },
  })

  expect(mockFn.mock.calls[0][0]).toBe('foo')
})

it('calls the isValidLabelValue prop when typing on the label text field', () => {
  const mockFn = jest.fn(() => {})

  const wrapper = mount(
    <AddNodeDialog {...mandatoryProps} isValidLabelValue={mockFn} />,
  )

  const labelField = wrapper.find('input[name="label"]')

  labelField.simulate('change', {
    target: {
      value: 'foo',
    },
  })

  expect(mockFn.mock.calls[0][0]).toBe('foo')
})

it('calls the isValidNameValue prop when typing on the name text field', () => {
  const mockFn = jest.fn(() => {})

  const wrapper = mount(
    <AddNodeDialog {...mandatoryProps} isValidNameValue={mockFn} />,
  )

  const nameField = wrapper.find('input[name="name"]')

  nameField.simulate('change', {
    target: {
      value: 'foo',
    },
  })

  expect(mockFn.mock.calls[0][0]).toBe('foo')
})
