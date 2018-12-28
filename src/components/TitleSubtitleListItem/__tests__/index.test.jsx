import React from 'react'

import { createMount, createShallow } from '@material-ui/core/test-utils'

import TitleSubtitleListItem from '../index'

describe('<TitleSubtitleListItem />', () => {
  let div, mount, shallow

  beforeEach(() => {
    div = document.createElement('div')
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
    const subTitle = Math.random().toString()
    const wrapper = mount(
      <TitleSubtitleListItem id="foo" title="baz" subTitle={subTitle} />,
    )

    const html = wrapper.html()

    expect(html.indexOf(subTitle) > -1).toBe(true)
  })
})
