import React from 'react'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

import DrawerButton from 'components/DrawerButton'

import OptionsEditor from 'components/OptionsEditor'

/**
 * @typedef {object} Option
 * @prop {number} order
 * @prop {string} value
 * @prop {string} id
 */

/**
 * @typedef {object} Props
 *
 * @prop {Record<Classes, string>} classes
 *
 * @prop {boolean} avatarEnabled
 * @prop {() => void} toggleAvatar
 *
 * @prop {boolean} prefixSelectorEnabled
 * @prop {() => void} togglePrefixSelector
 *
 * @prop {(newOptions: Option[]) => void} updatePrefixOptions
 * @prop {Option[]} currentPrefixOptions
 * @prop {string} defaultPrefixOptionID
 *
 * @prop {string} currentPrefixLabel
 * @prop {(newPrefixLabel: string) => void} updatePrefixLabel
 *
 * @prop {string} currentMainTextFieldLabel
 * @prop {(newMainTextFieldLabel: string) => void} updateMainTextFieldLabel
 *
 * @prop {number} currentMainTextFieldCharLimit
 * @prop {(newMainTextFieldCharLimit: number) => void} updateMainTextFieldCharLimit
 *
 * @prop {boolean} middleTextFieldEnabled
 * @prop {() => void} toggleMiddleTextField
 *
 * @prop {string} currentMiddleTextFieldLabel
 * @prop {(newMainTextFieldLabel: string) => void} updateMiddleTextFieldLabel
 *
 * @prop {number} currentMiddleTextFieldCharLimit
 * @prop {(newMainTextFieldCharLimit: number) => void} updateMiddleTextFieldCharLimit
 *
 * @prop {boolean} lastTextFieldEnabled
 * @prop {() => void} toggleLastTextField
 *
 * @prop {string} currentLastTextFieldLabel
 * @prop {(newMainTextFieldLabel: string) => void} updateLastTextFieldLabel
 *
 * @prop {number} currentLastTextFieldCharLimit
 * @prop {(newMainTextFieldCharLimit: number) => void} updateLastTextFieldCharLimit
 *
 * @prop {boolean} suffixSelectorEnabled
 * @prop {() => void} toggleSuffixSelector
 *
 * @prop {(newOptions: Option[]) => void} updateSuffixOptions
 * @prop {Option[]} currentSuffixOptions
 * @prop {string} defaultSuffixOptionID
 *
 * @prop {string} currentSuffixLabel
 * @prop {(newPrefixLabel: string) => void} updateSuffixLabel
 *
 * @prop {() => void} onStartEditingPrefixOptions
 * @prop {() => void} onStartEditingSuffixOptions
 */

/**
 * @typedef {object} State
 * @prop {null|string} newPrefixLabel
 * @prop {null|Option[]} newPrefixOptions
 * @prop {null|string} newMainTextFieldLabel
 * @prop {null|string} newMainTextFieldCharLimit
 * @prop {null|string} newMiddleTextFieldLabel
 * @prop {null|string} newMiddleTextFieldCharLimit
 * @prop {null|string} newLastTextFieldLabel
 * @prop {null|string} newLastTextFieldCharLimit
 * @prop {null|string} newSuffixLabel
 * @prop {null|Option[]} newSuffixOptions
 */

/**
 * @type {State}
 */
const INITIAL_STATE = {
  newPrefixLabel: null,
  newPrefixOptions: null,
  newMainTextFieldLabel: null,
  newMainTextFieldCharLimit: null,
  newMiddleTextFieldLabel: null,
  newMiddleTextFieldCharLimit: null,
  newLastTextFieldLabel: null,
  newLastTextFieldCharLimit: null,
  newSuffixLabel: null,
  newSuffixOptions: null,
}

/**
 * @augments React.PureComponent<Props, State>
 */
class NamePropDefEditor extends React.PureComponent {
  state = INITIAL_STATE

  /** @private */
  onClickPrefixOptions = () => {
    this.props.onStartEditingPrefixOptions()
    this.setState({
      newPrefixOptions: this.props.currentPrefixOptions,
    })
  }

  /** @private */
  onClickSuffixOptions = () => {
    this.props.onStartEditingSuffixOptions()
    this.setState({
      newSuffixOptions: this.props.currentSuffixOptions,
    })
  }

  /** @private */
  onClickPrefixLabel = () => {
    this.setState({
      newPrefixLabel: this.props.currentPrefixLabel,
    })
  }

  /** @private */
  onClickMainTextFieldLabel = () => {
    this.setState({
      newMainTextFieldLabel: this.props.currentMainTextFieldLabel,
    })
  }

  /** @private */
  onClickMainTextFieldCharLimit = () => {
    this.setState({
      newMainTextFieldCharLimit: this.props.currentMainTextFieldCharLimit.toString(),
    })
  }

  /** @private */
  onClickMiddleTextFieldLabel = () => {
    this.setState({
      newMiddleTextFieldLabel: this.props.currentMiddleTextFieldLabel,
    })
  }

  /** @private */
  onClickMiddleTextFieldCharLimit = () => {
    this.setState({
      newMiddleTextFieldCharLimit: this.props.currentMiddleTextFieldCharLimit.toString(),
    })
  }

  /** @private */
  onClickLastTextFieldLabel = () => {
    this.setState({
      newLastTextFieldLabel: this.props.currentLastTextFieldLabel,
    })
  }

  /** @private */
  onClickLastTextFieldCharLimit = () => {
    this.setState({
      newLastTextFieldCharLimit: this.props.currentLastTextFieldCharLimit.toString(),
    })
  }

  /** @private */
  onClickSuffixLabel = () => {
    this.setState({
      newSuffixLabel: this.props.currentSuffixLabel,
    })
  }

  /**
   * @private
   * @param {{ target: { name: string , value: string } }}
   **/
  onChangeTextField = ({ target: { name, value } }) => {
    // @ts-ignore
    this.setState({
      [name]: value,
    })
  }

  /** @public */
  stopEditing = () => {
    const {
      newLastTextFieldCharLimit,
      newLastTextFieldLabel,
      newMainTextFieldCharLimit,
      newMainTextFieldLabel,
      newMiddleTextFieldCharLimit,
      newMiddleTextFieldLabel,
      newPrefixLabel,
      newSuffixLabel,
    } = this.state

    const {
      currentPrefixLabel,
      currentMainTextFieldLabel,
      currentMainTextFieldCharLimit,
      currentMiddleTextFieldLabel,
      currentMiddleTextFieldCharLimit,
      currentLastTextFieldLabel,
      currentLastTextFieldCharLimit,
      currentSuffixLabel,
    } = this.props

    const {
      updateLastTextFieldCharLimit,
      updateLastTextFieldLabel,
      updateMainTextFieldLabel,
      updateMainTextFieldCharLimit,
      updateMiddleTextFieldLabel,
      updateMiddleTextFieldCharLimit,
      updatePrefixLabel,
      updateSuffixLabel,
    } = this.props

    if (
      newLastTextFieldCharLimit !== null &&
      newLastTextFieldCharLimit.length > 0 &&
      newLastTextFieldCharLimit !== currentLastTextFieldCharLimit.toString()
    ) {
      updateLastTextFieldCharLimit(Number(newLastTextFieldCharLimit))
      this.setState({
        newLastTextFieldCharLimit: null,
      })
    }

    if (
      newLastTextFieldLabel !== null &&
      newLastTextFieldLabel.length > 0 &&
      newLastTextFieldLabel !== currentLastTextFieldLabel
    ) {
      updateLastTextFieldLabel(newLastTextFieldLabel)
      this.setState({
        newLastTextFieldLabel: null,
      })
    }

    if (
      newMainTextFieldLabel !== null &&
      newMainTextFieldLabel.length > 0 &&
      newMainTextFieldLabel !== currentMainTextFieldLabel
    ) {
      updateMainTextFieldLabel(newMainTextFieldLabel)
      this.setState({
        newMainTextFieldLabel: null,
      })
    }

    if (
      newMainTextFieldCharLimit !== null &&
      newMainTextFieldCharLimit.length > 0 &&
      newMainTextFieldCharLimit !== currentMainTextFieldCharLimit.toString()
    ) {
      updateMainTextFieldCharLimit(Number(newMainTextFieldCharLimit))
      this.setState({
        newMainTextFieldCharLimit: null,
      })
    }

    if (
      newMiddleTextFieldLabel !== null &&
      newMiddleTextFieldLabel.length > 0 &&
      newMiddleTextFieldLabel !== currentMiddleTextFieldLabel
    ) {
      updateMiddleTextFieldLabel(newMiddleTextFieldLabel)
      this.setState({
        newMiddleTextFieldLabel: null,
      })
    }

    if (
      newMiddleTextFieldCharLimit !== null &&
      newMiddleTextFieldCharLimit.length > 0 &&
      newMiddleTextFieldCharLimit !== currentMiddleTextFieldCharLimit.toString()
    ) {
      updateMiddleTextFieldCharLimit(Number(newMiddleTextFieldCharLimit))
      this.setState({
        newMiddleTextFieldCharLimit: null,
      })
    }

    if (
      newPrefixLabel !== null &&
      newPrefixLabel.length > 0 &&
      newPrefixLabel !== currentPrefixLabel
    ) {
      updatePrefixLabel(currentPrefixLabel)
      this.setState({
        newPrefixLabel: null,
      })
    }

    if (
      newSuffixLabel !== null &&
      newSuffixLabel.length > 0 &&
      newSuffixLabel !== currentSuffixLabel
    ) {
      updateSuffixLabel(currentSuffixLabel)
      this.setState({
        newSuffixLabel: null,
      })
    }

    this.setState(INITIAL_STATE)
  }

  render() {
    const {
      avatarEnabled,
      toggleAvatar,
      prefixSelectorEnabled,
      togglePrefixSelector,
      currentPrefixLabel,
      currentPrefixOptions,
      currentMainTextFieldLabel,
      currentMainTextFieldCharLimit,
      middleTextFieldEnabled,
      toggleMiddleTextField,
      currentMiddleTextFieldLabel,
      currentMiddleTextFieldCharLimit,
      lastTextFieldEnabled,
      toggleLastTextField,
      currentLastTextFieldLabel,
      currentLastTextFieldCharLimit,
      suffixSelectorEnabled,
      toggleSuffixSelector,
      currentSuffixOptions,
      currentSuffixLabel,
      defaultPrefixOptionID,
      defaultSuffixOptionID,
    } = this.props

    const {
      newLastTextFieldCharLimit,
      newLastTextFieldLabel,
      newMainTextFieldCharLimit,
      newMainTextFieldLabel,
      newMiddleTextFieldCharLimit,
      newMiddleTextFieldLabel,
      newPrefixLabel,
      newSuffixLabel,
      newPrefixOptions,
      newSuffixOptions,
    } = this.state

    if (newPrefixOptions) {
      return (
        <OptionsEditor
          defaultOptionID={defaultPrefixOptionID}
          enableDefaultSelection
          enableRemoving
          enableReordering
          options={newPrefixOptions
            .slice()
            .sort((a, b) => a.order - b.order)
            .map(({ id, value }) => [id, value])}
        />
      )
    }

    if (newSuffixOptions) {
      return (
        <OptionsEditor
          defaultOptionID={defaultSuffixOptionID}
          enableDefaultSelection
          options={newSuffixOptions
            .slice()
            .sort((a, b) => a.order - b.order)
            .map(({ id, value }) => [id, value])}
        />
      )
    }

    if (newLastTextFieldCharLimit !== null) {
      return (
        <Grid className={this.props.classes.textField} item>
          <TextField
            autoFocus
            fullWidth
            name="newLastTextFieldCharLimit"
            onChange={this.onChangeTextField}
            type="number"
            value={newLastTextFieldCharLimit}
            variant="outlined"
          />
        </Grid>
      )
    }

    if (newLastTextFieldLabel !== null) {
      return (
        <Grid className={this.props.classes.textField} item>
          <TextField
            autoFocus
            fullWidth
            name="newLastTextFieldLabel"
            onChange={this.onChangeTextField}
            type="search"
            value={newLastTextFieldLabel}
            variant="outlined"
          />
        </Grid>
      )
    }

    if (newMainTextFieldCharLimit !== null) {
      return (
        <Grid className={this.props.classes.textField} item>
          <TextField
            autoFocus
            fullWidth
            name="newMainTextFieldCharLimit"
            onChange={this.onChangeTextField}
            type="number"
            value={newMainTextFieldCharLimit}
            variant="outlined"
          />
        </Grid>
      )
    }

    if (newMainTextFieldLabel !== null) {
      return (
        <Grid className={this.props.classes.textField} item>
          <TextField
            autoFocus
            fullWidth
            name="newMainTextFieldLabel"
            onChange={this.onChangeTextField}
            type="search"
            value={newMainTextFieldLabel}
            variant="outlined"
          />
        </Grid>
      )
    }

    if (newMiddleTextFieldCharLimit !== null) {
      return (
        <Grid className={this.props.classes.textField} item>
          <TextField
            autoFocus
            fullWidth
            name="newMiddleTextFieldCharLimit"
            onChange={this.onChangeTextField}
            type="number"
            value={newMiddleTextFieldCharLimit}
            variant="outlined"
          />
        </Grid>
      )
    }

    if (newMiddleTextFieldLabel !== null) {
      return (
        <Grid className={this.props.classes.textField} item>
          <TextField
            autoFocus
            fullWidth
            name="newMiddleTextFieldLabel"
            onChange={this.onChangeTextField}
            type="search"
            value={newMiddleTextFieldLabel}
            variant="outlined"
          />
        </Grid>
      )
    }

    if (newPrefixLabel !== null) {
      return (
        <Grid className={this.props.classes.textField} item>
          <TextField
            autoFocus
            fullWidth
            name="newPrefixLabel"
            onChange={this.onChangeTextField}
            type="search"
            value={newPrefixLabel}
            variant="outlined"
          />
        </Grid>
      )
    }

    if (newSuffixLabel !== null) {
      return (
        <Grid className={this.props.classes.textField} item>
          <TextField
            autoFocus
            fullWidth
            name="newSuffixLabel"
            onChange={this.onChangeTextField}
            type="search"
            value={newSuffixLabel}
            variant="outlined"
          />
        </Grid>
      )
    }

    return (
      <Grid container direction="column" spacing={24}>
        <Grid item>
          <DrawerButton
            isSwitch
            onClick={toggleAvatar}
            primaryText="Avatar"
            switchOn={avatarEnabled}
          />
        </Grid>

        <Grid item>
          <DrawerButton
            isSwitch
            onClick={togglePrefixSelector}
            primaryText="Display"
            switchOn={prefixSelectorEnabled}
          />
          <DrawerButton
            onClick={this.onClickPrefixOptions}
            primaryText="Options"
            secondaryText={currentPrefixOptions
              .slice()
              .sort((a, b) => a.order - b.order)
              .map(o => o.value)
              .join(', ')}
            secTextAtBottom
          />
          <DrawerButton
            onClick={this.onClickPrefixLabel}
            primaryText="Label"
            secondaryText={currentPrefixLabel}
          />
        </Grid>

        <Grid item>
          <DrawerButton
            onClick={this.onClickMainTextFieldLabel}
            primaryText="Label"
            secondaryText={currentMainTextFieldLabel}
          />
          <DrawerButton
            primaryText="Character Limit"
            onClick={this.onClickMainTextFieldCharLimit}
            secondaryText={currentMainTextFieldCharLimit.toString()}
          />
        </Grid>

        <Grid item>
          <DrawerButton
            onClick={this.onClickMainTextFieldLabel}
            primaryText="Label"
            secondaryText={currentMainTextFieldLabel}
          />
          <DrawerButton
            onClick={this.onClickMainTextFieldCharLimit}
            primaryText="Character Limit"
            secondaryText={currentMainTextFieldCharLimit.toString()}
          />
        </Grid>

        <Grid item>
          <DrawerButton
            isSwitch
            onClick={toggleMiddleTextField}
            primaryText="Display"
            switchOn={middleTextFieldEnabled}
          />
          <DrawerButton
            onClick={this.onClickMiddleTextFieldLabel}
            primaryText="Label"
            secondaryText={currentMiddleTextFieldLabel}
          />
          <DrawerButton
            onClick={this.onClickMiddleTextFieldCharLimit}
            primaryText="Character Limit"
            secondaryText={currentMiddleTextFieldCharLimit.toString()}
          />
        </Grid>

        <Grid item>
          <DrawerButton
            isSwitch
            onClick={toggleLastTextField}
            primaryText="Display"
            switchOn={lastTextFieldEnabled}
          />

          <DrawerButton
            onClick={this.onClickLastTextFieldLabel}
            primaryText="Label"
            secondaryText={currentLastTextFieldLabel}
          />

          <DrawerButton
            onClick={this.onClickLastTextFieldCharLimit}
            primaryText="Character Limit"
            secondaryText={currentLastTextFieldCharLimit.toString()}
          />
        </Grid>

        <Grid item>
          <DrawerButton
            isSwitch
            onClick={toggleSuffixSelector}
            primaryText="Display"
            switchOn={suffixSelectorEnabled}
          />

          <DrawerButton
            onClick={this.onClickSuffixOptions}
            primaryText="Options"
            secondaryText={currentSuffixOptions
              .slice()
              .sort((a, b) => a.order - b.order)
              .join(', ')}
            secTextAtBottom
          />

          <DrawerButton
            onClick={this.onClickSuffixLabel}
            primaryText="Label"
            secondaryText={currentSuffixLabel}
          />
        </Grid>
      </Grid>
    )
  }
}

/**
 * @param {import('@material-ui/core').Theme} theme
 */
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
})

/**
 * @typedef {keyof ReturnType<typeof styles>} Classes
 */

export default withStyles(
  /** @type {import('@material-ui/core/styles').StyleRulesCallback<Classes>} */ (styles),
)(NamePropDefEditor)
