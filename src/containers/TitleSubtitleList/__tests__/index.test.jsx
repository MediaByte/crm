import React from 'react'

import { createMount, createShallow } from '@material-ui/core/test-utils'

import TitleSubtitleList from '..'

/**
 * @typedef {{foo: string }} MockItem
 */

/**
 * @type {MockItem[]}
 */
const mockItems = [
  {
    foo: 'Baz',
  },
]

/**
 * @param {MockItem} item
 */
const mockExtractTitle = item => item.foo

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

it('shallowly renders without crashing when given its mandatory props', () => {
  shallow(
    <TitleSubtitleList extractTitle={mockExtractTitle} items={mockItems} />,
  )
})

it('deeply renders without crashing when given its mandatory props', () => {
  mount(<TitleSubtitleList extractTitle={mockExtractTitle} items={mockItems} />)
})
