import React, { Component } from 'react'

//Material-UI components
import { withStyles } from '@material-ui/core/styles'

//project components
import HeaderBar from './components/HeaderBar.js'
import Content from './components/Content.js'

const styles = theme => ({
  root: {},
  content: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 5,
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing.unit * 20,
    },
  },
})

class Landing extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <HeaderBar />
        <div className={classes.content}>
          <Content />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Landing)
