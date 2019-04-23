import React, { Component, Fragment } from 'react'
import {
  Grid,
  List,
  ListItem,
  ListSubheader,
  ListItemSecondaryAction,
  ListItemText,
  withStyles,
  Switch,
  Typography,
} from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PropertyIcon from 'components/PropertyDrawer/PropertyIcon'

const styles = {
  listItem: {
    background: '#fff',
  },
}

class PropertyEdit extends Component {
  state = {
    checked: [],
  }

  handleToggle = value => {
    const { checked: checkedState } = this.state
    const checked = [...checkedState]
    const valueIndex = checked.indexOf(value)

    if (valueIndex !== -1) {
      checked.slice(valueIndex, 1)
    } else {
      checked.push(value)
    }

    this.setState({ checked })
  }

  renderAppearanceItems = () => {
    const {
      editItem: { type },
      classes,
    } = this.props

    if (type === 'picklist' || type === 'phone') {
      return (
        <ListItem className={classes.listItem} button>
          <ListItemText primary="Options" secondary="Yes, No" />
          <ListItemSecondaryAction>
            <Grid container alignItems="center">
              <Typography color="textSecondary" />
              <ChevronRightIcon fontSize="small" />
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
      )
    } else if (type === 'textfield') {
      return (
        <ListItem className={classes.listItem} button>
          <ListItemText primary="Character Limit" />
          <ListItemSecondaryAction>
            <Grid container alignItems="center">
              <Typography color="textSecondary">155</Typography>
              <ChevronRightIcon fontSize="small" />
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
      )
    } else if (type === 'name' || type === 'address' || type === 'multiline') {
      return (
        <ListItem className={classes.listItem} button>
          <ListItemText
            primary="Display Fields"
            secondary="Prifix, First Name, LastName, Suffix"
          />
          <ListItemSecondaryAction>
            <ChevronRightIcon fontSize="small" />
          </ListItemSecondaryAction>
        </ListItem>
      )
    } else if (type === 'time') {
      return (
        <ListItem className={classes.listItem} button>
          <ListItemText primary="Format" />
          <ListItemSecondaryAction>
            <Grid container alignItems="center">
              <Typography color="textSecondary">24 Hour</Typography>
              <ChevronRightIcon fontSize="small" />
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
      )
    } else if (type === 'currency') {
      return (
        <ListItem className={classes.listItem} button>
          <ListItemText primary="Type" />
          <ListItemSecondaryAction>
            <Grid container alignItems="center">
              <Typography color="textSecondary">USD</Typography>
              <ChevronRightIcon fontSize="small" />
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
      )
    }
    return ''
  }

  renderAdditionalEdits = () => {
    const {
      editItem: { type },
      classes,
    } = this.props

    if (type === 'decimal' || type === 'percent' || type === 'currency') {
      return (
        <Fragment>
          <List>
            <ListItem className={classes.listItem} button>
              <ListItemText primary="Digits After Decimal" />
              <ListItemSecondaryAction>
                <Grid container alignItems="center">
                  <Typography color="textSecondary">2</Typography>
                  <ChevronRightIcon fontSize="small" />
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            <li>
              <Typography align="center" variant="body1" color="textSecondary">
                This property will appear in Universal Search results
              </Typography>
            </li>
          </List>
          <List>
            <ListItem className={classes.listItem} button>
              <ListItemText primary="Maximum Digits" />
              <ListItemSecondaryAction>
                <Grid container alignItems="center">
                  <Typography color="textSecondary">5</Typography>
                  <ChevronRightIcon fontSize="small" />
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Fragment>
      )
    } else if (type === 'http') {
      return (
        <List>
          <ListItem className={classes.listItem} button>
            <ListItemText primary="URL" />
            <ListItemSecondaryAction>
              <Grid container alignItems="center">
                <Typography color="textSecondary">
                  https://www.pudahealth.org
                </Typography>
                <ChevronRightIcon fontSize="small" />
              </Grid>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className={classes.listItem} button>
            <ListItemText primary="Display" />
            <ListItemSecondaryAction>
              <Grid container alignItems="center">
                <Typography color="textSecondary">
                  DuHuge Health Department
                </Typography>
                <ChevronRightIcon fontSize="small" />
              </Grid>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      )
    }
    return ''
  }

  render() {
    const { classes, editItem } = this.props
    const { checked } = this.state

    return (
      <div style={{ padding: '20px' }}>
        <Grid
          container
          direction="column"
          spacing={40}
          className={classes.main}
        >
          <List
            subheader={<ListSubheader disableSticky>APPEARANCE</ListSubheader>}
          >
            <ListItem className={classes.listItem} button>
              <ListItemText primary="Label" />
              <ListItemSecondaryAction>
                <Grid container alignItems="center">
                  <Typography color="textSecondary">
                    {editItem.label}
                  </Typography>
                  <ChevronRightIcon fontSize="small" />
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            {this.renderAppearanceItems()}
          </List>

          <List>
            <ListItem className={classes.listItem} button>
              <ListItemText primary="Help Text" />
              <ListItemSecondaryAction>
                <Grid container alignItems="center">
                  <Typography color="textSecondary">Enabled</Typography>
                  <ChevronRightIcon fontSize="small" />
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          {this.renderAdditionalEdits()}

          <List>
            <ListItem className={classes.listItem}>
              <ListItemText primary="Required" />
              <ListItemSecondaryAction>
                <Switch
                  color="primary"
                  onChange={() => this.handleToggle('required')}
                  checked={checked.includes('required')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <li>
              <Typography align="center" variant="body1" color="textSecondary">
                Users will not be able to save if this property is empty
              </Typography>
            </li>
          </List>
          <List>
            <ListItem className={classes.listItem}>
              <ListItemText primary="Index" />
              <ListItemSecondaryAction>
                <Switch
                  color="primary"
                  onChange={() => this.handleToggle('index')}
                  checked={checked.includes('index')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <li>
              <Typography align="center" variant="body1" color="textSecondary">
                This property will appear in Universal Search results
              </Typography>
            </li>
          </List>
          <List subheader={<ListSubheader disableSticky>Icon</ListSubheader>}>
            <ListItem className={classes.listItem} button>
              <PropertyIcon type={editItem.type} fontSize="large" />
              <ListItemSecondaryAction>
                <ChevronRightIcon fontSize="small" />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(PropertyEdit)
