import React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import SomeIcon from '@material-ui/icons/QueueMusic'

import PropForm from '.'

/**
 * @type {import('.').Props}
 */
const baseProps = {
  availableTypes: [
    'textfield',
    'phone',
    'address',
    'picklist',
    'radio',
    'checkbox',
    'time',
    'date',
    'memo',
  ],
  onClickSelectIcon: action('onClickSelectIcon'),
  onLabelChange: action('onLabelChange'),
  onNameChange: action('onNameChange'),
  onTooltipChange: action('onTooltipChange'),
  onTypeChange: action('onTypeChange'),
}

storiesOf('PropForm', module)
  .add('default look', () => <PropForm {...baseProps} />)
  .add('given some random icon', () => (
    <PropForm {...baseProps} selectedIcon={SomeIcon} />
  ))
  .add('with initial values', () => (
    <PropForm
      {...baseProps}
      initialLabelValue="A Label"
      initialNameValue="AName"
    />
  ))
  .add('with the tooltip initially enabled', () => (
    <PropForm {...baseProps} initialTooltipValue="Initial Tooltip Value" />
  ))
