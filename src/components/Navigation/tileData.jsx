import React from 'react';
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

export const navItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Dashboard style={{color: '#fff'}}/>
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ variant: "Headline",  }} primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Today style={{color: '#fff'}}/>
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ variant: "Headline",  }} primary="Calendar" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Map style={{color: '#fff'}}/>
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ variant: "Headline",  }} primary="Map" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Laptop style={{color: '#fff'}}/>
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ variant: "Headline",  }} primary="Administration" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PlaylistAddCheck style={{color: '#fff'}}/>
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ variant: "Headline",  }} primary="Inspections" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <TrendingUp style={{color: '#fff'}}/>
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ variant: "Headline",  }} primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Business style={{color: '#fff'}}/>
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ variant: "Headline",  }} primary="Establishments" />
    </ListItem>
  </div>
);