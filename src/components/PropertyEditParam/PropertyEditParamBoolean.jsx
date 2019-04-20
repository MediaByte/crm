import React from 'react'
import { Grid, Typography, Paper, withStyles } from '@material-ui/core'
import PropertyEditBooleanItem from 'components/PropertyEdit/PropertyEditBooleanItem'

const styles = {
  booleanInfoContainer: {
    padding: '20px',
  },
}

const PropertyEditParamBoolean = ({
  name,
  helpText,
  booleanInfo,
  onToggle,
  classes,
}) => {
  return (
    <Grid container direction="column" spacing={40}>
      <Grid item alignContent="flex-end">
        <PropertyEditBooleanItem
          primaryText={name}
          helpText={helpText}
          onChange={onToggle}
          checked={true}
        />
      </Grid>
      {booleanInfo && (
        <Grid item>
          <Paper className={classes.booleanInfoContainer}>
            <Typography>{booleanInfo}</Typography>
          </Paper>
        </Grid>
      )}
    </Grid>
  )
}

export default withStyles(styles)(PropertyEditParamBoolean)
