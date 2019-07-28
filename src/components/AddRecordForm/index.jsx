// remember, it is possible to have properties with no user defined icon.
import React from 'react'

import { Grid, InputAdornment, TextField, Tooltip } from '@material-ui/core'
import ErrorOutline from '@material-ui/icons/ErrorOutline'

const nameFieldInputProps = {
  endAdornment: (
    <Tooltip title="Lorem Ipsum Dolor">
      <InputAdornment position="end">
        <ErrorOutline color="primary" />
      </InputAdornment>
    </Tooltip>
  ),
}

const labelFieldInputProps = {
  endAdornment: (
    <Tooltip title="The label is LOREM IPSUM DOLOR">
      <InputAdornment position="end">
        <ErrorOutline color="primary" />
      </InputAdornment>
    </Tooltip>
  ),
}

/**
 * @typedef {object} Props
 * @prop {string[]} availableTypes
 * @prop {boolean=} disableLabelInput (Optional)
 * @prop {boolean=} disableNameInput (Optional)
 * @prop {boolean=} disableTypeSelection (Optional)
 * @prop {boolean=} hideTypeSelection (Optional) If provided, hides the prop
 * type selection dropdown, useful when editing rather than adding a property.
 * @prop {(string|undefined|null)=} labelErrorMessage (Optional)
 * @prop {string=} labelValue (Optional) If provided, this will be the
 * initial value for the label input. Works for using this form as an edit form.
 * You can use a key for this component to actually turn it into a controlled
 * component through this prop (controlled-with-key pattern).
 * @prop {(string|undefined|null)=} nameErrorMessage (Optional)
 * @prop {string=} nameValue (Optional) If provided, this will be the
 * initial value for the name input. Works for using this form as an edit form.
 * You can use a key for this component to actually turn it into a controlled
 * component through this prop (controlled-with-key pattern).
 * @prop {string=} typeValue (Optional)
 * @prop {((nextLabelValue: string) => void)=} onLabelChange (Optional) If
 * provided, gets called with the next value for the name input every time it
 * changes.
 * @prop {((nextNameValue: string) => void)=} onNameChange (Optional) If
 * provided, gets called with the next value for the name input every time it
 * changes.
 * @prop {((nextType: string) => void)=} onTypeChange (Optional) If provided,
 * gets called with the next value for the prop type selection drop down.
 */

/**
 * @augments React.PureComponent<Props>
 */
export default class AddRecordForm extends React.PureComponent {
  /**
   * @private
   * @type {import('@material-ui/core/TextField').TextFieldProps['onChange']}
   */
  onLabelChange = e => {
    const { onLabelChange } = this.props

    // @ts-ignore
    onLabelChange && onLabelChange(e.target.value)
  }

  /**
   * @private
   * @type {import('@material-ui/core/TextField').TextFieldProps['onChange']}
   */
  onNameChange = e => {
    const { onNameChange } = this.props

    // @ts-ignore
    onNameChange && onNameChange(e.target.value)
  }

  /**
   * @private
   * @type {import('@material-ui/core/Select').SelectProps['onChange']}
   */
  onTypeChange = e => {
    const { onTypeChange } = this.props

    // @ts-ignore
    onTypeChange && onTypeChange(e.target.value)
  }

  render() {
    const {
      disableLabelInput,
      disableNameInput,
      labelValue,
      labelErrorMessage,
      nameErrorMessage,
      nameValue,
    } = this.props

    return (
      <Grid
        alignContent="center"
        alignItems="center"
        container
        direction="column"
        justify="center"
      >
        <TextField
          error={!!nameErrorMessage}
          disabled={disableNameInput}
          InputProps={nameFieldInputProps}
          fullWidth
          margin="dense"
          helperText={nameErrorMessage}
          id="add-prop-form-name-field" // required for Accessibility
          label="Name"
          name="name"
          onChange={this.onNameChange}
          value={nameValue}
          required
        />

        <TextField
          error={!!labelErrorMessage}
          disabled={disableLabelInput}
          InputProps={labelFieldInputProps}
          fullWidth
          margin="dense"
          helperText={labelErrorMessage}
          id="add-prop-form-label-field" // required for Accessibility
          label="Label"
          name="label" // for accessibility only
          onChange={this.onLabelChange}
          required
          value={labelValue}
        />
      </Grid>
    )
  }
}
