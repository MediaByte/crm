import React, { Component } from 'react'
//react router
import { NavLink } from 'react-router-dom'

import PropTypes from 'prop-types'

//material-ui components
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import PersonAdd from '@material-ui/icons/PersonAdd'
import ScatterPlot from '@material-ui/icons/ScatterPlotOutlined'
import GroupAdd from '@material-ui/icons/GroupAdd'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

//Material-ui icons
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

//project files
import Page from 'views/Page/Page'

//styles
import adminStyles from './adminStyles.js'
import ManageEmployees from 'views/ManageEmployees/ManageEmployees.jsx'
import Dashboard from 'views/Dashboard/Dashboard.jsx'
import { Typography, Divider } from '@material-ui/core'
import ManageUserGroups from 'views/ManageUserGroups/index.jsx'
import { Label } from '@material-ui/icons'

class AdminPanel extends Component {
  render() {
    const { classes, match } = this.props

    return (
      <Page component={'administration'} titleText={'Administration'}>
        <List className={classes.AdminContent}>
          <ListItem
            component={props => (
              <NavLink to={`${match.url}/employees`} {...props} />
            )}
            className={classes.listItem}
          >
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary="Manage Employees" />
            <ListItemSecondaryAction>
              <IconButton>
                <KeyboardArrowRight />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem
            component={props => (
              <NavLink to={`${match.url}/user-groups`} {...props} />
            )}
            className={classes.listItem}
          >
            <ListItemIcon>
              <GroupAdd />
            </ListItemIcon>
            <ListItemText primary="Manage User Groups" />
            <ListItemSecondaryAction>
              <IconButton>
                <KeyboardArrowRight />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List className={classes.SpacingBetweenLists}>
          <ListItem
            component={props => (
              <NavLink to={`${match.url}/nodes-and-props`} {...props} />
            )}
            className={classes.listItem}
          >
            <ListItemIcon>
              <ScatterPlot />
            </ListItemIcon>
            <ListItemText primary="Nodes and Properties" />
            <ListItemSecondaryAction>
              <IconButton>
                <KeyboardArrowRight />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Page>
    )
  }
}
export default withStyles(adminStyles)(AdminPanel)
