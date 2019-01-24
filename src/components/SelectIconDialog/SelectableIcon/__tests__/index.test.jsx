import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import { createMount, createShallow } from '@material-ui/core/test-utils'

import SomeIcon from '@material-ui/icons/ErrorOutline'

import SelectableIcon from '..'

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

const mandatoryProps = {
  children: <SomeIcon />,
}

afterEach(() => {
  mount.cleanUp()
})

it('renders without crashing when given its mandatory props', () => {
  mount(<SelectableIcon {...mandatoryProps} />)
})

it('shallowly renders without crashing when given its mandatory props', () => {
  shallow(<SelectableIcon {...mandatoryProps} />)
})

it('calls the onClick prop when clicked', () => {
  const mockOnClick = jest.fn(() => {})

  const wrapper = mount(
    <SelectableIcon {...mandatoryProps} onClick={mockOnClick} />,
  )

  const iconButton = wrapper.find(IconButton)

  iconButton.simulate('click')

  expect(mockOnClick.mock.calls.length).toBe(1)
})

// sadly we cannot currently test this
// https://github.com/airbnb/enzyme/issues/1435
// it('renders a bigger sized icon when passed in the big prop', () => {
//   document.body.innerHTML = `
//     <div id="small"></div>
//     <div id="big"></div>
//   `
//   const small = mount(<SelectableIcon {...mandatoryProps} />, {
//     attachTo: /** @type {HTMLElement} */ (document.querySelector('#small')),
//   })

//   const big = mount(<SelectableIcon {...mandatoryProps} big />, {
//     attachTo: /** @type {HTMLElement} */ (document.querySelector('#big')),
//   })

//   const smallHeight = small.getDOMNode().clientHeight
//   const bigHeight = big.getDOMNode().clientHeight

//   const bigHeightIsGreater = bigHeight > smallHeight

//   expect(bigHeightIsGreater).toBe(true)
// })

it('renders the provided icon', () => {
  const wrapper = mount(<SelectableIcon {...mandatoryProps} />)

  // we use find(Type) instead of contains(Element) because of:
  // https://github.com/jsdom/jsdom/issues/2128
  expect(wrapper.find(SomeIcon).length).toBe(1)
})
