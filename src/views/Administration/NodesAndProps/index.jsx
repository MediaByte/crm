import React from 'react'

import Grid from '@material-ui/core/Grid'

import AddNodeDialog from 'containers/AddNodeDialog'
import Dialog from 'components/Dialog'
import NodeOverview from 'components/NodeOverview'
import PageColumn from 'views/Page/PageColumn.jsx'
import PropForm from 'components/PropForm'
import TitleSubtitleList from 'containers/TitleSubtitleList'
import { nameToIconMap } from 'common/NameToIcon'

/**
 * Placeholder while the model shape clears up.
 * @typedef {object} NodeProp
 * @prop {string} name
 * @prop {string} type
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
 * @prop {number|null} selectedNodeID
 * @prop {boolean} showingAddNodeDialog
 * @prop {boolean} showingPropDialog
 */

/**
 * @augments React.PureComponent<Props, State, never>
 */
export default class NodesAndProps extends React.PureComponent {
  /** @type {State} */
  state = {
    selectedNodeID: null,
    showingAddNodeDialog: false,
    showingPropDialog: false,
  }

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

  /** @private */
  onClickAddRelationship = () => {}

  /**
   * @private
   * @param {number} id
   */
  onClickNodeOnList = id => {
    this.setState({
      selectedNodeID: id,
    })
  }

  toggleAddNodeDialog = () => {
    this.setState(({ showingAddNodeDialog }) => ({
      showingAddNodeDialog: !showingAddNodeDialog,
    }))
  }

  render() {
    const { availableTypes, nodes } = this.props
    const {
      selectedNodeID,
      showingAddNodeDialog,
      showingPropDialog,
    } = this.state
    const classes = { demo: '' }

    const selectedNode =
      typeof selectedNodeID == 'number' &&
      nodes.filter(node => node.id === selectedNodeID)[0]

    return (
      <React.Fragment>
        <Dialog
          handleClose={this.handleClosePropForm}
          open={showingPropDialog}
          title="Add a Property"
        >
          <PropForm availableTypes={availableTypes} />
        </Dialog>

        <AddNodeDialog
          availableIconNames={Object.keys(nameToIconMap)}
          handleClose={this.toggleAddNodeDialog}
          handleSave={() => {}}
          isValidIdentifierValue={() => true}
          isValidLabelValue={() => true}
          isValidNameValue={() => true}
          open={showingAddNodeDialog}
        />

        <PageColumn titleText="Nodes And Properties">
          <Grid container>
            <Grid item>
              <TitleSubtitleList
                extractID={extractNodeID}
                extractTitle={extractNodeName}
                onClickAdd={this.toggleAddNodeDialog}
                onClickItem={this.onClickNodeOnList}
                items={nodes}
                // TODO: optimize away array literal
                selectedIDs={(selectedNodeID && [selectedNodeID]) || undefined}
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
                  onClickAddRelationship={this.onClickAddRelationship}
                  properties={selectedNode.props}
                  relationships={selectedNode.relationships}
                />
              )}
            </Grid>
          </Grid>
        </PageColumn>
      </React.Fragment>
    )
  }
}
/** @param {Node} node */
const extractNodeID = node => node.id

/** @param {Node} node */
const extractNodeName = node => node.name
