import React from 'react';
import PropTypes from 'prop-types';
//npm package for concatenating classes
import classNames from 'classnames';
//react router
import { NavLink, Link, Redirect } from 'react-router-dom'
//Material-ui components
import Hidden from '@material-ui/core/Hidden';
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
import navStyles from 'assets/jss/material-kit-pro-react/components/navStyleColumn.js';

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

class NavigationColumn extends React.Component {
  state = {
    disableUnderline: true,
    value: 0,
    mobileOpen: false
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

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleChange = (event, value) => {
    console.log('handleChange', value);
    let page;
    switch (value) {
      case 0:
        page = '/pinecone/dashboard/test@gmail.com'
      case 1:
        page = '/admin/test@gmail.com'
      default:
        page = '/admin/test@gmail.com'
        break
    }
    console.log('page', page);
    
    this.setState({ value });
    return <Redirect to={page} />
  };

  render() {
    const { classes, children, component } = this.props;
    const { value } = this.state;

    const renderMenu = (
      <div>
      <div className={classes.toolbar}>
        <Link to='/pinecone/dashboard/test@gmail.com' className={classes.toolbarLink}><img width={25} src={Logo} alt={'Sign in to continue'} className={classes.imgLogo}/></Link>
        <IconButton 
          className={classNames(classes.menuButtonMobile)} 
          onClick={this.handleDrawerClose}
          style={{color: "#fff"}}
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
          <ListItemText disableTypography primary="Dashboard" style={{color: "#fff"}} />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classes.iconMenu}>
            <i style={{fontSize: '23px'}} className="fas fa-tasks"></i>
          </ListItemIcon>
          <ListItemText disableTypography primary="Tasks" />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classes.iconMenu}>
            <People/>
          </ListItemIcon>
          <ListItemText disableTypography primary="People" />
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
          <ListItemText disableTypography primary="Administration" />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classes.iconMenu}>
            <Event/>
          </ListItemIcon>
          <ListItemText disableTypography primary="Events" />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classes.iconMenu}>
            <AccountBalance/>
          </ListItemIcon>
          <ListItemText disableTypography primary="Agencies" />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classes.iconMenu}>
            <CreditCard/>
          </ListItemIcon>
          <ListItemText disableTypography primary="Expenses" />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classes.iconMenu}>
            <MailOutline/>
          </ListItemIcon>
          <ListItemText disableTypography primary="Mass Email" />
        </ListItem>
      </List>
      </div>
      </div>
    );

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
                <IconButton>
                  <MenuIcon style={{visibility: 'hidden'}} />
                </IconButton>
                {/* <SearchField /> */}
            </Toolbar>
          </AppBar>
          {/* <Hidden smUp>
            <Drawer
              variant="persistent"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
              }}
              open={this.state.open}
            >
              {renderMenu}
            </Drawer>
          </Hidden> */}
          {/* <Hidden smDown implementation="css"> */}
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
              }}
              open={this.state.open}
            >
              {renderMenu}
            </Drawer>
          {/* </Hidden> */}
            
            <main className={classes.children}>
              <div style={{height: "100%"}}>
                {children}
              </div>
            </main>
          </div>
          <BottomNavigation
            value={value}
            onChange={this.handleChange}
            showLabels
            className={classes.bottom}
          >
            <BottomNavigationAction to='/' label="Dashboard" icon={<Dashboard />} />
            <BottomNavigationAction component={(props) => <button><Link to={`/admin/test@gmail.com`} {...props}/></button>} label="Calendar" icon={<Event/>} />
            <BottomNavigationAction label="Search" icon={<SearchIcon />} />
            <BottomNavigationAction label="Notifications" icon={<NotificationsCenter />} />
          </BottomNavigation>
        </div>
    );
  }
}
NavigationColumn.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(navStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(NavigationColumn));