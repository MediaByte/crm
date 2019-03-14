// remember, it is possible to have properties with no user defined icon.
import React from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
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
import HelpOutline from '@material-ui/icons/HelpOutline'

import { nameToIconMap } from 'common/NameToIcon'
import { typeToIconName, typeToReadableName } from 'common/PropTypeToMetadata'
import { isAZ, isSpace } from 'common/utils'

import IconTextDropDown from '../IconTextDropDown'

const NAME_FIELD_HELPER_TEXT = 'Only letters (a-z, A-Z) are allowed'
const ONLY_LETTERS_AND_SPACES_HELPER_TEXT =
  'Only letters (a-z, A-Z) and spaces are allowed'

/**
 * @param {string} propType
 * @returns {import('../IconTextDropDown').Item}
 */
const propTypeToDropDownItem = propType => {
  const icon =
    nameToIconMap[typeToIconName[propType]] &&
    nameToIconMap[typeToIconName[propType]].filled

  return {
    icon,
    readableText: typeToReadableName[propType],
    value: propType,
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
 * @prop {string|null} name `null` when no name is inputted.
 * @prop {string|null} tooltip `null` when tooltip is disabled, or when the
 * tooltip input field is empty.
 * @prop {string|null} type This type is obtained from the 'availableTypes'
 * prop, if by any chance this array is empty, this will be `null`.
 */

/**
 * @typedef {object} Props
 * @prop {string[]} availableTypes
 * @prop {boolean=} hideTypeSelection (Optional) If provided, hides the prop
 * type selection dropdown, useful when editing rather than adding a property.
 * @prop {string=} initialLabelValue (Optional) If provided, this will be the
 * initial value for the label input. Works for using this form as an edit form.
 * You can use a key for this component to actually turn it into a controlled
 * component through this prop (controlled-with-key pattern).
 * @prop {string=} initialNameValue (Optional) If provided, this will be the
 * initial value for the name input. Works for using this form as an edit form.
 * You can use a key for this component to actually turn it into a controlled
 * component through this prop (controlled-with-key pattern).
 * @prop {string=} initialTooltipValue (Optional) If provided, this will be the
 * initial value for the tooltip input. Works for using this form as an edit
 * form. You can use a key for this component to actually turn it into a
 * controlled component through this prop (controlled-with-key pattern).
 * @prop {(() => void)=} onClickSelectIcon (Optional)
 * @prop {((nextLabelValue: string) => void)=} onLabelChange (Optional) If
 * provided, gets called with the next value for the name input every time it
 * changes.
 * @prop {((nextNameValue: string) => void)=} onNameChange (Optional) If
 * provided, gets called with the next value for the name input every time it
 * changes.
 * @prop {((nextTooltipValue: string) => void)=} onTooltipChange (Optional) If
 * provided, gets called with the next value for the tooltip input every time it
 * changes.
 * @prop {((nextType: string) => void)=} onTypeChange (Optional) If provided,
 * gets called with the next value for the prop type selection drop down.
 * @prop {(React.ComponentType<SvgIconProps>)|undefined|null|false=} selectedIcon
 * (Optional) If provided, it will be rendered to indicate the user this icon is
 * the one selected for this node-property.
 */

/**
 * @typedef {Object} State
 * @prop {string} currentNameValue
 * @prop {string} currentLabelValue
 * @prop {string} currentTooltipValue
 * @prop {boolean} invalidLabelCharAttempt Will be set to true as soon as the
 * user tries to enter an illegal character into the label input. The helper
 * text will be shown from here on forward.
 * @prop {boolean} invalidNameCharAttempt Will be set to true as soon as the
 * user tries to enter an illegal character into the name input. The helper text
 * will be shown from here on forward.
 * @prop {boolean} invalidTooltipCharAttempt Will be set to true as soon as the
 * user tries to enter an illegal character into the tooltip input. The helper
 * text will be shown from here on forward.
 * @prop {string} selectedType Selected prop type. Empty string means no
 * type is selected.
 * @prop {boolean} tooltipEnabled
 */

/**
 * @typedef {Object} AddPropFormInterface
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
     * @type {AddPropFormInterface}
     */
    const instance = this
    instance // avoid unused local error

    const {
      availableTypes,
      initialLabelValue,
      initialNameValue,
      initialTooltipValue,
    } = this.props

    if (availableTypes.length === 0) {
      console.warn(
        `<AddPropForm expected the 'availableTypes' prop to be populated, instead of a length of : ${
          this.props.availableTypes.length
        }`,
      )
    }

    /**
     * @type {State}
     */
    this.state = {
      currentLabelValue: initialLabelValue || '',
      currentNameValue: initialNameValue || '',
      currentTooltipValue: initialTooltipValue || '',
      invalidLabelCharAttempt: false,
      invalidNameCharAttempt: false,
      invalidTooltipCharAttempt: false,
      selectedType: availableTypes[0] || '',
      tooltipEnabled:
        typeof initialTooltipValue === 'string' && initialTooltipValue !== '',
    }
  }

  /**
   * @public
   * Get the form data when necessary. This prevents the need from having to
   * handle form data up-above.Returns an object looking like this:
   ```
   {
    // null when no label is inputted.
    label: string|null
    // null when no name is inputted.
    name: string|null
    // null when tooltip is disabled, or when the tooltip input field is empty
    tooltip: string|null
    // this type is obtained from the 'availableTypes' prop, if by any chance
    // this array is empty, this will be null.
    type: string|null
   }
   ```
   * @returns {FormData}
   */
  getFormData() {
    const { currentTooltipValue, tooltipEnabled } = this.state

    const tooltipValue = (() => {
      if (!tooltipEnabled) return null
      if (currentTooltipValue.length === 0) return null
      return currentTooltipValue
    })()

    return {
      label: this.state.currentLabelValue || null,
      name: this.state.currentNameValue || null,
      tooltip: tooltipValue,
      type:
        this.props.availableTypes.length === 0 ? null : this.state.selectedType,
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
  onTooltipChange = ({ target: { value } }) => {
    const { onTooltipChange } = this.props

    if (value.length === 0) {
      this.setState({ currentTooltipValue: '' })
      onTooltipChange && onTooltipChange('')
    }

    const chars = value.split('')
    const legalChars = chars.every(char => isAZ(char) || isSpace(char))

    if (legalChars) {
      this.setState({ currentTooltipValue: value })
      onTooltipChange && onTooltipChange(value)
    } else {
      this.setState({
        invalidTooltipCharAttempt: true,
      })
    }
  }

  /**
   * @private
   * @type {import('@material-ui/core/Switch').SwitchProps['onChange']}
   */
  onTooltipSwitchChange = ({ target: { checked } }) => {
    this.setState({
      tooltipEnabled: checked,
    })

    // reset tooltip input if disabled via the switch
    !checked &&
      this.setState({
        currentTooltipValue: '',
      })
  }

  /**
   * @private
   * @type {import('../IconTextDropDown').Props['onValueChange']}
   */
  onTypeChange = nextType => {
    const { onTypeChange } = this.props

    this.setState({
      selectedType: nextType,
    })

    onTypeChange && onTypeChange(nextType)
  }

  render() {
    const {
      availableTypes,
      hideTypeSelection,
      onClickSelectIcon,
      selectedIcon: SelectedIcon,
    } = this.props
    const {
      currentLabelValue,
      currentNameValue,
      currentTooltipValue,
      invalidLabelCharAttempt,
      invalidNameCharAttempt,
      invalidTooltipCharAttempt,
      selectedType,
      tooltipEnabled,
    } = this.state

    const showTypeSelection = !hideTypeSelection

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
          InputProps={nameFieldInputProps}
          fullWidth
          helperText={invalidNameCharAttempt && NAME_FIELD_HELPER_TEXT}
          id="add-prop-form-name-field" // required for Accessibility
          label="Name"
          name="name"
          onChange={this.onNameChange}
          value={currentNameValue}
          required
        />

        <TextField
          InputProps={labelFieldInputProps}
          fullWidth
          helperText={
            invalidLabelCharAttempt && ONLY_LETTERS_AND_SPACES_HELPER_TEXT
          }
          id="add-prop-form-label-field" // required for Accessibility
          label="Label"
          name="label" // for accessibility only
          onChange={this.onLabelChange}
          required
          value={currentLabelValue}
          style={TextFieldMt}
        />

        {/* <Grid>
          <FormControlLabel
            control={
              <Switch
                checked={tooltipEnabled}
                onChange={this.onTooltipSwitchChange}
              />
            }
            label="Enable tooltip for this property."
          />

          <IconButton>
            <HelpOutline />
          </IconButton>
        </Grid> */}

        {/* {tooltipEnabled && (
          <TextField
            fullWidth
            helperText={
              invalidTooltipCharAttempt && ONLY_LETTERS_AND_SPACES_HELPER_TEXT
            }
            id="add-prop-form-tooltip-field" // required for Accessibility
            label="Tooltip"
            name="tooltip" // for accessibility only
            onChange={this.onTooltipChange}
            required
            value={currentTooltipValue}
          />
        )} */}

        {/* <Grid>
          {SelectedIcon ? (
            <div onClick={onClickSelectIcon} style={iconSelectionStyle}>
              <SelectedIcon style={iconStyle} />
            </div>
          ) : (
            <div onClick={onClickSelectIcon} style={noIconSelectedStyle}>
              <Typography align="center" color="primary" variant="subtitle2">
                Click/tap here to select an icon for this property
              </Typography>
            </div>
          )}

          {showTypeSelection && (
            <IconTextDropDown
              emptyValueText=""
              items={availableTypes.map(propTypeToDropDownItem)}
              onValueChange={this.onTypeChange}
              selectedValue={selectedType}
            />
          )}
        </Grid> */}
      </Grid>
    )
  }
}

const ICON_AREA_DIMENSIONS = 96

/**
 * @type {React.CSSProperties}
 */
const iconSelectionStyle = {
  alignContent: 'center',
  alignItems: 'center',
  display: 'flex',
  borderColor: '#CCC',
  borderRadius: 25,
  borderStyle: 'solid',
  borderWidth: 4,
  cursor: 'pointer',
  justifyContent: 'center',
  width: ICON_AREA_DIMENSIONS,
  height: ICON_AREA_DIMENSIONS,
}
const bodyDialogAddNode = {
  padding: '25px',
}
const TextFieldMt = {
  marginTop: '15px',
}

/**
 * @type {React.CSSProperties}
 */
const noIconSelectedStyle = {
  ...iconSelectionStyle,
  borderStyle: 'dashed',
}

/**
 * @type {React.CSSProperties}
 */
const iconStyle = {
  width: ICON_AREA_DIMENSIONS,
  height: ICON_AREA_DIMENSIONS,
}
