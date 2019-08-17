import React from 'react'

import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

/**
 * @typedef {import('@material-ui/core/TextField').TextFieldProps} TextFieldProps
 * @typedef {import('@material-ui/core').Theme} Theme
 */
/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRulesCallback<K>} StyleRulesCallback
 */

import ErrorOutline from '@material-ui/icons/ErrorOutline'

const styles = {
  menuIcon: {
    padding: '0 15px 0 5px',
  },
}

/**
 * @type {TextFieldProps['InputProps']}
 */
const nameFieldInputProps = {
  endAdornment: (
    <Tooltip title="Node name is a machine readable name that will be used for records, exporting, etc...">
      <InputAdornment position="end">
        <ErrorOutline color="primary" />
      </InputAdornment>
    </Tooltip>
  ),
}

/**
 * @type {TextFieldProps['InputProps']}
 */
const descriptionFieldInputProps = {
  endAdornment: (
    <Tooltip title="Labels are free form and display in the sidebar for navigation and the header of the node">
      <InputAdornment position="end">
        <ErrorOutline color="primary" />
      </InputAdornment>
    </Tooltip>
  ),
}

/**
 * @typedef {object} Props
 * @prop {(string|undefined)=} currentDescValue (Optional)
 * @prop {(string|undefined|null)=} currentDescErrorMessage (Optional)
 * @prop {(string|undefined)=} currentNameValue (Optional)
 * @prop {(string|undefined|null)=} currentNameErrorMessage (Optional)
 * @prop {(boolean|undefined)=} disableDescInput (Optional)
 * @prop {(boolean|undefined)=} disableNameInput (Optional)
 * @prop {(((nextNameValue: string) => void)|undefined)=} onDescChange
 * (Optional)
 * @prop {(((nextNameValue: string) => void)|undefined)=} onNameChange
 * (Optional)
 */

/**
 * @augments React.PureComponent<Props>
 */
class AddGroupForm extends React.PureComponent {
  /**
   * @private
   * @param {{ target: { value: string }}} e
   */
  onDescChange = ({ target: { value } }) => {
    const { onDescChange } = this.props

    onDescChange && onDescChange(value)
  }

  /**
   * @private
   * @param {{ target: { value: string } }} e
   */
  onNameChange = ({ target: { value } }) => {
    const { onNameChange } = this.props

    onNameChange && onNameChange(value)
  }

  render() {
    const {
      currentDescErrorMessage,
      currentDescValue,
      currentNameErrorMessage,
      currentNameValue,
      disableDescInput,
      disableNameInput,
    } = this.props

    return (
      <Grid
        alignContent="center"
        alignItems="center"
        container
        direction="column"
        justify="center"
        style={bodyDialogAddGroup}
        spacing={8}
      >
        <TextField
          autoFocus
          error={!!currentNameErrorMessage}
          disabled={disableNameInput}
          fullWidth
          id="add-group-dialog-name-field" // required for Accessibility
          label="Name"
          name="name"
          // @ts-ignore
          onChange={this.onNameChange}
          value={currentNameValue}
          required
        />

        <TextField
          error={!!currentDescErrorMessage}
          disabled={disableDescInput}
          fullWidth
          helperText={currentDescErrorMessage}
          id="add-group-dialog-description-field" // required for Accessibility
          label="Description"
          name="description" // for accessibility only
          // @ts-ignore
          onChange={this.onDescChange}
          value={currentDescValue}
          style={TextFieldMt}
        />
      </Grid>
    )
  }
}

/**
 * @type {React.CSSProperties}
 */
const bodyDialogAddGroup = {
  padding: '0px',
}
/**
 * @type {React.CSSProperties}
 */
const TextFieldMt = {
  marginTop: '15px',
}

export default withStyles(styles)(AddGroupForm)
