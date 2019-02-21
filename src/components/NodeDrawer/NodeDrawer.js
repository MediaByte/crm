import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

//import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import ClearIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import LocationIcon from '@material-ui/icons/LocationOn'
import PeopleIcon from '@material-ui/icons/People'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import NodeOverview from '../NodeOverview'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
  },
  list: {
    width: '100%',
  },
  listItem: {
    paddingLeft: '15px',
  },
  card: {
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    padding: '20px 5px',
    backgroundColor: theme.palette.background.paper,
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
  avatarIcon: {
    backgroundColor: '#0dacc4',
  },
  itemOption: {
    display: 'flex !important',
    flexDirection: 'column !important',
    right: '10px !important',
  },
  buttomOption: {
    padding: '5px !important',
  },
  drawerPaper: {
    // position: 'relative',
    // backgroundColor: '#E0E0E0',
    // borderRadius: '1px',
    // theme.zIndex.drawer + 1
    zIndex: theme.zIndex.drawer + 1,
    width: '40%',
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
            <KeyboardArrowLeftIcon />
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
        <IconButton
          // onClickAdd={this.toggleAddNodeDialog}
          color="secondary"
          className={classes.buttonAdd}
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '50px',
            backgroundColor: '#f34930',
            color: '#fff',
            transition:
              'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            boxShadow:
              '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
          }}
        >
          <AddIcon />
        </IconButton>
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
          <Grid item xs={12} md={3}>
            <List className={classes.card}>
              <ListItem className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar className={classes.avatarIcon}>
                    <HomeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  onClick={this.handleDrawerOpen}
                  primary="Address"
                  secondary="ADDRESS"
                />
                <ListItemSecondaryAction className={classes.itemOption}>
                  <IconButton
                    aria-label="Edit"
                    className={classes.buttomOption}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    color="secondary"
                    className={classes.buttomOption}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={3}>
            <List className={classes.card}>
              <ListItem className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar className={classes.avatarIcon}>
                    <LocationIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  onClick={this.handleDrawerOpen}
                  primary="Latitude Longitude"
                  secondary="LAT_LONG"
                />
                <ListItemSecondaryAction className={classes.itemOption}>
                  <IconButton
                    aria-label="Edit"
                    className={classes.buttomOption}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    color="secondary"
                    className={classes.buttomOption}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={3}>
            <List className={classes.card}>
              <ListItem className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar className={classes.avatarIcon}>
                    <PeopleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  onClick={this.handleDrawerOpen}
                  primary="People"
                  secondary="PERSON"
                />
                <ListItemSecondaryAction className={classes.itemOption}>
                  <IconButton
                    aria-label="Edit"
                    className={classes.buttomOption}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    color="secondary"
                    className={classes.buttomOption}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
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
