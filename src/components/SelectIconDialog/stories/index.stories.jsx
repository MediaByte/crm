import React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import SomeIcon from '@material-ui/icons/QueueMusic'

import SelectIconDialog from '..'
import { IconStyle } from '..'
/**
 * @typedef {import('..').Props} Props
 */

/**
 * @type {Pick<Props, Exclude<keyof Props, 'classes'>>}
 */
const baseProps = {
  currentIconStyle: IconStyle.filled,
  children: [
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
    <SomeIcon />,
  ],
  handleClose: action('handleClose'),
  onClickIcon: action('clickIcon'),
  open: true,
  selectedIconIndex: 0,
  onTabChange: action('onTabChange'),
}

storiesOf('SelectIconDialog', module)
  .add('default look', () => <SelectIconDialog {...baseProps} />)
  .add('with no icon selection', () => (
    <SelectIconDialog {...baseProps} selectedIconIndex={undefined} />
  ))
  .add('another tab selected', () => (
    <SelectIconDialog {...baseProps} currentIconStyle="outlined" />
  ))
