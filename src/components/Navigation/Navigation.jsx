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
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputAdornment from "@material-ui/core/InputAdornment";
//material ui icons
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Search from '@material-ui/icons/Search';
import Laptop from '@material-ui/icons/Laptop';
import People from '@material-ui/icons/People';
import Event from '@material-ui/icons/Event';
import AccountBalance from '@material-ui/icons/AccountBalance';
import CreditCard from '@material-ui/icons/CreditCard';
import MailOutline from '@material-ui/icons/MailOutline';
//projects components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import NotificationsCenter from "components/NotificationCenter/NotificationsCenter.js";
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

class Navigation extends React.Component {
  state = {
    disableUnderline: true
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
  handleInputFocus = () => {
    this.setState({ disableUnderline: false })
    document.getElementById("search").focus()
  };
  handleInputBlur = () => {
    this.setState({ disableUnderline: true })
  }
  render() {
    const { classes, children, component } = this.props;
    return (
      <React.Fragment>
        <CssBaseline/>
        <div className={classes.root}>
          <AppBar
            position="absolute"
            elevation={0}
            className={classNames(classes.appBar, this.props.open && classes.appBarShift)}
          >
            <Toolbar variant={'dense'} disableGutters={true} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton, 
                  this.props.open && classes.hide)}
              >
                <MenuIcon style={{ fontSize: '30px', fontWeight: 500}} />
              </IconButton>

                <Typography variant="title" noWrap className={classes.title}></Typography>
                
                <CustomInput
                  id="search"
                  inputProps={{
                    className: classes.headerInput,
                    disableUnderline: this.state.disableUnderline,
                    type: "text",
                    onChange: (e) => console.log(e.target.value),
                    onFocus: this.handleInputFocus,
                    onBlur: this.handleInputBlur,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton color="inherit">
                          <Search onClick={this.handleInputFocus} style={{fontSize: 25}}/>
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
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
            <div>
              <IconButton 
                className={classNames(classes.menuButtonOpened, !this.props.open && classes.hide)} 
                onClick={this.handleDrawerClose}
              >
                <KeyboardArrowLeft />
              </IconButton>
            </div>
            <List 
              className={classes.drawerList}
              style={this.props.open ? {marginTop: -24} : null}
            >
              <Divider className={classNames(classes.menuDivider, this.props.open && classes.menuDividerOpened)} />
              <ListItem 
                button
                style={ component === 'dashboard' 
                  ? { color: 'grey', backgroundColor: 'white', borderRadius:'5px', border: '2px solid #00000'}
                  : { color: "#fff" }  
                } 
                component={(props) => <NavLink to={`/pinecone/dashboard/test@gmail.com`} {...props}/>}
              >
                <ListItemIcon>
                  <Dashboard 
                  style={ component === 'dashboard' 
                    ? {color: 'grey', fontSize: '30px', fontWeight: 500}
                    : {color: '#fff', fontSize: '30px', fontWeight: 500}
                  }
                  />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="Dashboard" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <i style={{color: '#fff', fontSize: '30px'}} className="fas fa-tasks"></i>
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="Tasks" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <People style={{color: '#fff', fontSize: '30px', fontWeight: 500}}/>
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="People" />
              </ListItem>
              <ListItem 
                button
                style={ component === 'administration' 
                  ? { color: 'grey', backgroundColor: 'white', borderRadius:'5px', border: '2px solid #00000', fontSize: '30px', fontWeight: 500 }
                  : { color: "#fff", fontSize: '30px' , fontWeight: 500}  
                }        
                component={(props) => <NavLink to={'/admin/test@gmail.com'} {...props}/>}

              >
                <ListItemIcon>
                  <Laptop 
                    style={ component === 'administration' 
                      ? {color: 'grey', fontSize: '30px', fontWeight: 500}
                      : {color: '#fff', fontSize: '30px', fontWeight: 500}
                    }
                    />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="Administration" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Event style={{color: '#fff', fontSize: '30px', fontWeight: 500}}/>
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="Events" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AccountBalance style={{color: '#fff', fontSize: '30px', fontWeight: 500}}/>
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="Agencies" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CreditCard style={{color: '#fff', fontSize: '30px', fontWeight: 500}}/>
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="Expenses" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <MailOutline style={{color: '#fff', fontSize: '30px', fontWeight: 500}}/>
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="Mass Email" />
              </ListItem>
            </List>
          </Drawer>
            <main className={classes.children}>
                {children}
            </main>
        </div>
      </React.Fragment>
    );
  }
}
Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(navStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Navigation));