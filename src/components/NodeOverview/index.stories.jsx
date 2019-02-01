import React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import Component from '.'

/**
 * @type {Required<import('.').Props>}
 */
const baseProps = {
  iconName: 'calendar',
  identifier: 'PRSN-0001',
  label: 'People',
  name: 'PERSON',
  onClickAddProperty: action('onClickAddProperty'),
  onClickAddRelationship: action('onClickAddRelationship'),
  onClickProperty: action('onClickProperty'),
  onClickRelationship: action('onClickRelationship'),
  properties: [
    {
      name: 'Name',
      type: 'textfield',
      readableType: 'Text Field',
    },
    {
      name: 'Phone',
      type: 'textfield',
      readableType: 'Text Field',
    },
    {
      name: 'Billing Address',
      type: 'address',
      readableType: 'Address',
    },
  ],
  relationships: [
    {
      name: 'Works At',
      relatedNodeName: 'Establishment',
    },
    {
      name: 'Owns',
      relatedNodeName: 'Vehicle',
    },
    {
      name: 'Drives',
      relatedNodeName: 'Vehicle',
    },
  ],
}

storiesOf('NodeOverview', module)
  .add('default look', () => <Component {...baseProps} />)
  .add("it's responsive, try resizing the window", () => (
    <Component {...baseProps} />
  ))
  .add('given some other icon', () => (
    <Component {...baseProps} iconName="pindrop" />
  ))
