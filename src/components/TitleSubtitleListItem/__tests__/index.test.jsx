import React from 'react'

import { createMount, createShallow } from '@material-ui/core/test-utils'

import TitleSubtitleListItem from '../index'

describe('<TitleSubtitleListItem />', () => {
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

  afterEach(() => {
    mount.cleanUp()
  })

  it('shallowly renders without crashing when given its mandatory props', () => {
    shallow(<TitleSubtitleListItem id={Math.random()} title="baz" />)
  })

  it('renders without crashing when given its mandatory props', () => {
    mount(<TitleSubtitleListItem id={Math.random()} title="baz" />)
  })

  it('renders the title', () => {
    const title = Math.random().toString()
    const wrapper = mount(
      <TitleSubtitleListItem id={Math.random()} title={title} />,
    )

    const html = wrapper.html()

    expect(html.indexOf(title) > -1).toBe(true)
  })

  it('renders the subtitle', () => {
    const subTitle = Math.random().toString()
    const wrapper = mount(
      <TitleSubtitleListItem
        id={Math.random()}
        title="baz"
        subtitle={subTitle}
      />,
    )

    const html = wrapper.html()

    expect(html.indexOf(subTitle) > -1).toBe(true)
  })
})
