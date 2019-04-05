import React from 'react'
import PropTypes from 'prop-types'
//npm package for concatenating classes
import classNames from 'classnames'
//react router
import { NavLink, Link, Redirect } from 'react-router-dom'
//Material-ui components
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Dashboard from '@material-ui/icons/Dashboard'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import InputBase from '@material-ui/core/InputBase'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'

//material ui icons
import CalendarTodayOutlined from '@material-ui/icons/CalendarTodayOutlined'
import MenuIcon from '@material-ui/icons/Menu'
import Laptop from '@material-ui/icons/Laptop'
import People from '@material-ui/icons/People'
import Event from '@material-ui/icons/EventOutlined'
import AccountBalance from '@material-ui/icons/AccountBalanceOutlined'
import CreditCard from '@material-ui/icons/CreditCard'
import MailOutline from '@material-ui/icons/MailOutline'
import SearchIcon from '@material-ui/icons/Search'

//projects components
import NotificationsCenter from 'components/NotificationCenter/NotificationsCenter.js'
import Logo from 'assets/img/crmLogo.png'
//styles
import navStyles from 'components/Navigation/navStyle.js'

//State

class Navigation extends React.Component {
  state = {
    disableUnderline: true,
    value: 0,
    hide: true,
    sidebarOpen: false,
  }

  openSidebar = () => {
    this.setState({
      sidebarOpen: true,
    })
  }

  closeSidebar = () => {
    this.setState({
      sidebarOpen: false,
    })
  }

  toggleSearch = () => {
    this.setState(prevState => ({
      hide: !prevState.hide,
    }))
  }

  handleChange = (event, value) => {
    console.log('handleChange', value)
    let page
    switch (value) {
      case 0:
        page = '/pinecone/dashboard/test@gmail.com'
        break
      case 1:
        page = '/admin/test@gmail.com'
        break
      default:
        page = '/admin/test@gmail.com'
        break
    }
    console.log('page', page)

    this.setState({ value })
    return <Redirect to={page} />
  }

  render() {
    const { classes, children, component } = this.props
    const { sidebarOpen, value } = this.state

    const renderMenu = (
      <div>
        <div className={classes.toolbar}>
          <Link
            to="/pinecone/dashboard/test@gmail.com"
            className={classes.toolbarLink}
          >
            <img
              width={25}
              src={Logo}
              alt={'Sign in to continue'}
              className={classes.imgLogo}
            />
          </Link>
          <IconButton
            className={classNames(classes.menuButtonMobile)}
            onClick={this.closeSidebar}
            style={{ color: '#fff' }}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <div>
          <Divider className={classes.dividerLogo} />
          <List className={classes.drawerList} style={{ marginTop: -8 }}>
            <ListItem
              selected={component === 'dashboard'}
              classes={{ selected: classes.selected }}
              button
              component={props => (
                <NavLink to={`/pinecone/dashboard/test@gmail.com`} {...props} />
              )}
            >
              <ListItemIcon className={classes.iconMenu}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary="Dashboard"
                style={{ color: '#fff' }}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.iconMenu}>
                <i style={{ fontSize: '23px' }} className="fas fa-tasks" />
              </ListItemIcon>
              <ListItemText disableTypography primary="Tasks" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.iconMenu}>
                <People />
              </ListItemIcon>
              <ListItemText disableTypography primary="People" />
            </ListItem>
            <ListItem
              selected={component === 'administration'}
              classes={{ selected: classes.selected }}
              button
              component={props => (
                <NavLink to={'/admin/test@gmail.com'} {...props} />
              )}
            >
              <ListItemIcon className={classes.iconMenu}>
                <Laptop />
              </ListItemIcon>
              <ListItemText disableTypography primary="Administration" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.iconMenu}>
                <Event />
              </ListItemIcon>
              <ListItemText disableTypography primary="Events" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.iconMenu}>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText disableTypography primary="Agencies" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.iconMenu}>
                <CreditCard />
              </ListItemIcon>
              <ListItemText disableTypography primary="Expenses" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.iconMenu}>
                <MailOutline />
              </ListItemIcon>
              <ListItemText disableTypography primary="Mass Email" />
            </ListItem>
          </List>
        </div>
      </div>
    )

    return (
      <div>
        <div className={classes.root}>
          <AppBar
            position="fixed"
            elevation={0}
            className={classNames(classes.appBar)}
          >
            <Toolbar className={classes.toolbar}>
              {!sidebarOpen ? (
                this.state.hide && (
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.openSidebar}
                    className={classNames(
                      classes.menuButton,
                      sidebarOpen && classes.hide,
                    )}
                  >
                    <MenuIcon />
                  </IconButton>
                )
              ) : (
                <IconButton
                  className={classNames(
                    classes.menuButton,
                    classes.menuButtonOpened,
                  )}
                  onClick={this.closeSidebar}
                >
                  <MenuIcon />
                </IconButton>
              )}
              {this.state.hide && (
                <Typography variant="title" noWrap className={classes.title}>
                  {this.props.title}
                </Typography>
              )}
              {!this.state.hide && (
                <div className={classes.itemSearch}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search..."
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                    />
                  </div>
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={this.toggleSearch}
                  >
                    Cancel
                  </Button>
                </div>
              )}
              {this.state.hide && (
                <IconButton color="inherit">
                  <SearchIcon onClick={this.toggleSearch} />
                </IconButton>
              )}
              <Hidden smDown>
                <IconButton color="inherit" className={classes.iconHeader}>
                  <CalendarTodayOutlined />
                </IconButton>
                <IconButton color="inherit" className={classes.iconHeader}>
                  <NotificationsCenter />
                </IconButton>
              </Hidden>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !sidebarOpen && classes.drawerPaperClose,
              ),
            }}
            open={this.state.open}
          >
            {renderMenu}
          </Drawer>
          {/* </Hidden> */}

          <main className={classes.children}>
            <div style={{ height: '100%' }}>{children}</div>
          </main>
        </div>
        <Hidden only={['lg', 'xl']}>
          <BottomNavigation
            value={value}
            onChange={this.handleChange}
            showLabels
            className={classes.bottom}
          >
            <BottomNavigationAction label="Dashboard" icon={<Dashboard />} />
            <BottomNavigationAction
              label="Calendar"
              icon={<CalendarTodayOutlined />}
            />
            <BottomNavigationAction
              label="Notifications"
              icon={<NotificationsCenter />}
            />
          </BottomNavigation>
        </Hidden>
      </div>
    )
  }
}
Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}
export default withStyles(navStyles, { withTheme: true })(Navigation)
