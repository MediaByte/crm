import React from 'react';
import PropTypes from 'prop-types';
//npm package for concatenating classes
import classNames from 'classnames';
//react router
import { NavLink } from 'react-router-dom'
//Material-ui components
import Dashboard from '@material-ui/icons/Dashboard';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Business from '@material-ui/icons/Business';
import CssBaseline from '@material-ui/core/CssBaseline';
import TrendingUp from '@material-ui/icons/TrendingUp';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import Laptop from '@material-ui/icons/Laptop';
import Today from '@material-ui/icons/Today';
import Map from '@material-ui/icons/Map';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
//material ui icons
import MenuIcon from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import MoreVert from '@material-ui/icons/MoreVert'
//projects components
import CustomInput from "components/CustomInput/CustomInput.jsx";
//styles
import navStyles from 'assets/jss/material-kit-pro-react/components/navStyle.js';
class Navigation extends React.Component {
  state = {
    open: false,
    disableUnderline: true
  };
  componentDidMount() {
    const { closed } = this.props;
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
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
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar variant={'dense'} disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton, 
                  this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
                <Typography variant="title" color="black" noWrap className={classes.title}></Typography>

                <CustomInput
                  id="search"
                  inputProps={{
                    className: classes.headerInput,
                    disableUnderline: this.state.disableUnderline,
                    type: "text",
                    onChange: (e) => console.log(e),
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
              <IconButton>
                <MoreVert/>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div>
              <IconButton 
                className={classNames(classes.menuButtonOpened, !this.state.open && classes.hide)} 
                onClick={this.handleDrawerClose}
              >
                <Close />
              </IconButton>
            </div>
            <List 
              className={classes.drawerList}
              style={this.state.open ? {marginTop: -24} : null}
            >
              <ListItem 
                button
                style={ component === 'dashboard' 
                  ? { color: 'grey', backgroundColor: 'white', borderRadius:'5px', border: '2px solid #00A7F8' }
                  : { color: "#fff" }  
                } 
                component={(props) => <NavLink to={'/dashboard/test@gmail.com'} {...props}/>}
              >
                <ListItemIcon>
                  <Dashboard 
                  style={ component === 'dashboard' 
                    ? {color: 'grey'}
                    : {color: '#fff'}
                  }
                  />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="Dashboard" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Today style={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="Calendar" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Map style={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="Map" />
              </ListItem>
              <ListItem 
                button
                style={ component === 'administration' 
                  ? { color: 'grey', backgroundColor: 'white', borderRadius:'5px', border: '2px solid #00A7F8' }
                  : { color: "#fff" }  
                }        
                component={(props) => <NavLink to={'/admin/test@gmail.com'} {...props}/>}

              >
                <ListItemIcon>
                  <Laptop 
                    style={ component === 'administration' 
                      ? {color: 'grey'}
                      : {color: '#fff'}
                    }
                    />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="Administration" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <PlaylistAddCheck style={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="Inspections" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <TrendingUp style={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="Reports" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Business style={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "title", color: "inherit" }} primary="Establishments" />
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
export default withStyles(navStyles, { withTheme: true })(Navigation);