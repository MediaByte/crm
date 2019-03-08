import React from 'react'

import Grid from '@material-ui/core/Grid'

import AddNodeDialog from 'containers/AddNodeDialog'
import Dialog from 'components/Dialog'
import NodeOverview from 'components/NodeOverview'
import PageColumn from 'views/Page/PageColumn.jsx'
import PropForm from 'components/PropForm'
import RelationshipForm from 'components/RelationshipForm'
import TitleSubtitleList from 'containers/TitleSubtitleList'
import { nameToIconMap } from 'common/NameToIcon'

import { nodes } from 'app'

/**
 * Placeholder while the model shape clears up.
 * @typedef {object} PropDef
 * @prop {string} name
 * @prop {string} propType
 */

/**
 * Placeholder while the model shape clears up.
 * @typedef {object} RelDef
 * @prop {string} iconName
 * @prop {string} name
 * @prop {Node} relatedNode
 */

/**
 * Placeholder while the model shape clears up.
 * @typedef {object} Node
 * @prop {string} iconName
 * @prop {string} identifier
 * @prop {string} label
 * @prop {string} name
 * @prop {PropDef[]} propDefs
 * @prop {RelDef[]} relDefs
 */

/**
 * @typedef {object} State
 * @prop {string[]} availablePropTypes
 * @prop {Record<string, Node>} nodes
 * @prop {string|null} selectedNodeKey
 * @prop {boolean} showingAddNodeDialog
 * @prop {boolean} showingAddRelDialog
 * @prop {boolean} showingPropDialog
 */

/**
 * @augments React.PureComponent<{}, State, never>
 */
export default class NodesAndProps extends React.PureComponent {
  /** @type {State} */
  state = {
    availablePropTypes: [],
    nodes: {},
    selectedNodeKey: null,
    showingAddNodeDialog: false,
    showingAddRelDialog: false,
    showingPropDialog: false,
  }

  componentDidMount() {
    nodes.on(nodesValue => {
      this.setState({
        nodes: nodesValue,
      })
    })
  }

  componentWillUnmount() {}

  /** @private */
  handleClosePropForm = () => {
    this.setState({
      showingPropDialog: false,
    })
  }

  /** @private */
  onClickAddProperty = () => {
    this.setState({
      showingPropDialog: true,
    })
  }

  /**
   * @private
   * @param {string} key
   */
  onClickNodeOnList = key => {
    this.setState({
      selectedNodeKey: key,
    })
  }

  /** @private */
  toggleAddNodeDialog = () => {
    this.setState(({ showingAddNodeDialog }) => ({
      showingAddNodeDialog: !showingAddNodeDialog,
    }))
  }

  /** @private */
  toggleAddRelDialog = () => {
    this.setState(({ showingAddRelDialog }) => ({
      showingAddRelDialog: !showingAddRelDialog,
    }))
  }

  handleSaveNode = (
    selectedIconIndex: number,
    identifier: string,
    label: string,
    name: string,
  ) => {
    nodes.set({
      iconName
      identifier,
      label,
      name,
    })
  }

  render() {
    const {
      availablePropTypes,
      nodes,
      selectedNodeKey,
      showingAddNodeDialog,
      showingAddRelDialog,
      showingPropDialog,
    } = this.state
    const classes = { demo: '' }

    const selectedNode = selectedNodeKey && nodes[selectedNodeKey]

    return (
      <React.Fragment>
        <Dialog
          handleClose={this.handleClosePropForm}
          open={showingPropDialog}
          title="Add a Property"
        >
          <PropForm availableTypes={availablePropTypes} />
        </Dialog>

        <AddNodeDialog
          availableIconNames={Object.keys(nameToIconMap)}
          handleClose={this.toggleAddNodeDialog}
          handleSave={this.handleSaveNode}
          isValidIdentifierValue={() => true}
          isValidLabelValue={() => true}
          isValidNameValue={() => true}
          open={showingAddNodeDialog}
        />

        <Dialog
          actionButtonText="SAVE"
          handleClose={this.toggleAddRelDialog}
          onClickCloseButton={this.toggleAddRelDialog}
          open={showingAddRelDialog}
          title="Add a Relationship"
        >
          <RelationshipForm availableNodeNames={[]} />
        </Dialog>

        <PageColumn titleText="Nodes And Properties">
          <Grid container>
            <Grid item>
              <TitleSubtitleList
                extractID={extractNodeKey}
                extractTitle={extractNodeName}
                onClickAdd={this.toggleAddNodeDialog}
                onClickItem={this.onClickNodeOnList}
                items={Object.entries(nodes).map(([key, node]) => ({
                  key,
                  ...node,
                }))}
                // TODO: optimize away array literal
                selectedIDs={
                  (selectedNodeKey && [selectedNodeKey]) || undefined
                }
                showToolbar
              />
            </Grid>

            <Grid item xs={12} sm={7} md={8} lg={9} className={classes.demo}>
              {selectedNode && (
                <NodeOverview
                  identifier={selectedNode.identifier}
                  iconName={selectedNode.iconName}
                  label={selectedNode.label}
                  name={selectedNode.name}
                  onClickAddProperty={this.onClickAddProperty}
                  onClickAddRelationship={this.toggleAddRelDialog}
                  properties={selectedNode.propDefs}
                  relationships={selectedNode.relDefs.map(relDef => ({
                    ...relDef,
                    relatedNodeName: relDef.relatedNode.name,
                  }))}
                />
              )}
            </Grid>
          </Grid>
        </PageColumn>
      </React.Fragment>
    )
  }
}
/** @param {Node & { key: string }} node */
const extractNodeKey = node => node.key

/** @param {Node} node */
const extractNodeName = node => node.name
