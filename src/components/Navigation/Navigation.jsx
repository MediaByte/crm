import React from 'react';
import PropTypes from 'prop-types';
//npm package for concatenating classes
import classNames from 'classnames';
//react router
import { NavLink } from 'react-router-dom'
//Material-ui components
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Dashboard from '@material-ui/icons/Dashboard';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

//material ui icons
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Laptop from '@material-ui/icons/Laptop';
import People from '@material-ui/icons/People';
import Event from '@material-ui/icons/Event';
import AccountBalance from '@material-ui/icons/AccountBalance';
import CreditCard from '@material-ui/icons/CreditCard';
import MailOutline from '@material-ui/icons/MailOutline';


//projects components
import SearchField from 'components/Navigation/SearchField.jsx'
import NotificationsCenter from "components/NotificationCenter/NotificationsCenter.js";
import Logo from 'assets/img/crmLogo.png'
//styles
import navStyles from 'assets/jss/material-kit-pro-react/components/navStyle.js';

//State
import { connect } from 'react-redux';
import { drawerState } from 'state/App/actions.js';
const mapStateToProps = (state) => {
  console.log(state)
  return {
    open: state.sideBar.open
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawer: (event) => dispatch(drawerState(event)),
  }
}

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
		bottom: 0,
		zIndex: 1
  },
};

class Navigation extends React.Component {
  state = {
    disableUnderline: true,
    value: 0
  };
  componentDidMount() {
    // const { closed } = this.props;
  }
  handleDrawerOpen = () => {
    this.props.toggleDrawer(true);
  };
  handleDrawerClose = () => {
    this.props.toggleDrawer(false);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes, children, component } = this.props;
    const { value } = this.state;
    return (
        <div>
        <div className={classes.root}>
          <AppBar
            position="fixed"
            elevation={0}
            className={classNames(classes.appBar, this.props.open && classes.appBarShift)}
          >
            <Toolbar className={classes.toolbar}>
              {!this.props.open ? (
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton, 
                    this.props.open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <IconButton 
                  className={classNames(classes.menuButton, classes.menuButtonOpened)} 
                  onClick={this.handleDrawerClose}
                >
                  <MenuIcon />
                </IconButton>
              )}

                <Typography variant="title" noWrap className={classes.title}>{this.props.title}</Typography>
                <SearchField />
                <div className={classes.grow} />
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                    />
                  </div>
              <NotificationsCenter />
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <img width={25} src={Logo} alt={'Sign in to continue'} className={classes.imgLogo}/>
              <IconButton 
                className={classNames(classes.menuButtonMobile)} 
                onClick={this.handleDrawerClose}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <div>
            <Divider />
            <List
              className={classes.drawerList}
              style={{marginTop: -8}}
            >
              <ListItem 
                selected={component === 'dashboard'}
                classes={{ selected: classes.selected }}
                button
                component={(props) => <NavLink to={`/pinecone/dashboard/test@gmail.com`} {...props}/>}
              >
                <ListItemIcon className={classes.iconMenu}>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button>
                <ListItemIcon className={classes.iconMenu}>
                  <i style={{fontSize: '23px'}} className="fas fa-tasks"></i>
                </ListItemIcon>
                <ListItemText primary="Tasks" />
              </ListItem>
              <ListItem button>
                <ListItemIcon className={classes.iconMenu}>
                  <People/>
                </ListItemIcon>
                <ListItemText primary="People" />
              </ListItem>
              <ListItem 
                selected={component === 'administration'}
                classes={{ selected: classes.selected }}
                button
                component={(props) => <NavLink to={'/admin/test@gmail.com'} {...props}/>}
              >
                <ListItemIcon className={classes.iconMenu}>
                  <Laptop />
                </ListItemIcon>
                <ListItemText primary="Administration" />
              </ListItem>
              <ListItem button>
                <ListItemIcon className={classes.iconMenu}>
                  <Event/>
                </ListItemIcon>
                <ListItemText primary="Events" />
              </ListItem>
              <ListItem button>
                <ListItemIcon className={classes.iconMenu}>
                  <AccountBalance/>
                </ListItemIcon>
                <ListItemText primary="Agencies" />
              </ListItem>
              <ListItem button>
                <ListItemIcon className={classes.iconMenu}>
                  <CreditCard/>
                </ListItemIcon>
                <ListItemText primary="Expenses" />
              </ListItem>
              <ListItem button>
                <ListItemIcon className={classes.iconMenu}>
                  <MailOutline/>
                </ListItemIcon>
                <ListItemText primary="Mass Email" />
              </ListItem>
            </List>
            </div>
          </Drawer>
            <main className={classes.children}>
              <div>
                {children}
              </div>
            </main>
          </div>
          <BottomNavigation
            value={value}
            onChange={this.handleChange}
            // showLabels
            className={classes.bottom}
          >
            <BottomNavigationAction component={(props) => <NavLink to={`/pinecone/dashboard/test@gmail.com`} {...props}/>} label="Dashboard" icon={<Dashboard />} />
            <BottomNavigationAction label="Agencies" icon={<AccountBalance/>} />
            <BottomNavigationAction label="Events" icon={<Event/>} />
          </BottomNavigation>
        </div>
    );
  }
}
Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(navStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Navigation));