import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import PhoneIcon from '@material-ui/icons/Phone'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import TitleShortTextTuple from '..'

storiesOf('TitleShortTextTuple', module)
  .add('with names', () => (
    <TitleShortTextTuple text="Daniel Lugo" title="Name" />
  ))
  .add('with a number', () => (
    <TitleShortTextTuple text="312 - 555 - 4545" title="Phone" />
  ))
  .add('wrapped in a card', () => (
    <Card
      style={{
        width: 500,
      }}
      raised
    >
      <CardContent>
        <TitleShortTextTuple
          onClick={action('clicked')}
          text="Daniel Lugo"
          title="Name"
        />
      </CardContent>
    </Card>
  ))
  .add('given an icon', () => (
    <Card
      style={{
        width: 500,
      }}
      raised
    >
      <CardContent>
        <TitleShortTextTuple
          icon={PhoneIcon}
          onClick={action('clicked')}
          text="Daniel Lugo"
          title="Name"
        />
      </CardContent>
    </Card>
  ))
