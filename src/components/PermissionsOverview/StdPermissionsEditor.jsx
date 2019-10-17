import React from 'react'

import { withStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core'

//project files
import { nodes as nodesNode } from 'app'
import { nameToIconMap } from '../../common/NameToIcon'

/**
 * @typedef {keyof ReturnType<typeof styles>} ClassKey
 */

/**
 * @typedef {object} Props
 * @prop {Record<ClassKey, string>} classes
 * @prop {object | null} selectedNode
 */

/**
 * @typedef {object} State
 * @prop {string | null} selectedNodeID
 */

/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */
const styles = theme => ({
  addButton: {
    alignSelf: 'flex-start',
  },
  List: {
    [theme.breakpoints.up('xs')]: {
      marginTop: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 2.5,
    },
  },
  listItem: {
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('xs')]: {
      paddingTop: 7,
      paddingBottom: 7,
      marginBottom: 1,
    },
  },
})

/**
 * @augments React.Component<Props, State>
 */
class StdPermissionsEditor extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <Grid>
        <List className={classes.List}>
          <ListItem className={classes.listItem}>
            <ListItemText primary="View" />
            <ListItemSecondaryAction>
              <Checkbox
                value="checkedA"
                inputProps={{
                  'aria-label': 'primary checkbox',
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
    )
  }
}

export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {import('@material-ui/core/styles').StyleRulesCallback<ClassKey>} */ (styles),
)(StdPermissionsEditor)
