import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

/**
 *
 * @param {import('@material-ui/core/styles').Theme} theme
 */
const styles = theme => ({
  message: {
    color: theme.palette.error.dark,
  },
  messagesList: { listStyleType: 'circle' },
})

/**
 * @typedef {object} Props
 * @prop {Record<keyof ReturnType<typeof styles>, string>} classes
 * @prop {string[]} messages
 */

/**
 * @type {React.SFC<Props>}
 */
const Messages = ({ classes, messages }) => (
  <Grid container spacing={8}>
    <ul className={classes.messagesList}>
      {messages.map(err => (
        <li>
          <Grid item>
            <Typography className={classes.message}>{err}</Typography>
          </Grid>
        </li>
      ))}
    </ul>
  </Grid>
)

export default withStyles(
  /** @type {import('@material-ui/core/styles/withStyles').StyleRulesCallback<keyof ReturnType<typeof styles>>} */ (styles),
)(Messages)
