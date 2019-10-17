import React from 'react'

import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'

//Icons
import PersonAdd from '@material-ui/icons/PersonAdd'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import ScatterPlot from '@material-ui/icons/ScatterPlotOutlined'
import GroupAdd from '@material-ui/icons/GroupAdd'

//project files
import { nodes as nodesNode } from 'app'
import { nameToIconMap } from '../../common/NameToIcon'
import StdPermissionsEditor from '../../components/PermissionsOverview/StdPermissionsEditor'

/**
 * @typedef {object} Nodes
 * @prop {string} nodeName
 * @prop {string=} iconName
 * @prop {React.Key} key
 */

/**
 * @typedef {keyof ReturnType<typeof styles>} ClassKey
 */

/**
 * @typedef {object} Props
 * @prop {Record<ClassKey, string>} classes
 * @prop {((id: string) => void)=} onClickEdit (Optional)

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

const NODES_PERMISSIONS_SUBHEADER = (
  <ListSubheader component="div">NODES</ListSubheader>
)

/**
 * @augments React.Component<Props, State>
 */
class PermissionsOverview extends React.Component {
  /**
   * @private
   * @param {string} id
   */
  onClickEdit = id => {
    const { onClickEdit } = this.props

    onClickEdit && onClickEdit(id)
  }

  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props)

    /**
     * @type {State}
     */
    this.state = {
      selectedNodeID: null,
    }
  }

  // @ts-ignore
  setNodes = nodes => this.setState({ nodes })

  componentDidMount() {
    nodesNode.on(this.setNodes)
  }

  componentWillUnmount() {
    nodesNode.off(this.setNodes)
  }

  render() {
    const { classes } = this.props

    const {
      // @ts-ignore
      nodes,
    } = this.state

    const Available_Nodes = Object.entries(nodes || {})
      .map(([key, value]) => ({ ...value, id: key }))
      .sort((a, b) => a.label - b.label)

    console.log(nodesNode)

    return (
      <Grid>
        <List className={classes.List}>
          <ListItem
            button
            className={classes.listItem}
            component={props => (
              <Link
                // @ts-ignore
                to={StdPermissionsEditor}
                {...props}
              />
            )}
          >
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary="Manage Employees" />
            <ListItemSecondaryAction>
              <IconButton>
                <KeyboardArrowRight />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <GroupAdd />
            </ListItemIcon>
            <ListItemText primary="Manage User Groups" />
            <ListItemSecondaryAction>
              <IconButton>
                <KeyboardArrowRight />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <ScatterPlot />
            </ListItemIcon>
            <ListItemText primary="Nodes and Properties" />
            <ListItemSecondaryAction>
              <IconButton>
                <KeyboardArrowRight />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List subheader={NODES_PERMISSIONS_SUBHEADER}>
          {Available_Nodes &&
            Available_Nodes.map(node => {
              const nodeIcon =
                node &&
                node.iconName &&
                nameToIconMap[node.iconName] &&
                nameToIconMap[node.iconName]

              const NodeIcon = nodeIcon && nodeIcon.outlined
              return (
                <ListItem
                  button
                  key={node.id}
                  className={classes.listItem}
                  component={props => (
                    <Link
                      // @ts-ignore
                      to={StdPermissionsEditor}
                      {...props}
                    />
                  )}
                  onClick={() => {
                    this.onClickEdit(node.id)
                  }}
                >
                  {NodeIcon && (
                    <ListItemIcon>
                      <NodeIcon />
                    </ListItemIcon>
                  )}
                  <ListItemText primary={node.label} />
                  <ListItemSecondaryAction>
                    <IconButton disabled>
                      <KeyboardArrowRight />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
        </List>
      </Grid>
    )
  }
}

export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {import('@material-ui/core/styles').StyleRulesCallback<ClassKey>} */ (styles),
)(PermissionsOverview)
