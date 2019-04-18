import React, { Fragment } from 'react'
import {
  List,
  Grid,
  Paper,
  ListItem,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  Divider,
  Typography,
  withStyles,
} from '@material-ui/core'
import { RadioButtonChecked, RadioButtonUnchecked } from '@material-ui/icons'

const styles = {
  root: {
    padding: '10px',
  },
}

const PropertyEditParamOptionsStatic = ({
  options,
  checked,
  info,
  classes,
}) => (
  <Grid container spacing={40} className={root} direction="column">
    <Grid item>
      <Typography align="center">{info}</Typography>
    </Grid>
    <Grid item>
      <Paper square>
        <List>
          {options.map(option => (
            <Fragment>
              <ListItem>
                <ListItemText primary={option.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    {option.name === checked ? (
                      <RadioButtonChecked color="primary" />
                    ) : (
                      <RadioButtonUnchecked />
                    )}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <li>
                <Divider />
              </li>
            </Fragment>
          ))}
        </List>
      </Paper>
    </Grid>
  </Grid>
)

export default withStyles(styles)(PropertyEditParamOptionsStatic)
