import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ListToolbar from '..'

storiesOf('ListToolbar', module)
  .add('default look', () => (
    <ListToolbar
      numberOfRecords={5}
      onClickAdd={action('clicked')}
      onClickDownload={action('clicked')}
      onClickFilterButton={action('clicked')}
      onClickSearch={action('clicked')}
      onChangeSearchValue={() => {}}
      onCloseFilterMenu={() => {}}
      onFilterMenuStatusChange={() => {}}
      possibleStatuses={[]}
    />
  ))
  .add('showing search field', () => (
    <ListToolbar
      numberOfRecords={5}
      onClickAdd={action('clicked')}
      onClickDownload={action('clicked')}
      onClickFilterButton={action('clicked')}
      onClickSearch={action('clicked')}
      onChangeSearchValue={() => {}}
      onCloseFilterMenu={() => {}}
      onFilterMenuStatusChange={() => {}}
      possibleStatuses={[]}
      showSearch
    />
  ))
