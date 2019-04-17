import React from 'react'

import Grid from '@material-ui/core/Grid'

import Page from 'views/Page/Page.jsx'
import PropForm from 'components/PropForm'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import NodeDrawer from 'components/NodeDrawer/NodeDrawer'
import EditNodeDialog from 'components/EditNodeDialog'
import PcDialog from 'components/PcDialog'

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
 * @prop {number|null} selectedNodeID
 * @prop {boolean} showingAddNodeDialog
 * @prop {boolean} showingAddRelDialog
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
    showingAddRelDialog: false,
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
    this.setState({ showingAddNodeDialog: this.state.showingAddNodeDialog })
  }

  /** @private */
  toggleAddRelDialog = () => {
    this.setState({ showingAddRelDialog: !this.state.showingAddRelDialog })
  }
  toggleEditNodeDialog = () => {
    this.setState({ showingEditNodeDialog: !this.state.showingEditNodeDialog })
  }

  render() {
    const { showingAddNodeDialog, showingEditNodeDialog } = this.state
    const classes = { demo: '' }

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
          open={showingEditNodeDialog}
          title="Edit Node"
          handleClose={this.toggleEditNodeDialog}
          handleSave={() => {}}
        >
          <EditNodeDialog />
        </PcDialog>

        <Page titleText="Nodes And Properties">
          <Grid container style={{ minHeight: '100%' }}>
            <Grid item xs={12}>
              <NodeDrawer onclickEditNode={this.toggleEditNodeDialog} />
            </Grid>
            <IconButton
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
              onClick={() => {
                this.setState(state => ({
                  showingAddNodeDialog: !state.showingAddNodeDialog,
                }))
              }}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Page>
      </React.Fragment>
    )
  }
}
