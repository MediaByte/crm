import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { default as MuiDialog } from '@material-ui/core/Dialog'
import { withStyles } from '@material-ui/core/styles'

import Close from '@material-ui/icons/Close'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'

/**
 * @type {React.SFC}
 */
const Transition = props => <Slide direction="up" {...props} />

/**
 * @param {import('@material-ui/core/styles').Theme} theme
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
  container: {
    paddingBottom: '20px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '20px',
  },
  leftActionButton: { position: 'absolute', left: -1 },
  newTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
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
 * @typedef {object} Props
 * @prop {Record<ClassKey, string>} classes
 * @prop {boolean=} disableLeftActionButton (Optional)
 * @prop {boolean=} disableRightActionButton (Optional)
 * @prop {boolean=} enableClickOutsideClosing (Optional)
 * @prop {(() => void)=} handleClose (Optional) Called when the user clicks on
 * the designated close button or outside the dialog.
 * @prop {string=} leftActionButtonText (Optional) If provided, the left button
 * will be rendered.
 * @prop {(() => void)=} onClickLeftActionButton (Optional) Called when the user
 * clicks on the right action button.
 * @prop {(() => void)=} onClickRightActionButton (Optional) Called when the
 * user clicks on the right action button.
 * @prop {boolean} open
 * @prop {boolean=} rightActionButtonSubmitsForm If enabled, the action button
 * is a submit type, useful for wrapping this component in a `<form>` and have
 * declarative required/error handling. `preventDefault()` will be called on the
 * event.
 * @prop {boolean=} rightActionButtonColorPrimary (Optional) If provided, the
 * right action button's text will be the primary color.
 * @prop {boolean=} rightActionButtonColorRed (Optional) If provided, the right
 * action button's text will be red.
 * @prop {string=} rightActionButtonText (Optional) If provided, the right
 * button will be rendered.
 * @prop {boolean=} showBackArrow (Optional) Show a backarrow instead of an x
 * button for the close button.
 * @prop {boolean=} showCloseButton (Optional)
 * @prop {string} title The title the bar will render, centered and up-top.
 */

/**
 * @augments React.PureComponent<Props>
 */
class Dialog extends React.PureComponent {
  /**
   * @type {import('@material-ui/core/Button').ButtonProps['onClick']}
   */
  onClickLeftActionButton = () => {
    const { onClickLeftActionButton } = this.props

    onClickLeftActionButton && onClickLeftActionButton()
  }

  /**
   * @type {import('@material-ui/core/Button').ButtonProps['onClick']}
   */
  onClickRightActionButton = e => {
    const {
      onClickRightActionButton,
      rightActionButtonSubmitsForm,
    } = this.props

    rightActionButtonSubmitsForm && e.preventDefault()

    onClickRightActionButton && onClickRightActionButton()
  }

  render() {
    const {
      children,
      disableLeftActionButton,
      disableRightActionButton,
      enableClickOutsideClosing,
      classes,
      handleClose,
      leftActionButtonText,
      onClickLeftActionButton,
      open,
      rightActionButtonSubmitsForm,
      rightActionButtonColorPrimary,
      rightActionButtonColorRed,
      rightActionButtonText,
      showBackArrow,
      showCloseButton,
      title,
    } = this.props

    return (
      <MuiDialog
        // @ts-ignore
        fullScreen={window.innerWidth < 750}
        fullWidth
        onClose={enableClickOutsideClosing ? handleClose : undefined}
        open={!!open}
        scroll="paper"
        TransitionComponent={Transition}
      >
        <React.Fragment>
          <div className={classes.appBar}>
            <AppBar
              position="sticky"
              color="default"
              className={classes.noStyle}
            >
              <Toolbar className={classes.noShadow}>
                {showBackArrow && (
                  <IconButton
                    aria-label="Back"
                    className={classes.leftActionButton}
                    disabled={disableLeftActionButton}
                    onClick={
                      (onClickLeftActionButton &&
                        this.onClickLeftActionButton) ||
                      handleClose
                    }
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                )}

                {showCloseButton && (
                  <IconButton
                    aria-label="Close"
                    className={classes.leftActionButton}
                    disabled={disableLeftActionButton}
                    onClick={
                      (onClickLeftActionButton &&
                        this.onClickLeftActionButton) ||
                      handleClose
                    }
                  >
                    <Close />
                  </IconButton>
                )}

                {leftActionButtonText && (
                  <Button
                    aria-label={leftActionButtonText}
                    className={classes.leftActionButton}
                    color="inherit"
                    disabled={disableLeftActionButton}
                    onClick={this.onClickLeftActionButton}
                  >
                    {leftActionButtonText}
                  </Button>
                )}

                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className={classes.newTitle}
                >
                  {title}
                </Typography>

                {rightActionButtonText && (
                  <Button
                    aria-label={rightActionButtonText}
                    className={classes.actionButton}
                    color={(() => {
                      if (rightActionButtonColorPrimary) {
                        return 'primary'
                      }

                      if (rightActionButtonColorRed) {
                        return 'secondary'
                      }

                      return 'inherit'
                    })()}
                    disabled={disableRightActionButton}
                    onClick={this.onClickRightActionButton}
                    type={
                      (rightActionButtonSubmitsForm && 'submit') || undefined
                    }
                  >
                    {rightActionButtonText}
                  </Button>
                )}
              </Toolbar>
            </AppBar>
          </div>
          <DialogContent>
            <div className={classes.container}>{children}</div>
          </DialogContent>
        </React.Fragment>
      </MuiDialog>
    )
  }
}

/**
 * @typedef {keyof ReturnType<typeof styles>} ClassKey
 */

export default withStyles(
  /** @type {import('@material-ui/core/styles').StyleRulesCallback<ClassKey>} */ (styles),
)(Dialog)
