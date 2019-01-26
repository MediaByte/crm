import React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import PuzzleFilled from '@material-ui/icons/Extension'
import QueueMusic from '@material-ui/icons/QueueMusic'

import IconTextDropDown from '.'

/**
 * @type {import('.').Props}
 */
const baseProps = {
  items: [
    { icon: QueueMusic, value: 'audio' },
    { readableText: 'Date', value: 'date' },
    { icon: PuzzleFilled, readableText: 'Plug-in', value: 'plugin' },
  ],
  onValueChange: action('onValueChange'),
}

storiesOf('IconTextDropDown', module).add('default look', () => (
  <IconTextDropDown {...baseProps} />
))
