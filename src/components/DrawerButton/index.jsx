import React, { Fragment } from 'react'
import {
  Typography,
  withStyles,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Grid,
  Divider,
} from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const styles = {
  listItem: {
    background: '#fff',
  },
}

const DrawerButton = ({
  classes,
  primaryText,
  secondaryText,
  secondaryTextToRight,
  onClick,
  divider,
}) => (
  <Fragment>
    <ListItem className={classes.listItem} button onClick={onClick}>
      <ListItemText
        primary={primaryText}
        secondary={!secondaryTextToRight && secondaryText}
      />
      <ListItemSecondaryAction>
        {secondaryTextToRight ? (
          <Grid container alignItems="center">
            <Typography color="textSecondary">{secondaryText}</Typography>
            <ChevronRightIcon color="disabled" fontSize="small" />
          </Grid>
        ) : (
          <ChevronRightIcon color="disabled" fontSize="small" />
        )}
      </ListItemSecondaryAction>
    </ListItem>
    {divider && (
      <li>
        <Divider />
      </li>
    )}
  </Fragment>
)

export default withStyles(styles)(DrawerButton)
