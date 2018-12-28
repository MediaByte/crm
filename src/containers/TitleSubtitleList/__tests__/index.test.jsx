import React from 'react'

import { createMount, createShallow } from '@material-ui/core/test-utils'

import TitleSubtitleList from '../index'

describe('<TitleSubtitleList />', () => {
  let mount, shallow

  beforeEach(() => {
    shallow = createShallow()
    mount = createMount()
  })

  afterEach(() => {
    mount.cleanUp()
  })

  it('shallowly renders without crashing when given its mandatory props', () => {
    shallow(<TitleSubtitleListItem id="foo" title="baz" />)
  })

  it('renders without crashing when given its mandatory props', () => {
    mount(<TitleSubtitleListItem id="foo" title="baz" />)
  })

  it('renders the title', () => {
    const title = Math.random().toString()
    const wrapper = mount(<TitleSubtitleListItem id="foo" title={title} />)

    const html = wrapper.html()

    expect(html.indexOf(title) > -1).toBe(true)
  })

  it('renders the subtitle', () => {
    const subtitle = Math.random().toString()
    const wrapper = mount(
      <TitleSubtitleListItem id="foo" title="baz" subtitle={subtitle} />,
    )

    const html = wrapper.html()

    expect(html.indexOf(subtitle) > -1).toBe(true)
  })
})
