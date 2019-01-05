import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import PhoneIcon from '@material-ui/icons/Phone'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import TitleSubtitleTuple from '..'

storiesOf('TitleSubtitleTuple', module)
  .add('with names', () => (
    <TitleSubtitleTuple subtitle="Daniel Lugo" title="Name" />
  ))
  .add('with a number', () => (
    <TitleSubtitleTuple subtitle="312 - 555 - 4545" title="Phone" />
  ))
  .add('wrapped in a card', () => (
    <Card
      style={{
        width: 500,
      }}
      raised
    >
      <CardContent>
        <TitleSubtitleTuple
          onClick={action('clicked')}
          subtitle="Daniel Lugo"
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
        <TitleSubtitleTuple
          icon={PhoneIcon}
          onClick={action('clicked')}
          subtitle="Daniel Lugo"
          title="Name"
        />
      </CardContent>
    </Card>
  ))
