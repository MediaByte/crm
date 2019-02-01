import { configure } from '@storybook/react'
import { configureViewport } from '@storybook/addon-viewport'

const req = require.context('../src', true, /\.stories\.jsx?$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
