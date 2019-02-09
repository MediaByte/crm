import React from 'react'

import * as _ from 'lodash'

import { createMount } from '@material-ui/core/test-utils'
/**
 * @typedef {import('@material-ui/core/styles/createBreakpoints').Breakpoint} Breakpoint
 */

import { nameToIconMap } from 'common/NameToIcon'

import Component from '.'

/** @type {ReadonlyArray<Breakpoint>} */
const WIDTHS = ['xs', 'sm', 'md', 'lg', 'xl']

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
 * @template T
 * @template K
 * @typedef {Pick<T, Exclude<keyof T, K>>} Omit
 */

/**
 * @template T
 * @typedef {import('./ComponentProps').ComponentProps<T>} ComponentProps
 */

// infer the components props types when wrapped in the hocs
/** @typedef {ComponentProps<typeof Component>} BaseProps */
// make them all required
/** @typedef {Required<BaseProps>} RequiredProps */
// we dont have to pass classes into it, we will however be passing width
/** @typedef {Omit<RequiredProps, 'classes'|'innerRef' >} Props */

/**
 * Sensible base props.
 * @type {Props}
 */
const baseProps = {
  forceHeader: false,
  forceNodeName: false,
  header: 'Daniel Lugo',
  nodeIconName: 'person',
  nodeName: 'People',
  onClickAddRelationship() {},
  onClickEditProps() {},
  onClickRelationship() {},
  properties: [
    {
      name: 'Name',
      type: 'textfield',
      value: 'John Smith',
    },
    {
      name: 'Phone',
      type: 'phone',
      value: '+3201564872',
    },
    {
      name: 'Address',
      type: 'address',
      value: '5th Av Manhattan, NY 11001',
    },
  ],
  relationships: [
    {
      icon: 'pindrop',
      name: 'Works At',
      displayValue: 'Taco Bell',
      subheader: "From node 'Restaurant'",
    },
    {
      icon: 'puzzle',
      name: 'Works With',
      displayValue:
        'Bailey Gallagher, Lucas Willis, Kayden Chapman, Tyler Stevens and Evan Russell',
      subheader: "From node 'Person'",
    },
  ],
  width: 'md',
}

it('renders without crashing', () => {
  createMount()(<Component />)
  createMount()(<Component {...baseProps} />)
})

it('renders the header at all sizes if forced', () => {
  const props = {
    forceHeader: true,
    header: Math.random().toString(),
  }

  WIDTHS.forEach(width => {
    const wrapper = createMount()(<Component {...props} width={width} />)

    expect(wrapper.contains(props.header)).toBe(true)
  })
})

it('renders the node name at all sizes if forced to do so (after being forced to render the header)', () => {
  const props = {
    forceHeader: true,
    forceNodeName: true,
    header: Math.random().toString(),
    nodeName: Math.random().toString(),
  }

  WIDTHS.forEach(width => {
    const wrapper = createMount()(<Component {...props} width={width} />)

    expect(wrapper.contains(props.nodeName)).toBe(true)
  })
})

it('renders the header only on small screens', () => {
  const props = {
    header: Math.random().toString(),
  }

  WIDTHS.forEach(width => {
    const wrapper = createMount()(<Component {...props} width={width} />)

    expect(wrapper.contains(props.header)).toBe(width === 'xs')
  })
})

it('renders the node icon when provided with it if also provided with a node name and a header on small screens', () => {
  const props = {
    header: Math.random().toString(),
    nodeName: Math.random().toString(),
    nodeIconName: 'calendar',
  }

  const iconTriple = nameToIconMap['calendar']

  // TODO: Why isn't typescript offering ES6 array methods here?
  // I would have used Object.values()
  const iconVariants = _.values(iconTriple)

  const wrapper = createMount()(<Component {...props} width="xs" />)

  const containsAtLeastOneVariant = _.some(
    iconVariants,
    variant => wrapper.find(variant).length > 0,
  )

  expect(containsAtLeastOneVariant).toBe(true)
})

it(' it calls the onClickAddRelationship() with the correct index when clicking on the corresponding button', () => {
  const mock = jest.fn()

  const wrapper = mount(
    <Component {...baseProps} onClickAddRelationship={mock} />,
  )

  baseProps.relationships.forEach(({ name }, i) => {
    wrapper
      .find(`[aria-label="add ${name} relationship"]`)
      .hostNodes()
      .simulate('click', {
        target: {
          dataset: {
            recordOverviewIndex: i,
          },
        },
      })

    expect(mock).toHaveBeenLastCalledWith(i)
  })
})

it('calls the onClickEditProps() when clicking on the corresponding button', () => {
  const mock = jest.fn()

  const wrapper = mount(<Component {...baseProps} onClickEditProps={mock} />)

  wrapper
    .find('[aria-label="edit properties"]')
    .hostNodes()
    .simulate('click')

  expect(mock).toHaveBeenCalled()
})

it('calls the onClickRelationship() with the correct index when clicking on the corresponding reslationship', () => {
  const mock = jest.fn()

  const wrapper = mount(<Component {...baseProps} onClickRelationship={mock} />)

  baseProps.relationships.forEach(i => {
    wrapper.find(`[data-record-overview-index="${i}"]`).simulate('click', {
      currentTarget: {
        dataset: {
          dataRecordOverviewIndex: i,
        },
      },
    })

    expect(mock).toHaveBeenLastCalledWith(i)
  })
})

it('renders the properties', () => {
  const wrapper = mount(<Component {...baseProps} />)

  baseProps.properties.forEach(({ value }) => {
    expect(wrapper.contains(value)).toBe(true)
  })
})

it('renders the relationships', () => {
  const wrapper = mount(<Component {...baseProps} />)

  baseProps.relationships.forEach(({ displayValue }) => {
    expect(wrapper.contains(displayValue)).toBe(true)
  })
})
