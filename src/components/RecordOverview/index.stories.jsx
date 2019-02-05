import React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import Component from '.'

/**
 * @template T
 * @template K
 * @typedef {Pick<T, Exclude<keyof T, K>>} Omit
 */

/**
 * @template T
 * @typedef {import('./ComponentProps').ComponentProps<T>} ComponentProps
 */

// infer the components props types when wrapped in the hocs
/** @typedef {ComponentProps<typeof Component>} BaseProps */
// make them all required
/** @typedef {Required<BaseProps>} RequiredProps */
// we dont have to pass classes into it, we will however be passing width
/** @typedef {Omit<RequiredProps, 'classes'|'innerRef' >} Props */

/**
 * Sensible base props.
 * @type {Props}
 */
const baseProps = {
  forceHeader: false,
  forceNodeName: false,
  header: 'Daniel Lugo',
  nodeIconName: 'person',
  nodeName: 'People',
  onClickAddRelationship: action('onClickAddRelationship'),
  onClickEditProps: action('onClickEditProps'),
  onClickRelationship: action('onClickRelationship'),
  properties: [
    {
      name: 'Name',
      type: 'textfield',
      value: 'John Smith',
    },
    {
      name: 'Phone',
      type: 'phone',
      value: '+3201564872',
    },
    {
      name: 'Address',
      type: 'address',
      value: '5th Av Manhattan, NY 11001',
    },
  ],
  relationships: [
    {
      icon: 'pindrop',
      name: 'Works At',
      displayValue: 'Taco Bell',
      subheader: "From node 'Restaurant'",
    },
    {
      icon: 'puzzle',
      name: 'Works With',
      displayValue:
        'Bailey Gallagher, Lucas Willis, Kayden Chapman, Tyler Stevens and Evan Russell',
      subheader: "From node 'Person'",
    },
  ],
  width: 'md',
}

storiesOf('RecordOverview', module)
  .add('default look', () => <Component {...baseProps} />)
  .add("it's responsive, try resizing the window", () => (
    <Component {...baseProps} />
  ))
