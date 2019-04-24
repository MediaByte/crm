import React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import SomeIcon from '@material-ui/icons/QueueMusic'

import SelectableIcon from '..'
/**
 * @typedef {import('..').Props} Props
 */

const baseProps = {
  onClick: action('onClick'),
}

storiesOf('SelectableIcon', module)
  .add('default', () => (
    <SelectableIcon {...baseProps}>
      <SomeIcon />
    </SelectableIcon>
  ))
  .add('Selected', () => (
    <SelectableIcon {...baseProps} selected>
      <SomeIcon />
    </SelectableIcon>
  ))
  .add('big', () => (
    <SelectableIcon {...baseProps} big>
      <SomeIcon />
    </SelectableIcon>
  ))
  .add('Big Selected', () => (
    <SelectableIcon {...baseProps} big selected>
      <SomeIcon />
    </SelectableIcon>
  ))
