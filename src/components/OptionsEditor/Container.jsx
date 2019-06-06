/**
 * @prettier
 */
import React from 'react'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

/**
 * @typedef {object} Props
 * @prop {Record<Classes, string>} classes
 */

/**
 * @augments React.PureComponent<Props>
 */
class Container extends React.PureComponent {
  render() {
    const { children, classes } = this.props

    return (
      <Grid className={classes.root} container direction="column">
        {children}
      </Grid>
    )
  }
}

/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
})

/**
 * @typedef {keyof ReturnType<typeof styles>} Classes
 */

export default withStyles(styles)(Container)
