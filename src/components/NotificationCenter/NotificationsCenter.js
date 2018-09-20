import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
const styles = {
  list: {
    width: 270,
  },
  fullList: {
    position: 'absolute',
    bottom: '0',
    width: 270,
  },
  drawerPaper: {
    backgroundColor: '#E0E0E0',
    borderRadius: '1px'
  },
  header: {
    display: 'flex',
    margin: 'auto',
    marginTop: '15px',
    marginBottom: '15px',
    justifyContent: 'center',
  },
  clock: {
    marginRight: '10px'
  },
  date: {
    marginTop: '15px'
  },
  userName: {
    margin: 'auto'
  },
  signOut: {
    margin: 'auto'
  },
  settings: {
    margin: 'auto'
  },
  bottomPanel: {
    display: 'flex',
    margin: 'auto',
  },
  userIcon: {
    fontSize: '35px',
    margin: 'auto'
  },
};
class NotificationsCenter extends React.Component {
  state = {
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
      <div className={classes.header}>
        <div className={classes.clock}>
          <Typography variant={'display1'}>
            3:03
          </Typography>
        </div>       
        <div>
          <Typography className={classes.date} variant={'body1'}>
            Thursday, September 13
          </Typography>
        </div>
      </div>
        <Divider />
      </div>
    );

    const fullList = (
      <div className={classes.fullList}>
        <Divider />
        <div className={classes.bottomPanel}>
          <Icon className={classes.userIcon}>perm_identity</Icon>
          <Typography className={classes.userName} variant={'body1'}>
            John Smith
          </Typography>
          <Typography color='primary' className={classes.signOut} variant={'button'}>
            SIGN OUT
          </Typography>
          <Icon className={classes.settings} style={{ fontSize: '22px' }}>settings</Icon>
        </div>
      </div>
    );

    return (
      <div>
        <IconButton onClick={this.toggleDrawer('right', true)}>
          <Icon>
            vertical_split
          </Icon>
        </IconButton>
        <Drawer 
          anchor="right" 
          open={this.state.right} 
          onClose={this.toggleDrawer('right', false)} 
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div>
            {sideList}
            <List></List>
            {fullList}
          </div>
        </Drawer>
      </div>
    );
  }
}

NotificationsCenter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationsCenter);
