import React from 'react'

import { withStyles } from '@material-ui/core/styles'
/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRules<K>} StyleRules
 */

import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'

import { NavLink } from 'react-router-dom'
/**
 * @typedef {import('react-router-dom').NavLinkProps} NavLinkProps
 */

import getInitialsFromName from './getInitialsFromName'

const styles = {
  root: {
    width: '100%',
  },
}

/**
 * This will probably get passed an id prop in the future
 * @type {React.SFC<NavLinkProps>}
 */
const ItemNavLink = props => <NavLink to={'/management/employees'} {...props} />

/**
 * @typedef {object} UsersListItemProps
 * @prop {StyleRules<keyof styles>} classes Do not pass this prop, as this is
 * injected by material-ui's withStyles
 * @prop {string} employeeRole Role of the user
 * @prop {string} name Name of the user
 */

/**
 * @augments React.PureComponent<UsersListItemProps>
 */
class UsersListItem extends React.PureComponent {
  render() {
    const { classes, employeeRole, name } = this.props

    return (
      <ListItem className={classes.root} component={ItemNavLink}>
        <ListItemAvatar>
          <Avatar>{getInitialsFromName(name)}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={employeeRole} />
        <ListItemSecondaryAction>
          <IconButton>
            <KeyboardArrowRight />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

/**
 * A pure component that can be used to render a representation of an user
 * inside a list. Accepts props for the inner <NavLink /> and passes them
 * through to it.
 */
const Styled = withStyles(styles)(UsersListItem)

export default Styled
