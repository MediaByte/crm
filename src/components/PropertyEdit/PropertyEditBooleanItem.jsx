import React from 'react'
import {
  Typography,
  withStyles,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from '@material-ui/core'

const styles = {
  listItem: {
    background: '#fff',
  },
}

const PropertyEditParamBoolean = ({
  checked,
  classes,
  onChange,
  primaryText,
  helpText,
  helpTextChecked,
}) => {
  const showHelpText = () => {
    if (helpTextChecked) {
      if (checked) {
        return helpTextChecked
      } else {
        return helpText
      }
    } else {
      return helpText
    }
  }

  return (
    <List>
      <ListItem className={classes.listItem}>
        <ListItemText primary={primaryText} />
        <ListItemSecondaryAction>
          <Switch color="primary" onChange={onChange} checked={checked} />
        </ListItemSecondaryAction>
      </ListItem>
      <li>
        <Typography align="center" variant="body1" color="textSecondary">
          {showHelpText()}
        </Typography>
      </li>
    </List>
  )
}

export default withStyles(styles)(PropertyEditParamBoolean)
