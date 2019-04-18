import React from 'react'
import {
  Grid,
  List,
  ListItemText,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  Paper,
  withStyles,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'

const styles = {
  root: {
    padding: '10px',
  },
}

const PropertyEditParamString = ({ editItem, classes, onClear }) => {
  return (
    <Grid container direction="column" spacing={40} className={classes.root}>
      <List>
        <Paper square>
          <ListItem>
            <ListItemText primary="Label" />
            <ListItemSecondaryAction>
              <IconButton onClick={onClear}>
                <Close />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      </List>
    </Grid>
  )
}

export default withStyles(styles)(PropertyEditParamString)
