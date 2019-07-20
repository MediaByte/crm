import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
/**
 * @typedef {import('@material-ui/core').Theme} Theme
 * @typedef {import('@material-ui/core/Button').ButtonProps} ButtonProps
 */
/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRulesCallback<K>} StyleRulesCallback
 */

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import Close from '@material-ui/icons/Close'

/**
 * @typedef {object} Props
 * @prop {boolean=} actionButtonSubmitsForm If enabled, the action button is a
 * submit type, useful for wrapping this component in a `<form>` and have
 * declarative required/error handling. `preventDefault()` will be called on the
 * event.
 * @prop {string=} actionButtonText (Optional) If not provided, the action
 * button won't be rendered.
 * @prop {boolean=} hideCloseButton (Optional) Hides the close button.
 * @prop {(() => void)=} onClickActionButton (Optional) Called when the user
 * clicks on the designated close button.
 * @prop {(() => void)=} onClickCloseButton (Optional) Called when the user
 * clicks on the designated close button.
 * @prop {boolean=} showBackArrow (Optional) Show a backarrow instead of an x
 * button for the close button.
 * @prop {string} title The title the bar will render, centered and up-top.
 */

export {} // stop jsdoc from merging

/**
 * @augments React.PureComponent<Props & { classes: Classes }>
 */
class DialogAppBar extends React.PureComponent {
  /**
   * @type {ButtonProps['onClick']}
   */
  onClickActionButton = e => {
    const { actionButtonSubmitsForm, onClickActionButton } = this.props

    actionButtonSubmitsForm && e.preventDefault()

    onClickActionButton && onClickActionButton()
  }

  render() {
    const {
      actionButtonSubmitsForm,
      actionButtonText,
      classes,
      hideCloseButton,
      onClickCloseButton,
      showBackArrow,
      title,
    } = this.props

    const showCloseButton = !hideCloseButton

    return (
      <div className={classes.appBar}>
        <AppBar position="sticky" color="default" className={classes.noStyle}>
          <Toolbar className={classes.noShadow}>
            {showCloseButton && (
              <IconButton
                aria-label="Close"
                className={classes.closeButton}
                onClick={onClickCloseButton}
              >
                {showBackArrow ? <KeyboardArrowLeft /> : <Close />}
              </IconButton>
            )}
            <Typography
              variant="subtitle1"
              color="inherit"
              className={classes.newTitle}
            >
              {title}
            </Typography>
            {actionButtonText && (
              <Button
                aria-label={actionButtonText}
                className={classes.actionButton}
                color="inherit"
                onClick={this.onClickActionButton}
                type={(actionButtonSubmitsForm && 'submit') || undefined}
              >
                {actionButtonText}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

/**
 * @param {Theme} theme
 */
const styles = theme => ({
  // Mui treats <Typography /> differently and always centers it, disregarding
  // the order in which the elements are rendered inside <AppBar />. so we force
  // the buttons's positions.
  actionButton: { position: 'absolute', right: 1 },
  appBar: {
    dropShadow: 'none',
    position: 'sticky',
    flex: 1,
    top: 0,
    zIndex: 10,
    boxShadow: 'none',
  },
  closeButton: { position: 'absolute', left: -1 },
  newTitle: {
    margin: '0 auto',
    left: '70px',
    position: 'absolute',
    width: '75%',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0dacc4',
  },
  noShadow: {
    dropShadow: 'none',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    boxShadow: 'none',
  },
  noStyle: {
    [theme.breakpoints.up('sm')]: {
      padding: 0,
      boxShadow: 'none',
    },
    [theme.breakpoints.down('md')]: {
      //boxShadow: 'none',
      boxShadow: 'none',
    },
  },
})

/**
 * @typedef {keyof ReturnType<typeof styles>} ClassNames
 * @typedef {Record<ClassNames, string>} Classes
 */

export {} // stop jsdoc comments from merging

/**
 * A reusable header bar for use in app dialogs, offers close and action buttons
 * with their corresponding callback.
 */
const styled = withStyles(
  /** @type {StyleRulesCallback<ClassNames>} */ (styles),
)(DialogAppBar)

export default styled
