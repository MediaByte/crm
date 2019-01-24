import React from 'react'

import Component from '../../components/AddNodeDialog'
import SelectIconDialog from '../../components/SelectIconDialog'
import { nameToIconMap } from '../../common/NameToIcon'
/**
 * @typedef {import('../../components/AddNodeDialog').Props} ComponentProps
 * @typedef {import('../../components/SelectIconDialog').IconStyle} IconStyle
 * @typedef {import('../../components/SelectIconDialog').Props} SelectIconDialogProps
 */

/**
 * @typedef {(selectedIconIndex: number, identifier: string, label: string, name: string) => void} HandleSave
 */

/**
 * @typedef {object} Props
 * @prop {string[]} availableIconNames Will be looked up in a name-component map
 * for rendering.
 * @prop {() => void} handleClose
 * @prop {HandleSave} handleSave
 * @prop {(nextIdentifierValue: string) => boolean} isValidIdentifierValue
 * Should return whether a new value for the identifier field is valid, if not,
 * the field gets set to an error state.
 * @prop {(nextLabelValue: string) => boolean} isValidLabelValue Should return
 * whether a new value for the label field is valid, if not, the field gets set
 * to an error state.
 * @prop {(nextNameValue: string) => boolean} isValidNameValue Should return
 * whether a new value for the name field is valid, if not, the field gets set
 * to an error state.
 * @prop {ComponentProps['open']} open
 */

/**
 * @typedef {object} State
 * @prop {IconStyle} currentIconStyle Passed to the select icon dialog.
 * @prop {boolean} displayingSelectIcon
 * @prop {boolean} identifierFieldError
 * @prop {string} identifierFieldValue
 * @prop {boolean} labelFieldError
 * @prop {string} labelFieldValue
 * @prop {boolean} nameFieldError
 * @prop {string} nameFieldValue
 * @prop {number} selectedIconIndex Index of the selected icon inside the icon
 * names array prop.
 */

export {} // stop jsdoc comments from merging

/**
 * @augments React.PureComponent<Props, State>
 */
export default class AddNodeDialog extends React.PureComponent {
  /**
   * @type {State}
   */
  state = {
    currentIconStyle: 'filled',
    displayingSelectIcon: false,
    identifierFieldError: false,
    identifierFieldValue: '',
    labelFieldError: false,
    labelFieldValue: '',
    nameFieldError: false,
    nameFieldValue: '',
    selectedIconIndex: 0,
  }

  /**
   * @private
   */
  handleSave = () => {
    const { handleSave } = this.props
    const { selectedIconIndex } = this.state

    const {
      identifierFieldError,
      identifierFieldValue,
      labelFieldError,
      labelFieldValue,
      nameFieldError,
      nameFieldValue,
    } = this.state

    if (identifierFieldError || labelFieldError || nameFieldError) {
      return
    }

    if (!identifierFieldValue || !labelFieldValue || !nameFieldValue) {
      return
    }

    handleSave(
      selectedIconIndex,
      identifierFieldValue,
      labelFieldValue,
      nameFieldValue,
    )
  }

  /**
   * @private
   */
  handleSelectIconDialogClose = () => {
    this.setState({
      displayingSelectIcon: false,
    })
  }

  /**
   * @private
   * @type {SelectIconDialogProps['onTabChange']}
   */
  onChangeIconStyle = nextIconStyle => {
    this.setState({
      currentIconStyle: nextIconStyle,
    })
  }

  /**
   * @private
   * @type {ComponentProps['onChangeIdentifierField']}
   */
  onChangeIdentifierField = nextIdentifierValue => {
    const { isValidIdentifierValue } = this.props

    this.setState({
      identifierFieldError: !isValidIdentifierValue(nextIdentifierValue),
      identifierFieldValue: nextIdentifierValue,
    })
  }

  /**
   * @private
   * @type {ComponentProps['onChangeLabelField']}
   */
  onChangeLabelField = nextLabelValue => {
    const { isValidLabelValue } = this.props
    this.setState({
      labelFieldError: !isValidLabelValue(nextLabelValue),
      labelFieldValue: nextLabelValue,
    })
  }

  /**
   * @private
   * @type {ComponentProps['onChangeNameField']}
   */
  onChangeNameField = nextNameValue => {
    const { isValidNameValue } = this.props

    this.setState({
      nameFieldError: !isValidNameValue(nextNameValue),
      nameFieldValue: nextNameValue,
    })
  }

  /**
   * @private
   * @type {SelectIconDialogProps['onClickIcon']}
   */
  onClickIcon = i => {
    this.setState({
      selectedIconIndex: i,
    })
  }

  /**
   * @private
   * @type {ComponentProps['onClickSelectedIcon']}
   */
  onClickSelectedIcon = () => {
    this.setState({
      displayingSelectIcon: true,
    })
  }

  render() {
    const { availableIconNames, handleClose, open } = this.props
    const {
      currentIconStyle,
      displayingSelectIcon,
      identifierFieldError,
      identifierFieldValue,
      labelFieldError,
      labelFieldValue,
      nameFieldError,
      nameFieldValue,
      selectedIconIndex,
    } = this.state

    const selectedIconName = availableIconNames[selectedIconIndex]
    const SelectedIcon = nameToIconMap[selectedIconName].filled

    if (typeof SelectedIcon === 'undefined') {
      console.warn('Unexistant icon name looked up on name to icon map')
    }

    if (displayingSelectIcon) {
      return (
        <SelectIconDialog
          currentIconStyle={currentIconStyle}
          handleClose={this.handleSelectIconDialogClose}
          onClickIcon={this.onClickIcon}
          open={displayingSelectIcon}
          onTabChange={this.onChangeIconStyle}
          selectedIconIndex={selectedIconIndex}
        >
          {availableIconNames.map((name, key) => {
            const Icon = nameToIconMap[name][currentIconStyle]

            return <Icon key={key} />
          })}
        </SelectIconDialog>
      )
    }

    return (
      <Component
        handleClose={handleClose}
        handleSave={this.handleSave}
        identifierFieldError={identifierFieldError}
        identifierFieldValue={identifierFieldValue}
        labelFieldError={labelFieldError}
        labelFieldValue={labelFieldValue}
        nameFieldError={nameFieldError}
        nameFieldValue={nameFieldValue}
        onChangeIdentifierField={this.onChangeIdentifierField}
        onChangeLabelField={this.onChangeLabelField}
        onChangeNameField={this.onChangeNameField}
        onClickSelectedIcon={this.onClickSelectedIcon}
        open={open}
        selectedIcon={SelectedIcon}
      />
    )
  }
}
