import React from 'react';
import PropTypes from 'prop-types';
//npm package for concatenating classes
import classNames from 'classnames';
//react router
import { NavLink } from 'react-router-dom'
//Material-ui components
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dashboard from '@material-ui/icons/Dashboard';
import Business from '@material-ui/icons/Business';
import TrendingUp from '@material-ui/icons/TrendingUp';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import Laptop from '@material-ui/icons/Laptop';
import Today from '@material-ui/icons/Today';
import Map from '@material-ui/icons/Map';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
//material ui icons
import MenuIcon from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import AccountCircle from '@material-ui/icons/AccountCircle'
//projects components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
//styles
import navStyles from 'assets/jss/material-kit-pro-react/components/navStyle.js';
class Navigation extends React.Component {
  state = {
    open: false,
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.root}>
        <div
          style={{position: "fixed"}}
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              aria-label="Menu"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </div>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton 
              className={classNames(classes.menuButtonOpened, !this.state.open && classes.hide)} 
              onClick={this.handleDrawerClose}
            >
              <Close />
            </IconButton>
          </div>
          <List className={classes.drawerList}>
            <ListItem 
              button
              style={{color: "#fff"}} 
              component={(props) => <NavLink to={'/dashboard/test@gmail.com'} {...props}/>}
            >
              <ListItemIcon>
                <Dashboard style={{color: '#fff'}}/>
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
              component={(props) => <NavLink to={'/admin/test@gmail.com'} style={{color: "#fff"}} {...props}/>}
            >
              <ListItemIcon>
                <Laptop style={{color: '#fff'}}/>
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
        <main className={classes.content}>
          <GridContainer>
            <GridItem xs={1} sm={1} md={1} lg={1}/>
            <GridItem xs={7} sm={8} md={8} lg={8}>
              <CustomInput
                id="search"
                inputProps={{
                  className: classes.headerInput,
                  placeholder: "Search",
                  type: "text",
                  onChange: (e) => console.log(e),
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search style={{fontSize: 25}}/>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Clear style={{fontSize: 12}} />
                    </InputAdornment>
                  )
                }}
              />
            </GridItem>
            <GridItem xs={1} sm={1} md={1} lg={1}  />
            <GridItem xs={1} sm={1} md={1} lg={1}>
              <IconButton
                color="inherit"
              >
                <AccountCircle style={{fontSize: 35}} />
              </IconButton>
            </GridItem>
          </GridContainer>
          <div>
            {children}
          </div>
        </main>
      </div>
    );
  }
}
Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(navStyles, { withTheme: true })(Navigation);