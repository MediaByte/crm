import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Card from '@material-ui/core/Card'

import DialogAppBar from '..'

const onClickActionButton = action('click-action-button')
const onClickCloseButton = action('click-close-button')

storiesOf('DialogAppBar', module)
  .add('how it looks', () => (
    <DialogAppBar
      actionButtonText="Action"
      title="Title"
      onClickActionButton={onClickActionButton}
      onClickCloseButton={onClickCloseButton}
    />
  ))
  .add('inside a card', () => (
    <Card
      style={{
        height: 400,
        width: 600,
      }}
    >
      <DialogAppBar
        actionButtonText="Action"
        title="THIS IS NOT THE FONT THOUGH"
        onClickActionButton={onClickActionButton}
        onClickCloseButton={onClickCloseButton}
      />
    </Card>
  ))
