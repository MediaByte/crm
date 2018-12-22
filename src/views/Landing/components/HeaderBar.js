import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { Link } from 'react-router-dom'

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#0dacc4',
  },
})

class HeaderBar extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.appBar}>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            />
            <Link style={{ color: 'white' }} to="/login">
              <Button color="inherit">Login</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HeaderBar)
