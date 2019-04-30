import React, { PureComponent } from 'react'
import {
  Grid,
  Typography,
  Paper,
  withStyles,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  Switch,
  List,
} from '@material-ui/core'

const styles = {
  padding20: {
    padding: '20px',
  },
  listItem: {
    background: '#fff',
  },
}

const helpTextPropsSampleA = {
  currentHelpText: 'lorem ipsum dolor',
  helpTextEnabled: true,
}

class HelpText extends PureComponent {
  render() {
    const { classes, helpTextEnabled, currentHelpText } = this.props
    return (
      <div className={classes.padding20}>
        <Grid container direction="column" spacing={40}>
          <Grid item alignContent="flex-end">
            <List>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Index" />
                <ListItemSecondaryAction>
                  <Switch
                    color="primary"
                    onChange={() => {}}
                    checked={helpTextEnabled}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <li>
                <Typography
                  align="center"
                  variant="body1"
                  color="textSecondary"
                >
                  This is help text
                </Typography>
              </li>
            </List>
          </Grid>
          <Grid item>
            <Paper className={classes.padding20}>
              <Typography>{currentHelpText}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

HelpText.defaultProps = helpTextPropsSampleA

export default withStyles(styles)(HelpText)
