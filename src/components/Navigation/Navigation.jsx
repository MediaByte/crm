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
import Grid from '@material-ui/core/Grid'
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
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth'
import Backdrop from '@material-ui/core/Backdrop'

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
  constructor(props) {
    super(props)

    this.state = {
      disableUnderline: true,
      value: 0,
      sidebarOpen: false,
      searchBoxOpen: isWidthUp('lg', props.width),
    }
  }

  componentDidUpdate({ width: prevWidth }) {
    const { width: newWidth } = this.props

    if (prevWidth === newWidth) return

    const isBigScreen = isWidthUp('lg', newWidth)

    if (isBigScreen) {
      this.setState({
        searchBoxOpen: true,
      })
    }
    // if we go from big to small screen close the searchbox
    else if (this.state.searchBoxOpen) {
      this.setState({
        searchBoxOpen: false,
      })
    }
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
    this.setState(({ searchBoxOpen }) => ({
      searchBoxOpen: !searchBoxOpen,
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

  onBlurSearchBox = () => {
    this.setState((_, { width }) => {
      if (isWidthDown('md', width)) {
        return {
          searchBoxOpen: false,
        }
      }

      return null
    })
  }

  render() {
    const { classes, children, component, width } = this.props
    const { searchBoxOpen, sidebarOpen, value } = this.state

    const isBigScreen = isWidthUp('lg', width)

    const shouldRenderTitle = isBigScreen || !searchBoxOpen

    const shouldRenderMenuButton = (() => {
      const isBigScreen = isWidthUp('lg', width)
      const searchBoxClosed = !searchBoxOpen

      // will always be rendered on big screens because both search box
      // and menu wont overlap
      if (isBigScreen) return true

      if (sidebarOpen && isBigScreen) return true

      // render on small screens if search box is closed
      if (searchBoxClosed) return true

      return false
    })()

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
      <React.Fragment>
        <Grid className={classes.appbarAndContentContainer}>
          <AppBar
            position="fixed"
            elevation={0}
            className={classNames(classes.appBar)}
          >
            <Toolbar className={classes.toolbar}>
              {shouldRenderMenuButton && (
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={sidebarOpen ? this.closeSidebar : this.openSidebar}
                  className={classNames(
                    classes.menuButton,
                    sidebarOpen && classes.menuButtonOpened,
                  )}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {shouldRenderTitle && (
                <Typography variant="title" noWrap className={classes.title}>
                  {this.props.title}
                </Typography>
              )}

              {searchBoxOpen && (
                <div
                  className={classNames(
                    classes.itemSearch,
                    searchBoxOpen && !isBigScreen && classes.onTopOfBackdrop,
                  )}
                >
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      autoFocus={!isBigScreen}
                      placeholder="Search..."
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      onBlur={this.onBlurSearchBox}
                    />
                  </div>
                  <Hidden lgUp>
                    <Button
                      color="primary"
                      className={classes.button}
                      onClick={this.toggleSearch}
                    >
                      Cancel
                    </Button>
                  </Hidden>
                </div>
              )}

              {!searchBoxOpen && (
                <IconButton color="inherit">
                  <SearchIcon onClick={this.toggleSearch} />
                </IconButton>
              )}

              <Hidden mdDown>
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
        </Grid>
        <Hidden lgUp>
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
        {searchBoxOpen && !isBigScreen && (
          <Backdrop open={true} className={classes.searchBackdrop} />
        )}
      </React.Fragment>
    )
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(navStyles, { withTheme: true })(
  withWidth()(Navigation),
)
