import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditOutlineIcon from '@material-ui/icons/EditOutlined'

import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'

import { propertyItems } from './mocks'
import PropertyDrawer from '../PropertyDrawer'
import PropertyIcon from '../PropertyDrawer/PropertyIcon'

const styles = ({ custom: { smallIconButton }, ...theme }) => ({
  root: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 4,
    width: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 2,
    },
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
  smallIconButton,
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

const usedPropertyItems = propertyItems.filter(p => !p.unused)

class NodeDrawer extends React.Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    const { open } = this.state

    return (
      <div>
        <Grid container className={classes.root}>
          {usedPropertyItems.map(item => (
            <Grid item xs={12} md={3} key={item.id}>
              <List className={classes.card}>
                <ListItem className={classes.listItem}>
                  <ListItemAvatar>
                    <PropertyIcon type={item.type} />
                  </ListItemAvatar>
                  <ListItemText
                    onClick={this.handleDrawerOpen}
                    primary={item.name}
                    secondary={item.label}
                  />
                  <ListItemSecondaryAction className={classes.itemOption}>
                    <IconButton
                      aria-label="Edit"
                      className={classes.smallIconButton}
                      onClick={this.props.onclickEditNode}
                    >
                      <EditOutlineIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      color="secondary"
                      className={classes.smallIconButton}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Grid>
          ))}
        </Grid>
        <PropertyDrawer
          open={open}
          propertyItems={propertyItems}
          handleClose={this.handleDrawerClose}
        />
      </div>
    )
  }
}

NodeDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NodeDrawer)
