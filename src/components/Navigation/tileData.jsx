import React from 'react';
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
//project views

//react router
import { NavLink } from 'react-router-dom'

export const navItems = (
  <div>
    <ListItem 
      button 
      component={(props) => <NavLink to={'/dashboard/test@gmail.com'} style={{color: "#fff"}} {...props}/>}
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
      component={(props) => <NavLink to={'/admin/test@gmail.com'} 
      style={{
        color: "#fff"
      }} {...props}/>}
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
  </div>
);