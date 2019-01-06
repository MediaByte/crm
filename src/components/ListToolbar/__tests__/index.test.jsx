import React from 'react'
import { createMount, createShallow } from '@material-ui/core/test-utils'

import ListToolbar from '../index'

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

it('renders without crashing when given its mandatory props', () => {
  mount(
    <ListToolbar
      filterIconRef={() => {}}
      filterMenuAnchorEl={document.createElement('div')}
      numberOfRecords={5}
      possibleStatuses={[]}
    />,
  )
})

it('shallowly renders without crashing too', () => {
  shallow(
    <ListToolbar
      filterIconRef={() => {}}
      filterMenuAnchorEl={document.createElement('div')}
      numberOfRecords={5}
      possibleStatuses={[]}
    />,
  )
})
