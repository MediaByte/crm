import React from 'react'
//react router
import { NavLink } from 'react-router-dom'
//material-ui components
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import PersonAdd from '@material-ui/icons/PersonAdd'
import GroupAdd from '@material-ui/icons/GroupAdd'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
//Material-ui icons
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
//project files
import Page from 'views/Page/Page'

const styles = theme => ({
  demo: {
    marginTop: theme.spacing.unit * 3,
  },
  content: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 4,
      marginButtom: theme.spacing.unit * 4,
      padding: theme.spacing.unit,
      paddingTop: theme.spacing.unit,
    },
  },
  Avatar: {
    margin: theme.spacing.unit,
  },
  button: {
    height: '100%',
    width: '100%',
    minWidth: 'auto',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  panelTitle: {
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: '15px',
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 5,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      marginTop: theme.spacing.unit * 2,
      marginBottom: 0,
    },
  },
  listItem: {
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 7,
      paddingBottom: 7,
      marginBottom: 1,
    },
  },
})

class AdminPanel extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
  }
  render() {
    const { classes } = this.props
    return (
      <Page component={'administration'} titleText={'Administration'}>
        <div className={classes.content}>
          <div className={classes.demo}>
            <List>
              <ListItem
                component={props => (
                  <NavLink to={'/management/employees'} {...props} />
                )}
                className={classes.listItem}
              >
                <Avatar className={classes.avatar}>TS</Avatar>
                <ListItemText
                  primary="Tony Stark"
                  secondary="tony.startk@avenger.org"
                />
                <ListItemSecondaryAction>
                  <IconButton>
                    <KeyboardArrowRight />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
          <div className={classes.demo}>
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
              {/* <ListItem
                component={props => (
                  <NavLink to={'/passwordrules'} {...props} />
                )}
                className={classes.listItem}
              >
                <ListItemText primary="Password Rules" />
                <ListItemSecondaryAction>
                  <IconButton>
                    <KeyboardArrowRight />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem> */}
            </List>
          </div>

          <div className={classes.demo}>
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
                <ListItemText primary="Nodes and Properties" />
                <ListItemSecondaryAction>
                  <IconButton>
                    <KeyboardArrowRight />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </div>
      </Page>
    )
  }
}

export default withStyles(styles)(AdminPanel)
