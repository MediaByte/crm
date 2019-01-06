import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ListToolbar from '..'

storiesOf('ListToolbar', module)
  .add('default look', () => (
    <ListToolbar
      filterIconRef={() => {}}
      filterMenuAnchorEl={document.createElement('div')}
      numberOfRecords={5}
      onClickAdd={action('click-add')}
      onClickDownload={action('click-download')}
      onClickFilterButton={action('click-filter-button')}
      onClickSearch={action('click-search')}
      filterMenuCurrentStatusValue=""
      onChangeSearchValue={action('change-search-value')}
      possibleStatuses={[]}
    />
  ))
  .add('showing search', () => (
    <ListToolbar
      filterIconRef={() => {}}
      filterMenuAnchorEl={document.createElement('div')}
      numberOfRecords={5}
      onClickAdd={action('click-add')}
      onClickDownload={action('click-download')}
      onClickFilterButton={action('click-filter-button')}
      onClickSearch={action('click-search')}
      filterMenuCurrentStatusValue=""
      onChangeSearchValue={action('change-search-value')}
      possibleStatuses={[]}
      showSearch
    />
  ))
