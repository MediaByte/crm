import React, { PureComponent, Fragment } from 'react'
import {
  Grid,
  List,
  ListItem,
  ListSubheader,
  ListItemSecondaryAction,
  ListItemText,
  withStyles,
  Switch,
  Typography,
  Divider,
} from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import SomeIcon from '@material-ui/icons/AcUnit'
import SomeOtherIcon from '@material-ui/icons/AccessAlarms'

import DrawerButton from 'components/DrawerButton'

const propDefEditorSamplePropsA = {
  label: 'Foo',
  helpTextEnabled: true,
  required: false,
  index: false,
  icon: SomeIcon,
  propDefArguments: [],
}

const propDefEditorSamplePropsB = {
  label: 'Make',
  helpTextEnabled: false,
  required: false,
  index: true,
  icon: SomeOtherIcon,
  propDefArguments: [
    {
      name: 'Max Length',
      value: '155',
    },
  ],
}

const propDefEditorSamplePropsC = {
  label: 'Roles',
  helpTextEnabled: false,
  required: false,
  index: true,
  icon: SomeOtherIcon,
  propDefArguments: [
    {
      name: 'Options',
      value: 'Boss, Cooperator, Servant',
    },
  ],
}

const styles = {
  listItem: {
    background: '#fff',
  },
}

class PropDefEditor extends PureComponent {
  render() {
    const {
      classes,
      label,
      helpTextEnabled,
      required,
      index,
      icon: Icon,
      propDefArguments,
    } = this.props

    return (
      <div style={{ padding: '20px' }}>
        <Grid
          container
          direction="column"
          spacing={40}
          className={classes.main}
        >
          <List
            subheader={<ListSubheader disableSticky>APPEARANCE</ListSubheader>}
          >
            <DrawerButton primaryText="Label" secondaryText={label} />
            <li>
              <Divider />
            </li>
            {propDefArguments.map(propDefArgument => (
              <Fragment>
                <DrawerButton
                  key={propDefArgument.name}
                  primaryText={propDefArgument.name}
                  secondaryText={propDefArgument.value}
                />
                <li>
                  <Divider />
                </li>
              </Fragment>
            ))}
          </List>

          <List>
            <DrawerButton
              primaryText="Help Text"
              secondaryText={helpTextEnabled ? 'Enabled' : 'Disabled'}
            />
          </List>

          <List>
            <ListItem className={classes.listItem}>
              <ListItemText primary="Required" />
              <ListItemSecondaryAction>
                <Switch
                  color="primary"
                  onChange={() => {}}
                  checked={required}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <li>
              <Typography align="center" variant="body1" color="textSecondary">
                {required
                  ? 'Users will not be able to save if this property is empty'
                  : 'Users will not be able to save if this property is empty if toggled'}
              </Typography>
            </li>
          </List>
          <List>
            <ListItem className={classes.listItem}>
              <ListItemText primary="Index" />
              <ListItemSecondaryAction>
                <Switch color="primary" onChange={() => {}} checked={index} />
              </ListItemSecondaryAction>
            </ListItem>
            <li>
              <Typography align="center" variant="body1" color="textSecondary">
                {index
                  ? 'This property will appear in Universal Search results'
                  : 'This property will appear in Universal Search results if toggled'}
              </Typography>
            </li>
          </List>
          <List subheader={<ListSubheader disableSticky>ICON</ListSubheader>}>
            <ListItem className={classes.listItem} button>
              <Icon />
              <ListItemSecondaryAction>
                <ChevronRightIcon fontSize="small" />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      </div>
    )
  }
}

PropDefEditor.defaultProps = propDefEditorSamplePropsC

export default withStyles(styles)(PropDefEditor)
