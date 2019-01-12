import React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import SomeIcon from '@material-ui/icons/QueueMusic'

import AddNodeDialog from '..'

const someSvgIcon = { iconNode: SomeIcon, id: '0' }

const baseProps = {
  handleClose: action('handleClose'),
  handleSave: action('handleSave'),
  iconSelectValue: someSvgIcon.id,
  identifierFieldError: false,
  labelFieldError: false,
  nameFieldError: false,
  onChangeIconSelect: action('onChangeIconSelect'),
  onChangeIdentifierField: action('onChangeIdentifierField'),
  onChangeLabelField: action('onChangeLabelField'),
  onChangeNameField: action('onChangeNameField'),
  open: true,
  svgIcons: [someSvgIcon],
}

const textInputtedProps = {
  identifierFieldValue: 'ROX1',
  labelFieldValue: 'Special Shipping Routes',
  nameFieldValue: 'routeSpecial',
}

storiesOf('AddNodeDialog', module)
  .add('how it looks given some random icon', () => (
    <AddNodeDialog {...baseProps} />
  ))
  .add('with some text inputted', () => (
    <AddNodeDialog {...baseProps} {...textInputtedProps} />
  ))
  .add("when there's an error in the inputs", () => (
    <AddNodeDialog
      {...baseProps}
      {...textInputtedProps}
      identifierFieldError
      labelFieldError
      nameFieldError
    />
  ))
