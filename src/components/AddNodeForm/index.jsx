import React from 'react'

import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
/**
 * @typedef {import('@material-ui/core/SvgIcon').SvgIconProps} SvgIconProps
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
const labelFieldInputProps = {
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
 * @prop {(string|undefined)=} currentLabelValue (Optional)
 * @prop {(string|undefined|null)=} currentLabelErrorMessage (Optional)
 * @prop {(string|undefined)=} currentNameValue (Optional)
 * @prop {(string|undefined|null)=} currentNameErrorMessage (Optional)
 * @prop {(boolean|undefined)=} disableLabelInput (Optional)
 * @prop {(boolean|undefined)=} disableNameInput (Optional)
 * @prop {(((nextNameValue: string) => void)|undefined)=} onLabelChange
 * (Optional)
 * @prop {(((nextNameValue: string) => void)|undefined)=} onNameChange
 * (Optional)
 */

/**
 * @augments React.PureComponent<Props>
 */
class AddNodeForm extends React.PureComponent {
  /**
   * @private
   * @param {{ target: { value: string }}} e
   */
  onLabelChange = ({ target: { value } }) => {
    const { onLabelChange } = this.props

    onLabelChange && onLabelChange(value)
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
      currentLabelErrorMessage,
      currentLabelValue,
      currentNameErrorMessage,
      currentNameValue,
      disableLabelInput,
      disableNameInput,
    } = this.props

    return (
      <Grid
        alignContent="center"
        alignItems="center"
        container
        direction="column"
        justify="center"
        style={bodyDialogAddNode}
      >
        <TextField
          error={!!currentNameErrorMessage}
          disabled={disableNameInput}
          InputProps={nameFieldInputProps}
          fullWidth
          helperText={
            currentNameErrorMessage || 'Node Names must be alphanumeric'
          }
          id="add-node-dialog-name-field" // required for Accessibility
          label="Name"
          name="name"
          // @ts-ignore
          onChange={this.onNameChange}
          value={currentNameValue}
          required
        />

        <TextField
          error={!!currentLabelErrorMessage}
          disabled={disableLabelInput}
          InputProps={labelFieldInputProps}
          fullWidth
          helperText={currentLabelErrorMessage}
          id="add-node-dialog-label-field" // required for Accessibility
          label="Label"
          name="label" // for accessibility only
          // @ts-ignore
          onChange={this.onLabelChange}
          required
          value={currentLabelValue}
          style={TextFieldMt}
        />
      </Grid>
    )
  }
}

/**
 * @type {React.CSSProperties}
 */
const bodyDialogAddNode = {
  padding: '0px',
}
/**
 * @type {React.CSSProperties}
 */
const TextFieldMt = {
  marginTop: '15px',
}

export default withStyles(styles)(AddNodeForm)
