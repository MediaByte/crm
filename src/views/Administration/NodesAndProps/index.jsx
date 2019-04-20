import React from 'react'

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Grid,
  withStyles,
} from '@material-ui/core'

import Page from 'views/Page/Page.jsx'
import PropForm from 'components/PropForm'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import EditNodeDialog from 'components/EditNodeDialog'
import PcDialog from 'components/PcDialog'
import PcIcon from 'components/PcIcon'
import styles from './styles'
import { nodes, propDefs, relationships } from './mock.js'
import NodeDrawer from 'components/NodeDrawer'

/**
 * Placeholder while the model shape clears up.
 * @typedef {object} NodeProp
 * @prop {string} name
 * @prop {string} type
 * @prop {(() => void)=} onClickAddProperty
 */

/**
 * Placeholder while the model shape clears up.
 * @typedef {object} NodeRelationship
 * @prop {string} iconName
 * @prop {string} name
 * @prop {string} relatedNodeName
 */

/**
 * Placeholder while the model shape clears up.
 * @typedef {object} Node
 * @prop {string} iconName
 * @prop {number} id
 * @prop {string} identifier
 * @prop {string} label
 * @prop {string} name
 * @prop {NodeProp[]} props
 * @prop {NodeRelationship[]} relationships
 */

/**
 * @typedef {object} Props
 * @prop {string[]} availableTypes
 * @prop {Node[]} nodes
 */

/**
 * @typedef {object} State
 * @prop {number} selectedNodeId
 * @prop {boolean} showingAddNodeDialog
 * @prop {number} editingNodeId
 */

/**
 * @augments React.PureComponent<Props, State, never>
 */

class NodesAndProps extends React.PureComponent {
  /** @type {State} */
  state = {
    selectedNodeId: 0,
    showingAddNodeDialog: false,
    editingNodeId: 0,
  }

  toggleAddNodeDialog = () => {
    this.setState({ showingAddNodeDialog: !this.state.showingAddNodeDialog })
  }

  handleEditNode = id => {
    this.setState({ editingNodeId: id })
  }

  handleEditNodeClose = () => {
    this.setState({ editingNodeId: 0 })
  }

  handleNodeClick = id => {
    this.setState({ selectedNodeId: id })
  }

  handleNodeDrawerClose = () => {
    this.setState({ selectedNodeId: 0 })
  }

  render() {
    const { showingAddNodeDialog, editingNodeId, selectedNodeId } = this.state
    const { classes } = this.props

    return (
      <React.Fragment>
        <PcDialog
          open={showingAddNodeDialog}
          title="Add a Node"
          handleClose={this.toggleAddNodeDialog}
          handleSave={() => {}}
        >
          <PropForm availableTypes={[]} />
        </PcDialog>

        <PcDialog
          open={editingNodeId}
          title="Edit Node"
          handleClose={this.handleEditNodeClose}
          handleSave={() => {}}
        >
          <EditNodeDialog />
        </PcDialog>

        <NodeDrawer
          selectedNodeId={selectedNodeId}
          relationships={relationships}
          propDefs={propDefs}
          handleClose={this.handleNodeDrawerClose}
        />

        <Page titleText="Nodes And Properties">
          <Grid container style={{ minHeight: '100%' }}>
            <Grid item xs={12}>
              <Grid container className={classes.root}>
                {nodes.map(item => (
                  <Grid item xs={12} md={3} key={item._['#']}>
                    <List className={classes.card}>
                      <ListItem className={classes.listItem}>
                        <ListItemAvatar>
                          <PcIcon name={item.iconName} theme="outlined" />
                        </ListItemAvatar>
                        <ListItemText
                          onClick={() => this.handleNodeClick(item._['#'])}
                          primary={item.name}
                          secondary={item.label}
                        />
                        <ListItemSecondaryAction className={classes.itemOption}>
                          <IconButton
                            aria-label="Edit"
                            className={classes.smallIconButton}
                            onClick={() => this.handleEditNode(item._['#'])}
                          >
                            <PcIcon name="edit" theme="outlined" />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            color="secondary"
                            className={classes.smallIconButton}
                          >
                            <PcIcon name="delete" theme="outlined" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <IconButton
              color="secondary"
              className={classes.addButton}
              onClick={this.toggleAddNodeDialog}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Page>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(NodesAndProps)
