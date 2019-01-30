import React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'

import ErrorOutline from '@material-ui/icons/ErrorOutline'

import Dialog from '.'
/**
 * @typedef {import('.').Props} Props
 */

/**
 * @type {Props}
 */
const baseProps = {
  handleClose: action('handleClose'),
  onClickActionButton: action('onClickActionButton'),
  onClickCloseButton: action('onClickActionButton'),
  open: true,
  title: 'Title',
}

storiesOf('Dialog', module)
  .add('empty', () => <Dialog {...baseProps} />)
  .add('with some content', () => (
    <Dialog {...baseProps} actionButtonText="Submit">
      <TextField
        fullWidth
        helperText="Only letters (a-z, A-Z) are allowed"
        label="Name"
        InputProps={{
          endAdornment: (
            <Tooltip title="This is the name of the table that lives in the database">
              <InputAdornment position="end">
                <ErrorOutline color="primary" />
              </InputAdornment>
            </Tooltip>
          ),
        }}
      />
    </Dialog>
  ))
