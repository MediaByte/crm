import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'

/**
 * @param {import('@material-ui/core').Theme} theme
 */
const styles = theme => ({
  list: {
    width: 280,
  },
  fullList: {
    position: 'absolute',
    bottom: '0',
    width: 280,
  },
  drawerPaper: {
    // position: 'relative',
    // backgroundColor: '#E0E0E0',
    // borderRadius: '1px',
    // theme.zIndex.drawer + 1
    zIndex: theme.zIndex.drawer + 1,
  },
  header: {
    display: 'flex',
    margin: 'auto',
    marginTop: '20px',
    marginBottom: '20px',
    justifyContent: 'center',
  },
  clock: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '33px',
  },
  date: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: '5px',
    },
    margin: 'auto',
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '17px',
  },
  signOut: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
    fontFamily: '"Montserrat", sans-serif',
    cursor: 'pointer',
  },
  bottomPanel: {
    display: 'flex',
  },
  userIcon: {
    fontSize: '45px',
    margin: 'auto',
    marginLeft: '20px',
  },
})

/**
 * @typedef {keyof ReturnType<typeof styles>} Classes
 */

/**
 * @typedef {object} Props
 * @prop {Record<Classes, string>} classes
 * @prop {() => void} onClose
 * @prop {boolean} open
 */

/**
 * @augments React.Component<Props>
 */
class NotificationsCenter extends React.Component {
  render() {
    const { classes, onClose, open } = this.props

    const header = (
      <div className={classes.list}>
        <GridContainer className={classes.header}>
          <GridItem xs={12} sm={3}>
            <Typography className={classes.clock}>3:03</Typography>
          </GridItem>
          <GridItem xs={12} sm={9} className={classes.date}>
            <Typography
              style={{ color: 'gray' }}
              className={classes.date}
              variant={'body1'}
            >
              Thursday, September 13
            </Typography>
          </GridItem>
        </GridContainer>
        <Divider />
      </div>
    )

    const footer = (
      <div className={classes.fullList}>
        <Divider />
        <GridContainer className={classes.bottomPanel}>
          <GridItem xs={6}>
            <Icon className={classes.userIcon}>perm_identity</Icon>
          </GridItem>
          <GridItem xs={6} className={classes.signOut}>
            <Typography
              className={classes.signOut}
              color="primary"
              variant={'button'}
            >
              SIGN OUT
            </Typography>
          </GridItem>
        </GridContainer>
      </div>
    )

    return (
      <div>
        <Drawer
          anchor="right"
          open={open}
          onClose={onClose}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div>
            {header}
            <List />
            {footer}
          </div>
        </Drawer>
      </div>
    )
  }
}

NotificationsCenter.propTypes = {
  classes: PropTypes.object.isRequired,
}

// @ts-ignore
export default withStyles(styles)(NotificationsCenter)
