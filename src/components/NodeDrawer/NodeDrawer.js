import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

//import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import ClearIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'
// import NodeOverview from 'components/NodeOverview'
// import Fab from 'material-ui/core/Fab'

import NodeOverview from '../NodeOverview'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme => ({
  root: {
    padding: '15px',
    margin: theme.spacing.unit,
  },
  list: {
    width: '100%',
  },
  buttomStyle: {
    margin: theme.spacing.unit,
    '&:hover': {
      backgroundColor: '#0dacc4',
      borderColor: '#0dacc4',
      color: '#fff',
    },
    '&:active': {
      backgroundColor: '#0dacc4',
      borderColor: '#0dacc4',
      color: '#fff',
    },
  },
  fullList: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
  },
  drawerPaper: {
    // position: 'relative',
    // backgroundColor: '#E0E0E0',
    // borderRadius: '1px',
    // theme.zIndex.drawer + 1
    zIndex: theme.zIndex.drawer + 1,
    width: '65%',
    borderLeft: '1px solid #eee',
  },
  header: {
    margin: 'auto',
    display: 'flex',
    backgroundColor: '#0dacc4',
    padding: '12px 5px',
    justifyContent: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 9,
    left: 5,
    color: '#fff',
  },
  titleHeader: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '28px',
    color: '#fff',
    textAlign: 'center',
  },
  date: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: '5px',
    },
    margin: 'auto',
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '17px',
  },
  signOut: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
    fontFamily: '"Montserrat", sans-serif',
    cursor: 'pointer',
  },
  bottomPanel: {
    display: 'flex',
  },
  userIcon: {
    fontSize: '45px',
    margin: 'auto',
    marginLeft: '20px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
})

const nodeOverviewProps = {
  iconName: 'calendar',
  identifier: 'PRSN-0001',
  label: 'People',
  name: 'PERSON',
  properties: [
    {
      name: 'Name',
      type: 'textfield',
    },
    {
      name: 'Phone',
      type: 'textfield',
    },
    {
      name: 'Billing Address',
      type: 'address',
    },
  ],
  relationships: [
    {
      name: 'Works At',
      relatedNodeName: 'Establishment',
    },
    {
      name: 'Owns',
      relatedNodeName: 'Vehicle',
    },
    {
      name: 'Drives',
      relatedNodeName: 'Vehicle',
    },
  ],
}

class NodeDrawer extends React.Component {
  state = {
    open: false,
    right: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  // toggleDrawer = (side, open) => () => {
  //   this.setState({
  //     [side]: open,
  //   })
  // }
  render() {
    const { classes } = this.props
    const { open } = this.state

    const header = (
      <div className={classes.list}>
        <GridContainer className={classes.header}>
          <IconButton
            onClick={this.handleDrawerClose}
            className={classes.closeIcon}
            aria-label="Close"
          >
            <ClearIcon />
          </IconButton>
          <GridItem xs={12} sm={3}>
            <Typography className={classes.titleHeader}>People</Typography>
          </GridItem>
        </GridContainer>
        <Divider />
      </div>
    )

    const bodyDrawer = (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item>
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              className={classes.buttomStyle}
            >
              Properties
            </Button>
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              className={classes.buttomStyle}
            >
              RelationShip
            </Button>
          </Grid>
        </Grid>
      </div>
    )
    // const footer = (
    //   <div className={classes.fullList}>
    //     <Divider />
    //     <GridContainer className={classes.bottomPanel}>
    //       <GridItem xs={6}>
    //         <ClearIcon className={classes.userIcon} />
    //       </GridItem>
    //       <GridItem xs={6} className={classes.signOut}>
    //         <Typography
    //           className={classes.signOut}
    //           color="primary"
    //           variant={'button'}
    //         >
    //           SIGN OUT
    //         </Typography>
    //       </GridItem>
    //     </GridContainer>
    //   </div>
    // )

    return (
      <div>
        {/* <IconButton onClick={this.toggleDrawer('right', true)}> */}
        {/* <Card className={classes.card} onClick={this.handleDrawerOpen}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant="h5" component="h2">
              be lent
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              adjective
            </Typography>
            <Typography component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card> */}
        <Grid container className={classes.root}>
          <Grid item>
            <div className={classes.demo}>
              <List>
                <ListItem onClick={this.handleDrawerOpen}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Single-line item" />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
        {/* </IconButton> */}
        <Drawer
          anchor="right"
          open={open}
          variant="persistent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div>
            {header}
            {bodyDrawer}
            <NodeOverview {...nodeOverviewProps} />
            {/* {footer} */}
          </div>
        </Drawer>
      </div>
    )
  }
}

NodeDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NodeDrawer)
