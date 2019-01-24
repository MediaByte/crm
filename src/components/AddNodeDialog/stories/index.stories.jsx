import React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import SomeIcon from '@material-ui/icons/QueueMusic'

import AddNodeDialog from '..'
/**
 * @typedef {import('..').Props} Props
 */

// ok, this breaks this module's encapsulation, but it's only an story, not
// an implementation - related thing
import Container from '../../../containers/AddNodeDialog'

import { nameToIconMap } from '../../../common/NameToIcon'

/**
 * @type {Pick<Props, Exclude<keyof Props, 'classes'>>}
 */
const baseProps = {
  handleClose: action('handleClose'),
  handleSave: action('handleSave'),
  onChangeIdentifierField: action('onChangeIdentifierField'),
  onChangeLabelField: action('onChangeLabelField'),
  onChangeNameField: action('onChangeNameField'),
  open: true,
  selectedIcon: SomeIcon,
}

/**
 * @type {Pick<Props, Exclude<keyof Props, 'classes'|'open'|'selectedIcon'>>}
 */
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
  .add('Test with its container', () => (
    <Container
      availableIconNames={Object.keys(nameToIconMap)}
      handleClose={action('handleClose')}
      handleSave={action('handleSave')}
      isValidIdentifierValue={() => {
        action('isValidIdentifierValue')
        return true
      }}
      isValidLabelValue={() => {
        action('isValidLabelValue')
        return true
      }}
      isValidNameValue={() => {
        action('isValidNameValue')
        return true
      }}
      open={true}
    />
  ))
