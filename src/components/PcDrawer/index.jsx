import React from 'react'
import {
  Button,
  Drawer,
  AppBar,
  Toolbar,
  withStyles,
  Typography,
  Grid,
  IconButton,
} from '@material-ui/core'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */
const styles = theme => ({
  drawerWidth: {
    [theme.breakpoints.down('xs')]: {
      width: '100vw',
    },
    width: '480px',
    borderLeft: '1px solid #eee',
    background: '#fafafa',
  },
  menuButton: {
    color: '#fff',
  },
  title: {
    color: '#fff',
  },
})

/**
 * @typedef {keyof ReturnType<typeof styles>} ClassKey
 */

/**
 * @typedef {object} Props
 * @prop {Record<ClassKey, string>} classes
 * @prop {JSX.Element=} leftAction (Optional)
 * @prop {(() => void)=} leftButtonOnClick (Optional)
 * @prop {string=} leftButtonText (Optional) If provided renders a button with
 * this text to the left of the header as opposed to a back arrow button.
 * @prop {boolean} open
 * @prop {JSX.Element=} rightAction (Optional)
 * @prop {(() => void)=} rightButtonOnClick (Optional)
 * @prop {string=} rightButtonText (Optional) If provided, renders a button with
 * this text to the right of the header.
 * @prop {string} title
 */

/**
 * @augments React.PureComponent<Props>
 */
class PcDrawer extends React.PureComponent {
  render() {
    const {
      leftAction,
      leftButtonOnClick,
      leftButtonText,
      rightAction,
      rightButtonOnClick,
      rightButtonText,
      title,
      children,
      classes,
      open,
      ...props
    } = this.props

    const leftEl = (() => {
      if (leftAction) {
        return leftAction
      }

      if (leftButtonText) {
        return (
          <Button className={classes.menuButton} onClick={leftButtonOnClick}>
            Cancel
          </Button>
        )
      }

      return (
        <IconButton
          onClick={leftButtonOnClick}
          className={classes.menuButton}
          aria-label="Close drawer"
        >
          <ChevronLeft />
        </IconButton>
      )
    })()

    const rightEl = (() => {
      if (rightAction) {
        return rightAction
      }

      if (rightButtonText) {
        return (
          <Button className={classes.menuButton} onClick={rightButtonOnClick}>
            {rightButtonText}
          </Button>
        )
      }

      return null
    })()

    return (
      <Drawer
        {...props}
        anchor="right"
        ModalProps={{
          hideBackdrop: true,
        }}
        classes={{
          paper: classes.drawerWidth,
        }}
        elevation={1}
        open={open}
      >
        <Grid container direction="column">
          <AppBar position="sticky">
            <Toolbar>
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs>
                  {leftEl}
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    align="center"
                    className={classes.title}
                    variant="h3"
                  >
                    {title}
                  </Typography>
                </Grid>
                <Grid item xs container justify="flex-end">
                  {rightEl}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          {children}
        </Grid>
      </Drawer>
    )
  }
}

export default withStyles(styles)(PcDrawer)
