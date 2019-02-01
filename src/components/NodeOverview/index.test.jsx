import React from 'react'

import { createMount } from '@material-ui/core/test-utils'

import Component from '.'

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
  iconName: 'calendar',
  identifier: 'PRSN-0001',
  label: 'People',
  name: 'PERSON',
  properties: [
    {
      name: 'Name',
      type: 'textfield',
      readableType: 'Text Field',
    },
    {
      name: 'Phone',
      type: 'textfield',
      readableType: 'Text Field',
    },
    {
      name: 'Billing Address',
      type: 'address',
      readableType: 'Address',
    },
  ],
  relationships: [
    {
      name: 'Works At',
      relatedNodeName: 'Establishment',
    },
    {
      name: 'Owns',
      relatedNodeName: 'Vehicle',
    },
    {
      name: 'Drives',
      relatedNodeName: 'Vehicle',
    },
  ],
}

it('renders without crashing when given its mandatory props', () => {
  mount(<Component {...baseProps} />)
})

it('calls the onClickAddProperty() prop when clicking on that button', () => {
  const fn = jest.fn()

  const wrapper = mount(<Component {...baseProps} onClickAddProperty={fn} />)

  wrapper
    .find('[aria-label="add node property"]')
    .hostNodes()
    .simulate('click')

  expect(fn).toHaveBeenCalled()
})

it('calls the onClickAddRelationship() prop when clicking on that button', () => {
  const fn = jest.fn()

  const wrapper = mount(
    <Component {...baseProps} onClickAddRelationship={fn} />,
  )

  wrapper
    .find('[aria-label="add node relationship"]')
    .hostNodes()
    .simulate('click')

  expect(fn).toHaveBeenCalled()
})

it('calls the onClickProperty() prop with the correct index when clicking on that property', () => {
  const fn = jest.fn()

  const wrapper = mount(<Component {...baseProps} onClickProperty={fn} />)

  baseProps.properties.forEach(({ name }, i) => {
    const propEl = wrapper.find(`[aria-label="property ${name}"]`).hostNodes()

    propEl.simulate('click')

    expect(fn).toHaveBeenLastCalledWith(i)
  })
})

it('calls the onClickRelationship() prop with the correct index when clicking on that relationship', () => {
  const fn = jest.fn()

  const wrapper = mount(<Component {...baseProps} onClickRelationship={fn} />)

  baseProps.relationships.forEach(({ name }, i) => {
    const propEl = wrapper
      .find(`[aria-label="relationship ${name}"]`)
      .hostNodes()

    propEl.simulate('click')

    expect(fn).toHaveBeenLastCalledWith(i)
  })
})
