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
import PcIcon from 'components/PcIcon'

const styles = {
  listItem: {
    background: '#fff',
  },
}

const PropertyEditSimpleItem = ({
  classes,
  iconName,
  primaryText,
  secondaryText,
  actionText,
  onClick,
  divider,
}) => (
  <Fragment>
    <ListItem className={classes.listItem} button onClick={onClick}>
      {iconName ? (
        <PcIcon name={iconName} theme="outlined" fontSize="large" />
      ) : (
        <ListItemText primary={primaryText} secondary={secondaryText} />
      )}
      <ListItemSecondaryAction>
        {actionText ? (
          <Grid container alignItems="center">
            <Typography color="textSecondary">{actionText}</Typography>
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

export default withStyles(styles)(PropertyEditSimpleItem)
