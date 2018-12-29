import React from 'react'

import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Dialog from '@material-ui/core/Dialog'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
/**
 * @typedef {import('@material-ui/core/Dialog').DialogProps} DialogProps
 * @typedef {import('@material-ui/core').Theme} Theme
 * @typedef {import('@material-ui/core').WithStyles} WithStyles
 */
/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRules<K>} StyleRules
 */

import BackArrow from '@material-ui/icons/ArrowBackIosOutlined'

import UserGroupForm from '../../views/Administration/UserGroupForm'

import { user } from '../../state/userGroups/user_data.js'

/**
 * @typedef {object} Props
 * @prop {StyleRules<keyof ReturnType<typeof styles>>} classes Don't pass this
 * prop, this will be passed in by the built in material-ui styles.
 * @prop {boolean} open Controls whether the dialog is on display.
 * @prop {DialogProps['onClose']=} onClose Called when the user tries to close
 * the dialog through either clicking either outside of it or the close button
 * at the top of the dialog. It'd be ideal to set `open` to false when this
 * callback gets executed.
 * @prop {string=} title (optional) Title that will appear at the top of the
 * dialog, default is 'add'.
 */

export {} // stop jsdoc comments from merging

/**
 * @augments React.PureComponent<Props>
 */
class AddDialog extends React.PureComponent {
  /**
   * @type {Required<Pick<Props, 'title'>>}
   */
  static defaultProps = {
    title: 'Add',
  }

  render() {
    const { classes, onClose, open, title } = this.props

    return (
      <div className={classes.root}>
        <Dialog
          fullScreen={window.innerWidth < 750}
          fullWidth
          open={open}
          onClose={onClose}
          TransitionComponent={Transition}
          scroll="paper"
        >
          <Hidden smUp>
            <div className={classes.appBar}>
              <AppBar position="fixed" dropShadow="none" color="default">
                <Toolbar className={classes.noShadow}>
                  <IconButton
                    className={classes.menuButton}
                    color="default"
                    onClick={onClose}
                    aria-label="Close"
                  >
                    <BackArrow />
                  </IconButton>
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    color="inherit"
                    className={classes.title}
                  >
                    {title}
                  </Typography>
                </Toolbar>
              </AppBar>
            </div>
          </Hidden>
          <div className={classes.root}>
            <UserGroupForm user={user} handleClose={onClose} title={title} />
          </div>
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
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  noShadow: {
    dropShadow: 'none',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },
  root: {
    padding: 10,
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
    [theme.breakpoints.up('md')]: {
      padding: 0,
    },
  },
  title: {
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
      left: '70px',
      position: 'absolute',
      width: '75%',
      textAlign: 'center',
    },
  },
})

export default withStyles(styles)(AddDialog)
