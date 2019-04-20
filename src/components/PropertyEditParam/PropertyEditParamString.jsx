import React from 'react'
import { Grid, List, Paper, withStyles, TextField } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const styles = {
  root: {
    padding: '10px',
  },
}

const PropertyEditParamString = ({ value, classes, onChange, type }) => {
  return (
    <Grid container direction="column" spacing={40} className={classes.root}>
      <List>
        <Paper>
          <TextField onChange={onChange} value={value} fullWidth type={type} />
        </Paper>
      </List>
    </Grid>
  )
}

export default withStyles(styles)(PropertyEditParamString)
