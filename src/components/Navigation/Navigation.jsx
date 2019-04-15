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
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'

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
import NotificationsOutlined from '@material-ui/icons/NotificationsOutlined'

//projects components
import NotificationsCenter from 'components/NotificationCenter/NotificationsCenter.js'
// @ts-ignore
import Logo from 'assets/img/crmLogo.png'
//styles
import navStyles from 'components/Navigation/navStyle.js'

import { nameToIconMap } from 'common/NameToIcon'

const DASHBOARD = 0
const CALENDAR = 1
const NOTIFICATIONS = 2

/**
 * @typedef {object} SearchResult
 * @prop {string} displayText
 * @prop {string} nodeName
 * @prop {string=} iconName
 * @prop {React.Key} key
 */

/**
 * @typedef {object} Props
 * @prop {Classes} classes
 * @prop {'administration'|'dashboard'} component
 * @prop {import('@material-ui/core/styles/createBreakpoints').Breakpoint} width
 * @prop {((text: string) => void)=} onSearchBoxChange
 * @prop {(SearchResult[])=} searchResults
 * @prop {(boolean|null|undefined)=} isLoadingSearchResults
 * @prop {string} title
 */

/**
 * @typedef {object} State
 * @prop {boolean} searchBoxOpen
 * @prop {boolean} sidebarOpen
 * @prop {number} value
 * @prop {boolean} disableUnderline
 * @prop {HTMLElement|null} searchResultsAnchor
 * @prop {boolean} searchBoxFocused
 * @prop {string} searchBoxCurrentText
 * @prop {boolean} drawerOpen
 * @prop {boolean} notificationsOpen
 */

/**
 * @augments React.Component<Props, State>
 */
class Navigation extends React.Component {
  searchBoxRef = React.createRef()

  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props)

    /**
     * @type {State}
     */
    this.state = {
      disableUnderline: true,
      value: 0,
      sidebarOpen: false,
      searchBoxOpen: isWidthUp('lg', props.width),
      searchResultsAnchor: null,
      searchBoxFocused: false,
      searchBoxCurrentText: '',
      drawerOpen: false,
      notificationsOpen: false,
    }
  }

  /**
   * @param {Props} prevProps
   */
  componentDidUpdate(prevProps) {
    const prevWidth = prevProps.width

    const newWidth = this.props.width

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

  onFocusSearchBox = () => {
    this.setState({
      searchBoxFocused: true,
    })
  }

  toggleSearch = () => {
    this.setState(
      ({ searchBoxOpen }) => ({
        searchBoxOpen: !searchBoxOpen,
      }),
      () => {
        const isTabletOrSmaller = isWidthDown('md', this.props.width)
        const searchBoxWasOpened = this.state.searchBoxOpen

        if (isTabletOrSmaller && searchBoxWasOpened) {
          // this.searchBoxRef.current.focus()
        }
      },
    )
  }

  toggleNotifications = () => {
    this.setState(({ notificationsOpen }) => ({
      notificationsOpen: !notificationsOpen,
    }))
  }

  /**
   * @param {any} _
   * @param {number} value
   * @returns {JSX.Element|void}
   */
  handleChange = (_, value) => {
    switch (value) {
      case DASHBOARD:
        this.setState({ value })
        return <Redirect to="/pinecone/dashboard/test@gmail.com" />

      case CALENDAR:
        this.setState({ value })
        return <Redirect to="/pinecone/dashboard/test@gmail.com" />

      case NOTIFICATIONS:
        this.toggleNotifications()
        break

      default:
        throw new Error("Shouldn't be reachable")
    }
  }

  onBlurSearchBox = () => {
    this.setState({
      searchBoxFocused: false,
    })
  }

  /**
   * @type {import('@material-ui/core/InputBase').InputBaseProps['onChange']}
   */
  onChangeSearchBox = e => {
    const { onSearchBoxChange } = this.props

    /** @type {string} */
    // @ts-ignore
    const txt = e.target.value

    this.setState(
      {
        searchBoxCurrentText: txt,
      },
      () => {
        if (onSearchBoxChange) {
          onSearchBoxChange(this.state.searchBoxCurrentText)
        }
      },
    )
  }

  render() {
    const {
      classes,
      children,
      component,
      isLoadingSearchResults,
      searchResults,
      width,
      title,
    } = this.props

    const {
      drawerOpen,
      searchBoxFocused,
      searchBoxOpen,
      sidebarOpen,
      value,
      searchBoxCurrentText,
      notificationsOpen,
    } = this.state

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
                // @ts-ignore
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

            <ListItem
              selected={component === 'administration'}
              classes={{ selected: classes.selected }}
              button
              component={props => (
                // @ts-ignore
                <NavLink to={'/admin/test@gmail.com'} {...props} />
              )}
            >
              <ListItemIcon className={classes.iconMenu}>
                <Laptop />
              </ListItemIcon>
              <ListItemText disableTypography primary="Administration" />
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
                  {title}
                </Typography>
              )}

              {searchBoxOpen && (
                <div>
                  {!isBigScreen && <Backdrop open={true} />}
                  <div className={classes.itemSearch}>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        autoFocus={!isBigScreen}
                        placeholder="Search..."
                        inputRef={this.searchBoxRef}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        onFocus={this.onFocusSearchBox}
                        onBlur={this.onBlurSearchBox}
                        onChange={this.onChangeSearchBox}
                        value={searchBoxCurrentText}
                      />
                    </div>

                    {searchBoxCurrentText && (
                      <Paper
                        className={classNames(
                          classes.searchResultsHolder,
                          !searchBoxFocused && classes.hidden,
                        )}
                      >
                        {isLoadingSearchResults ? (
                          <Typography>Show spinner here</Typography>
                        ) : (
                          <List>
                            {searchResults && searchResults.length ? (
                              searchResults.map(sr => {
                                const icon = nameToIconMap[sr.iconName || '']
                                const SRIcon = icon && icon.outlined

                                return (
                                  <ListItem button>
                                    {SRIcon && (
                                      <Avatar>
                                        <SRIcon />
                                      </Avatar>
                                    )}
                                    <ListItemText
                                      primary={sr.displayText}
                                      secondary={sr.nodeName}
                                    />
                                  </ListItem>
                                )
                              })
                            ) : (
                              <ListItem>
                                <ListItemText primary="No results found" />
                              </ListItem>
                            )}
                          </List>
                        )}
                      </Paper>
                    )}

                    <Hidden lgUp>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={this.toggleSearch}
                      >
                        Cancel
                      </Button>
                    </Hidden>
                  </div>
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
                <IconButton
                  color="inherit"
                  className={classes.iconHeader}
                  onClick={this.toggleNotifications}
                >
                  <NotificationsOutlined />
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
            open={drawerOpen}
          >
            {renderMenu}
          </Drawer>

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
              icon={<NotificationsOutlined />}
            />
          </BottomNavigation>
        </Hidden>

        <NotificationsCenter
          onClose={this.toggleNotifications}
          open={notificationsOpen}
        />
      </React.Fragment>
    )
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}
/**
 * @typedef {keyof ReturnType<typeof navStyles>} ClassNames
 * @typedef {Record<ClassNames, string>} Classes
 */

export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {import('@material-ui/core/styles').StyleRulesCallback<ClassNames>} */ (navStyles),
  // @ts-ignore -_- I don't even know why I have to ignore here
)(withWidth()(Navigation))
