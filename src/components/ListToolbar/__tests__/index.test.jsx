import React from 'react'
import ReactDOM from 'react-dom'

import { createMount, createShallow } from '@material-ui/core/test-utils'

import ListToolbar from '../index'

const fn = () => {}

describe('<ListToolbar />', () => {
  let div, mount, shallow

  beforeEach(() => {
    div = document.createElement('div')
    shallow = createShallow()
    mount = createMount()
  })

  afterEach(() => {
    mount.cleanUp()
  })

  it('renders without crashing when given its mandatory props', () => {
    mount(
      <ListToolbar
        filterMenuAnchorEl={div}
        filterMenuOpen
        possibleStatuses={[]}
        numberOfRecords={5}
        onChangeSearchValue={fn}
        onClickAddNewGroup={fn}
        onClickFilterButton={fn}
        onClickSearch={fn}
        onCloseFilterMenu={fn}
        onFilterMenuStatusChange={fn}
      />,
    )
  })

  it('shallowly renders without crashing too', () => {
    shallow(
      <ListToolbar
        filterMenuAnchorEl={div}
        filterMenuOpen
        possibleStatuses={[]}
        numberOfRecords={5}
        onChangeSearchValue={fn}
        onClickAddNewGroup={fn}
        onClickFilterButton={fn}
        onClickSearch={fn}
        onCloseFilterMenu={fn}
        onFilterMenuStatusChange={fn}
      />,
    )
  })
})
