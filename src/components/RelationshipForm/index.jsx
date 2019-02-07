// remember, it is possible to have properties with no user defined icon.
import React from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
/**
 * @typedef {import('@material-ui/core/TextField').TextFieldProps} TextFieldProps
 * @typedef {import('@material-ui/core').Theme} Theme
 */
/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRulesCallback<K>} StyleRulesCallback
 */

import ErrorOutline from '@material-ui/icons/ErrorOutline'
import HelpOutline from '@material-ui/icons/HelpOutline'

import { isAZ, isNumber, isSpace } from 'common/utils'
import IconTextDropDown from 'components/IconTextDropDown'

const NAME_FIELD_HELPER_TEXT = 'Only letters (a-z, A-Z) are allowed'
const ONLY_LETTERS_AND_SPACES_HELPER_TEXT =
  'Only letters (a-z, A-Z) and spaces are allowed'
const ONLY_NUMBERS_ALLOWED_HELPER_TEXT = 'Only numbers are allowed'

/**
 * @param {string} nodeName
 * @returns {import('../IconTextDropDown').Item}
 */
const nodeNameToDropDownItem = nodeName => {
  return {
    readableText: nodeName,
    value: nodeName,
  }
}

/**
 * @type {TextFieldProps['InputProps']}
 */
const nameFieldInputProps = {
  endAdornment: (
    <Tooltip title="Lorem Ipsum Dolor">
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
    <Tooltip title="The label is LOREM IPSUM DOLOR">
      <InputAdornment position="end">
        <ErrorOutline color="primary" />
      </InputAdornment>
    </Tooltip>
  ),
}

/**
 * @typedef {object} FormData
 * @prop {string|null} label `null` when no label is inputted.
 * @prop {string|null} maxNumRecords `null` when limitting records  is disabled,
 * or when the max number of records input is empty.
 * @prop {string|null} name `null` when no name is inputted.
 * @prop {string|null} nodeName Sourced from the 'availableNodeNames' prop, if
 * by any chance this array is empty, this will be `null`.
 */

/**
 * @typedef {object} Props
 * @prop {string[]} availableNodeNames
 * @prop {boolean=} disableFullwidth (Optional)
 * @prop {boolean=} hideMaxNumRecordsInput (Optional) If provided and set to
 * `true`, hides the max number of records form group, useful when editing
 * rather than adding a relationship.
 * @prop {boolean=} hideNameInput (Optional) If provided and  set to `true`,
 * hides the name form group, useful when editing rather than adding a
 * relationship.
 * @prop {boolean=} hideNodeNameInput (Optional) If provided and set to `true`,
 * hides the node name form group, useful when editing rather than adding a
 * relationship.
 * @prop {string=} initialLabelValue (Optional) If provided, this will be the
 * initial value for the label input. Works for using this form as an edit form.
 * You can use a key for this component to actually turn it into a controlled
 * component through this prop (controlled-with-key pattern).
 * @prop {string=} initialMaxNumRecordsValue (Optional) If provided, this will be
 * the initial value for the max number of records input. Useful for using this
 * form as an edit form. You can use a key for this component to actually turn
 * it into a controlled component through this prop (controlled-with-key
 * pattern).
 * @prop {string=} initialNameValue (Optional) If provided, this will be the
 * initial value for the name input. Works for using this form as an edit form.
 * You can use a key for this component to actually turn it into a controlled
 * component through this prop (controlled-with-key pattern).
 * @prop {((nextLabelValue: string) => void)=} onLabelChange (Optional) If
 * provided, gets called with the next value for the name input every time it
 * changes.
 * @prop {((nextNameValue: string) => void)=} onNameChange (Optional) If
 * provided, gets called with the next value for the name input every time it
 * changes.
 * @prop {((nextMaxNumRecordsValue: string) => void)=} onMaxNumRecordsChange
 * (Optional) If provided, gets called with the next value for the tooltip input
 * every time it changes.
 * @prop {((nextNode: string) => void)=} onNodeNameChange (Optional) If
 * provided, gets called with the next value for the node selection drop down.
 */

/**
 * @typedef {Object} State
 * @prop {string} currentMaxNumRecordsValue
 * @prop {string} currentNameValue
 * @prop {string} currentLabelValue
 * @prop {boolean} invalidLabelCharAttempt Will be set to true as soon as the
 * user tries to enter an illegal character into the label input. The helper
 * text will be shown from here on forward.
 * @prop {boolean} invalidMaxNumRecordsCharAttempt Will be set to true as soon
 * as the user tries to enter an illegal character into the max number of
 * records input. The helper text will be shown from here on forward.
 * @prop {boolean} invalidNameCharAttempt Will be set to true as soon as the
 * user tries to enter an illegal character into the name input. The helper
 * text will be shown from here on forward.
 * @prop {boolean} maxNumRecordsEnabled
 * @prop {string} selectedNodeName Selected node name. Empty string means no
 * node is selected.
 */

/**
 * @typedef {Object} IRelationshipForm
 * @prop {() => FormData} getFormData
 */

/**
 * @augments React.PureComponent<Props, State>
 */
export default class PropForm extends React.PureComponent {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props)

    /**
     * HACK: https://github.com/Microsoft/TypeScript/issues/17498#issuecomment-399439654
     * Ensure the class conforms to the interface.
     * @type {IRelationshipForm}
     */
    const instance = this
    instance // avoid unused local error

    const {
      availableNodeNames,
      initialLabelValue,
      initialNameValue,
      initialMaxNumRecordsValue,
    } = this.props

    if (availableNodeNames.length === 0) {
      console.warn(
        `<RelationshipForm expected the 'availableNodeNames' prop to be populated, instead a length of : ${
          availableNodeNames.length
        } was found.`,
      )
    }

    /**
     * @type {State}
     */
    this.state = {
      currentLabelValue: initialLabelValue || '',
      currentNameValue: initialNameValue || '',
      currentMaxNumRecordsValue: initialMaxNumRecordsValue || '',
      invalidLabelCharAttempt: false,
      invalidMaxNumRecordsCharAttempt: false,
      invalidNameCharAttempt: false,
      maxNumRecordsEnabled:
        typeof initialMaxNumRecordsValue === 'string' &&
        initialMaxNumRecordsValue !== '',
      selectedNodeName: availableNodeNames[0] || '',
    }
  }

  /**
   * @public
   * Get the form data when necessary. This prevents the need from having to
   * handle form data up-above. See the `FormData` interface defined in this
   * component's file for the format of the object returned.
   * @returns {FormData}
   */
  getFormData() {
    const { availableNodeNames } = this.props
    const {
      currentMaxNumRecordsValue,
      maxNumRecordsEnabled,
      selectedNodeName,
    } = this.state

    const maxNumRecordsData = (() => {
      if (!maxNumRecordsEnabled) return null
      if (currentMaxNumRecordsValue.length === 0) return null
      return currentMaxNumRecordsValue
    })()

    return {
      label: this.state.currentLabelValue || null,
      name: this.state.currentNameValue || null,
      maxNumRecords: maxNumRecordsData,
      nodeName: availableNodeNames.length === 0 ? null : selectedNodeName,
    }
  }

  /**
   * @private
   * @type {TextFieldProps['onChange']}
   */
  onLabelChange = ({ target: { value } }) => {
    const { onLabelChange } = this.props

    if (value.length === 0) {
      this.setState({ currentLabelValue: '' })
      onLabelChange && onLabelChange('')
    }

    const chars = value.split('')
    const legalChars = chars.every(char => isAZ(char) || isSpace(char))

    if (legalChars) {
      this.setState({ currentLabelValue: value })
      onLabelChange && onLabelChange(value)
    } else {
      this.setState({
        invalidLabelCharAttempt: true,
      })
    }
  }

  /**
   * @private
   * @type {TextFieldProps['onChange']}
   */
  onNameChange = ({ target: { value } }) => {
    const { onNameChange } = this.props

    if (value.length === 0) {
      this.setState({ currentNameValue: '' })
      onNameChange && onNameChange('')
    }

    const chars = value.split('')
    const legalChars = chars.every(isAZ) // no spaces

    if (legalChars) {
      this.setState({ currentNameValue: value })
      onNameChange && onNameChange(value)
    } else {
      this.setState({
        invalidNameCharAttempt: true,
      })
    }
  }

  /**
   * @private
   * @type {TextFieldProps['onChange']}
   */
  onMaxNumRecordsChange = ({ target: { value } }) => {
    const { onMaxNumRecordsChange } = this.props

    if (value.length === 0) {
      this.setState({ currentMaxNumRecordsValue: '' })
      onMaxNumRecordsChange && onMaxNumRecordsChange('')
    }

    const chars = value.split('')
    const legalChars = chars.every(isNumber)

    if (legalChars) {
      this.setState({ currentMaxNumRecordsValue: value })
      onMaxNumRecordsChange && onMaxNumRecordsChange(value)
    } else {
      this.setState({
        invalidMaxNumRecordsCharAttempt: true,
      })
    }
  }

  /**
   * @private
   * @type {import('@material-ui/core/Switch').SwitchProps['onChange']}
   */
  onMaxNumRecordsSwitchChange = ({ target: { checked } }) => {
    this.setState({
      maxNumRecordsEnabled: checked,
    })

    // reset max num records input if disabled via the switch
    !checked &&
      this.setState({
        currentMaxNumRecordsValue: '',
      })
  }

  /**
   * @private
   * @type {import('../IconTextDropDown').Props['onValueChange']}
   */
  onNodeNameChange = nextNodeName => {
    const { onNodeNameChange } = this.props

    this.setState({
      selectedNodeName: nextNodeName,
    })

    onNodeNameChange && onNodeNameChange(nextNodeName)
  }

  render() {
    const {
      availableNodeNames,
      disableFullwidth,
      hideNodeNameInput,
    } = this.props

    const {
      currentLabelValue,
      currentMaxNumRecordsValue,
      currentNameValue,
      invalidLabelCharAttempt,
      invalidMaxNumRecordsCharAttempt,
      invalidNameCharAttempt,
      maxNumRecordsEnabled,
      selectedNodeName,
    } = this.state

    const enableFullwidth = !disableFullwidth
    const showNodeNameSelect = !hideNodeNameInput

    return (
      <Grid
        alignContent="center"
        alignItems="center"
        container
        direction="column"
        justify="center"
      >
        <TextField
          InputProps={nameFieldInputProps}
          fullWidth={enableFullwidth}
          helperText={invalidNameCharAttempt && NAME_FIELD_HELPER_TEXT}
          id="relationship-form-name-field" // required for Accessibility
          label="Name"
          name="name"
          onChange={this.onNameChange}
          value={currentNameValue}
          required
        />

        <TextField
          InputProps={labelFieldInputProps}
          fullWidth={enableFullwidth}
          helperText={
            invalidLabelCharAttempt && ONLY_LETTERS_AND_SPACES_HELPER_TEXT
          }
          id="relationship-form-label-field" // required for Accessibility
          label="Label"
          name="label" // for accessibility only
          onChange={this.onLabelChange}
          required
          value={currentLabelValue}
        />

        <Grid>
          <FormControlLabel
            control={
              <Switch
                checked={maxNumRecordsEnabled}
                onChange={this.onMaxNumRecordsSwitchChange}
              />
            }
            label="Limit the amount of record for this node."
          />

          <IconButton>
            <HelpOutline />
          </IconButton>
        </Grid>

        {maxNumRecordsEnabled && (
          <TextField
            fullWidth={enableFullwidth}
            helperText={
              invalidMaxNumRecordsCharAttempt &&
              ONLY_NUMBERS_ALLOWED_HELPER_TEXT
            }
            id="add-prop-form-tooltip-field" // required for Accessibility
            label="Max number of records"
            name="max-number-of-records" // for accessibility only
            onChange={this.onMaxNumRecordsChange}
            required
            value={currentMaxNumRecordsValue}
          />
        )}
        {showNodeNameSelect && (
          <IconTextDropDown
            emptyValueText=""
            items={availableNodeNames.map(nodeNameToDropDownItem)}
            onValueChange={this.onNodeNameChange}
            selectedValue={selectedNodeName}
          />
        )}
      </Grid>
    )
  }
}
