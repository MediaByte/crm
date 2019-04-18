import React, { Fragment } from 'react'
import {
  Grid,
  Typography,
  withStyles,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
  ListSubheader,
  List,
  Paper,
} from '@material-ui/core'
import PropertyEditSimpleItem from 'components/PropertyEdit/PropertyEditSimpleItem'

const styles = {
  root: {
    padding: '10px',
  },
}

const PropertyEditParamDisplayFields = ({
  properties,
  classes,
  info,
  avatar,
}) => {
  return (
    <Grid container direction="column" spacing={40} className={classes.root}>
      <Grid item>
        <Typography align="center">{info}</Typography>
      </Grid>
      {avatar && (
        <List>
          <Paper square>
            <ListItem>
              <ListItemText primary="Avatar" />
              <ListItemSecondaryAction>
                <Switch color="primary" onChange={() => {}} checked={true} />
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        </List>
      )}
      {properties.map(property => (
        <List
          key={property.id}
          subheader={
            property.type === 'picklist' ? (
              <ListSubheader disableSticky>
                {property.type.toUpperCase()}
              </ListSubheader>
            ) : null
          }
        >
          {!property.unhidable && (
            <Fragment>
              <Paper>
                <ListItem>
                  <ListItemText primary="Display" />
                  <ListItemSecondaryAction>
                    <Switch
                      color="primary"
                      onChange={() => {}}
                      checked={true}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
              <li>
                <Divider />
              </li>
            </Fragment>
          )}
          {property.params.map((param, index) => (
            <PropertyEditSimpleItem
              primaryText={param.primaryText}
              secondaryText={param.secondaryText}
              actionText={param.actionText}
              onClick={() => {}}
              divider={property.params.length !== index + 1}
            />
          ))}
          {property.unhidable && (
            <li>
              <Typography align="center" variant="body1" color="textSecondary">
                {property.unhidable}
              </Typography>
            </li>
          )}
        </List>
      ))}
    </Grid>
  )
}

export default withStyles(styles)(PropertyEditParamDisplayFields)
