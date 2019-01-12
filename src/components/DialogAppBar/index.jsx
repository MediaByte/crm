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

import Close from '@material-ui/icons/Close'

/**
 * @typedef {object} Props
 * @prop {boolean=} actionButtonSubmitsForm If enabled, the action button is a
 * submit type, useful for wrapping this component in a `<form>` and have
 * declarative required/error handling. `preventDefault()` will be called on the
 * event.
 * @prop {string} actionButtonText
 * @prop {Record<ClassNames, string>} classes Material-UI's classes. Don't pass
 * unless you'll be overriding.
 * @prop {(() => void)=} onClickActionButton (Optional) Called when the user
 * clicks on the designated close button.
 * @prop {(() => void)=} onClickCloseButton (Optional) Called when the user
 * clicks on the designated close button.
 * @prop {string} title The title the bar will render, centered and up-top.
 */

export {} // stop jsdoc from merging

/**
 * @augments React.PureComponent<Props>
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
      onClickCloseButton,
      title,
    } = this.props

    return (
      <div className={classes.appBar}>
        <AppBar position="sticky" color="default" className={classes.noStyle}>
          <Toolbar className={classes.noShadow}>
            <IconButton
              aria-label="Close"
              className={classes.closeButton}
              onClick={onClickCloseButton}
            >
              <Close />
            </IconButton>
            <Typography
              variant="subtitle1"
              color="inherit"
              className={classes.newTitle}
            >
              {title}
            </Typography>
            <Button
              aria-label={actionButtonText}
              className={classes.actionButton}
              color="inherit"
              onClick={this.onClickActionButton}
              type={(actionButtonSubmitsForm && 'submit') || undefined}
            >
              {actionButtonText}
            </Button>
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
  },
  noStyle: {
    [theme.breakpoints.down('md')]: {
      boxShadow: 'none',
      dropShadow: 'none',
    },
  },
})

/**
 * @typedef {keyof ReturnType<typeof styles>} ClassNames
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
