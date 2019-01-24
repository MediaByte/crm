import React from 'react'

import { withStyles } from '@material-ui/core/styles'

import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'

/**
 * @typedef {import('@material-ui/core/Select').SelectProps} SelectProps
 * @typedef {import('@material-ui/core/SvgIcon').SvgIconProps} SvgIconProps
 * @typedef {import('@material-ui/core/TextField').TextFieldProps} TextFieldProps
 * @typedef {import('@material-ui/core').Theme} Theme
 */
/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRulesCallback<K>} StyleRulesCallback
 */

import ErrorOutline from '@material-ui/icons/ErrorOutline'

import DialogAppBar from '../DialogAppBar'

/**
 * @typedef {object} Props
 * @prop {Record<ClassNames, string>} classes
 * @prop {(() => void)=} handleClose (Optional) Called when the user tries to
 * close the dialog through either clicking either outside of it or the close
 * button at the top of the dialog. It'd be ideal to set `open` to false when
 * this callback gets executed.
 * @prop {(() => void)=} handleSave (Optional) Called when the user clicks on
 * the save button at the top of the dialog.
 * @prop {boolean=} identifierFieldError (Optional) If true, sets the identifier
 * field to an error state.
 * @prop {string=} identifierFieldValue (Optional) Current value for the
 * identifier field.
 * @prop {boolean=} labelFieldError (Optional) If true, sets the label field to
 * an error state.
 * @prop {string=} labelFieldValue (Optional) Current value for the label field.
 * @prop {boolean=} nameFieldError (Optional) If true, sets the name field to an
 * error state.
 * @prop {string=} nameFieldValue (Optional) Current value for the name field.
 * @prop {(() => void)=} onClickSelectedIcon (Optional)
 * @prop {((nextIdentifierValue: string) => void)=} onChangeIdentifierField
 * (Optional) If provided, gets called with the new value of the name field each
 * time it changes.
 * @prop {((nextLabelValue: string) => void)=} onChangeLabelField (Optional)
 * If provided, gets called with the new value of the label field each time it
 * changes.
 * @prop {((nextNameValue: string) => void)=} onChangeNameField (Optional) Gets
 * called with the new value of the name field each time it changes.
 * @prop {boolean} open Controls whether the dialog is on display.
 * @prop {React.ComponentType<SvgIconProps>} selectedIcon Will be rendered to
 * display to the user that this icon is the one selected for the node to be
 * created.
 */

export {} // stop jsdoc comments from merging

const NAME_FIELD_HELPER_TEXT = 'Only letters (a-z, A-Z) are allowed'
const IDENTIFIER_FIELD_HELPER_TEXT =
  'Only letters (a-z, A-Z) and numbers (0-9) are allowed'
const LABEL_FIELD_HELPER_TEXT = 'Only letters (a-z, A-Z) and spaces are allowed'

/**
 * @type {TextFieldProps['InputProps']}
 */
const nameFieldInputProps = {
  endAdornment: (
    <Tooltip title="This is the name of the table that lives in the database">
      <InputAdornment position="end">
        <ErrorOutline color="primary" />
      </InputAdornment>
    </Tooltip>
  ),
}

/**
 * @type {TextFieldProps['InputProps']}
 */
const identifierFieldInputProps = {
  endAdornment: (
    <Tooltip title="Unique identifier that is applied to each record within the Node">
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
    <Tooltip title="Node Label is the text that will live in the header of the Node Dispatch Center">
      <InputAdornment position="end">
        <ErrorOutline color="primary" />
      </InputAdornment>
    </Tooltip>
  ),
}

/**
 * @augments React.PureComponent<Props>
 */
class AddDialog extends React.PureComponent {
  /**
   * @type {TextFieldProps['onChange']}
   */
  onChangeIdentifierField = e => {
    const { onChangeIdentifierField } = this.props

    onChangeIdentifierField && onChangeIdentifierField(e.target.value)
  }

  /**
   * @type {TextFieldProps['onChange']}
   */
  onChangeLabelField = e => {
    const { onChangeLabelField } = this.props

    onChangeLabelField && onChangeLabelField(e.target.value)
  }

  /**
   * @type {TextFieldProps['onChange']}
   */
  onChangeNameField = e => {
    const { onChangeNameField } = this.props

    onChangeNameField && onChangeNameField(e.target.value)
  }

  render() {
    const {
      classes,
      handleClose,
      handleSave,
      identifierFieldError,
      identifierFieldValue,
      labelFieldError,
      labelFieldValue,
      nameFieldError,
      nameFieldValue,
      onClickSelectedIcon,
      open,
      selectedIcon: SelectedIcon,
    } = this.props

    return (
      <div className={classes.root}>
        <Dialog
          fullScreen={window.innerWidth < 750}
          fullWidth
          onClose={handleClose}
          open={open}
          scroll="paper"
          TransitionComponent={Transition}
        >
          <form>
            <DialogAppBar
              actionButtonSubmitsForm
              actionButtonText="SAVE"
              onClickActionButton={handleSave}
              onClickCloseButton={handleClose}
              title="Add Node"
            />
            <div className={classes.dialogBody}>
              <TextField
                InputProps={nameFieldInputProps}
                error={nameFieldError}
                fullWidth
                helperText={nameFieldError && NAME_FIELD_HELPER_TEXT}
                id="add-node-dialog-name-field" // required for Accessibility
                label="Name"
                name="name"
                onChange={this.onChangeNameField}
                placeholder={NAME_FIELD_HELPER_TEXT}
                value={nameFieldValue}
                required
              />
              <TextField
                InputProps={identifierFieldInputProps}
                error={identifierFieldError}
                fullWidth
                helperText={
                  identifierFieldError && IDENTIFIER_FIELD_HELPER_TEXT
                }
                id="add-node-dialog-identifier-field" // required for Accessibility
                label="Identifier"
                name="identifier" // for accessibility only
                onChange={this.onChangeIdentifierField}
                placeholder={IDENTIFIER_FIELD_HELPER_TEXT}
                value={identifierFieldValue}
                required
              />
              <TextField
                InputProps={labelFieldInputProps}
                error={labelFieldError}
                fullWidth
                helperText={labelFieldError && LABEL_FIELD_HELPER_TEXT}
                id="add-node-dialog-label-field" // required for Accessibility
                label="Label"
                name="label" // for accessibility only
                onChange={this.onChangeLabelField}
                placeholder={LABEL_FIELD_HELPER_TEXT}
                required
                value={labelFieldValue}
              />
              <Divider />
              <Grid
                alignContent="center"
                alignItems="center"
                container
                direction="row"
                justify="center"
              >
                <IconButton onClick={onClickSelectedIcon}>
                  <SelectedIcon className={classes.selectedIcon} />
                </IconButton>
              </Grid>
            </div>
          </form>
        </Dialog>
      </div>
    )
  }
}

/**
 * @type {React.SFC}
 */
const Transition = props => <Slide direction="up" {...props} />

/**
 * @param {Theme} theme
 */
const styles = theme => ({
  appBar: {
    dropShadow: 'none',
  },
  dialogBody: {
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  h6: {
    display: 'inline',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  noShadow: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    dropShadow: 'none',
  },
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
    [theme.breakpoints.up('md')]: {
      padding: 0,
    },
    padding: 10,
  },
  selectedIcon: {
    height: 60,
    width: 60,
  },
  title: {
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
      left: '70px',
      position: 'absolute',
      textAlign: 'center',
      width: '75%',
    },
  },
})

/**
 * @typedef {keyof ReturnType<typeof styles>} ClassNames
 */

export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {StyleRulesCallback<ClassNames>} */ (styles),
)(AddDialog)
