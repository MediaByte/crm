import React from 'react'
//react router
import { NavLink } from 'react-router-dom'

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

class AdminPanel extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
  }
  render() {
    const { classes } = this.props
    return (
      <Page component={'administration'} titleText={'Administration'}>
        <div className={classes.AdminContent}>
            <List>
              <ListItem
                component={props => (
                  <NavLink to={'/management/employees'} {...props} />
                )}
                className={classes.listItem}
              >
                <Avatar className={classes.UserAvatar}>TS</Avatar>
                <ListItemText
                  primary="Tony Stark"
                  secondary="tony.stark@avenger.org"
                />
                <ListItemSecondaryAction>
                  <IconButton>
                    <KeyboardArrowRight />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
          <div className={classes.SpacingBetweenLists}>
            <List>
              <ListItem
                component={props => (
                  <NavLink to={'/management/employees'} {...props} />
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
                  <NavLink to={'/management/user-groups'} {...props} />
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
              <ListItem
                component={props => (
                  <NavLink to={'/management/user-groups'} {...props} />
                )}
                className={classes.listItem}
              >
                <ListItemIcon>
                  <InfoOutlined />
                </ListItemIcon>
                <ListItemText primary="Agency Details" />
                <ListItemSecondaryAction>
                  <IconButton>
                    <KeyboardArrowRight />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>

          <div className={classes.SpacingBetweenLists}>
            <List>
              <ListItem
                component={props => (
                  <NavLink to={'/management/nodes-and-props'} {...props} />
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
          </div>
      </Page>
    )
  }
}

export default withStyles(adminStyles)(AdminPanel)
