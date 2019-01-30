import React from 'react'

import Select from '@material-ui/core/Select'
import { createMount } from '@material-ui/core/test-utils'

import SomeIcon from '@material-ui/icons/CalendarToday'

import PropForm from '.'

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

/**
 * @type {import('.').Props}
 */
const baseProps = {
  availableTypes: [
    'textfield',
    'phone',
    'address',
    'picklist',
    'radio',
    'checkbox',
    'time',
    'date',
    'memo',
  ],
}

it('renders without crashing', () => {
  mount(<PropForm {...baseProps} />)
})

it("doesn't hide the type selection if the hideTypeSelection prop isn't passed", () => {
  const wrapper = mount(<PropForm {...baseProps} />)

  // I compare to 1 on purpose in case this form gets more selects in the future
  const selectionIsThere = wrapper.find(Select).length === 1

  expect(selectionIsThere).toBe(true)
})

it('hides the type selection if the hideTypeSelection prop is passed', () => {
  const wrapper = mount(<PropForm {...baseProps} />)

  const selectionIsThere = wrapper.find(Select).length === 0

  expect(selectionIsThere).toBe(false)
})

it('renders the initial label value if provided with it', () => {
  const str = Math.random().toString()

  const wrapper = mount(<PropForm {...baseProps} initialLabelValue={str} />)

  const isThere = wrapper.html().indexOf(str) > -1

  expect(isThere).toBe(true)
})

it('renders the initial name value if provided with it', () => {
  const str = Math.random().toString()

  const wrapper = mount(<PropForm {...baseProps} initialNameValue={str} />)

  const isThere = wrapper.html().indexOf(str) > -1

  expect(isThere).toBe(true)
})

it('renders the initial tooltip value if provided with it', () => {
  const str = Math.random().toString()

  const wrapper = mount(<PropForm {...baseProps} initialTooltipValue={str} />)

  const isThere = wrapper.html().indexOf(str) > -1

  expect(isThere).toBe(true)
})

it('renders the provided selectedIcon and calls the onClickSelectIcon() prop when clicking on that icon', () => {
  const mockfn = jest.fn()

  const wrapper = mount(
    <PropForm
      {...baseProps}
      onClickSelectIcon={mockfn}
      selectedIcon={SomeIcon}
    />,
  )

  wrapper.find(SomeIcon).simulate('click')

  expect(mockfn).toHaveBeenCalled()
})

it('calls the onLabelChange() prop with the next value', () => {
  const mockfn = jest.fn()
  const foo = 'foo'

  const wrapper = mount(<PropForm {...baseProps} onLabelChange={mockfn} />)

  wrapper.find('input[name="label"]').simulate('change', {
    target: {
      value: foo,
    },
  })

  expect(mockfn).toHaveBeenCalledWith(foo)
})

it('calls the onNameChange() prop with the next value', () => {
  const mockfn = jest.fn()
  const foo = 'foo'

  const wrapper = mount(<PropForm {...baseProps} onNameChange={mockfn} />)

  wrapper.find('input[name="name"]').simulate('change', {
    target: {
      value: foo,
    },
  })

  expect(mockfn).toHaveBeenCalledWith(foo)
})

it('calls the onTooltipChange() prop with the next value', () => {
  const mockfn = jest.fn()
  const foo = 'foo'

  // pass in initialTooltipValue to enable the tooltip input field
  const wrapper = mount(
    <PropForm
      {...baseProps}
      initialTooltipValue="baz"
      onTooltipChange={mockfn}
    />,
  )

  wrapper.find('input[name="tooltip"]').simulate('change', {
    target: {
      value: foo,
    },
  })

  expect(mockfn).toHaveBeenCalledWith(foo)
})

it('calls the onTypeChange() prop when a type is selected', () => {
  const mockfn = jest.fn()
  const baseWrapper = mount(<PropForm {...baseProps} onTypeChange={mockfn} />)

  // open up the menu
  baseWrapper.find('[aria-haspopup="true"]').simulate('click')

  const wrapper = baseWrapper.find('ul')

  wrapper.find('li[data-value="textfield"]').simulate('click')

  expect(mockfn).toHaveBeenCalledWith('textfield')
})

fit('returns the correct form data when calling the getFormData() instance method', () => {
  const initialLabelValue = Math.random().toString()
  const initialNameValue = Math.random().toString()
  const initialTooltipValue = Math.random().toString()

  const wrapper = mount(
    <PropForm
      {...baseProps}
      initialLabelValue={initialLabelValue}
      initialNameValue={initialNameValue}
      initialTooltipValue={initialTooltipValue}
    />,
  )

  /**
   * @type {import('.').AddPropFormInterface}
   */
  const instance = wrapper.instance()

  const data = instance.getFormData()

  /**
   * @type {import('.').FormData}
   */
  const expected = {
    label: initialLabelValue,
    name: initialNameValue,
    tooltip: initialTooltipValue,
    type: baseProps.availableTypes[0],
  }

  expect(data).toEqual(expected)
})
