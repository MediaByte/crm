import React from 'react'
import ReactDOM from 'react-dom'

import { createMount, createShallow } from '@material-ui/core/test-utils'

import Dialog from '.'

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

const mockPreventDefaultEvent = {
  preventDefault() {},
}

/**
 * @type {import('.').Props}
 */
const mandatoryProps = {
  open: true,
  title: 'title',
}

it('renders without crashing when given its mandatory props', () => {
  mount(<Dialog {...mandatoryProps} />)
})

it('shallowly renders without crashing when given its mandatory props', () => {
  createShallow()(<Dialog {...mandatoryProps} />)
})

it('renders the content', () => {
  const rnd = Math.random().toString()
  const rnd2 = Math.random().toString()
  const content = <div id={rnd}>{rnd2}</div>

  const wrapper = mount(<Dialog {...mandatoryProps}>{content}</Dialog>)

  expect(wrapper.contains(content)).toBeTruthy()
})

it('calls the handleClose prop when clicking outside of it', () => {
  // https://stackoverflow.com/questions/45046728/unit-testing-react-click-outside-component
  const map = {}

  document.addEventListener = jest.fn((event, cb) => {
    map[event] = cb
  })

  const mockHandleClose = jest.fn()

  const wrapper = mount(
    <Dialog {...mandatoryProps} handleClose={mockHandleClose} />,
  )

  console.log(map)

  map.focus({
    target: ReactDOM.findDOMNode(wrapper.find('body').instance()),
  })

  expect(mockHandleClose).toHaveBeenCalled()
})
