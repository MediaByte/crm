import React from 'react'

import toUpper from 'lodash/toUpper'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Snackbar from '@material-ui/core/Snackbar'
import { withStyles } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditOutlineIcon from '@material-ui/icons/EditOutlined'

import AddNodeForm from 'components/AddNodeForm'
import Dialog from 'components/SimpleDialog'
import IconSelector from 'components/IconSelector'
import Messages from 'components/Messages'
import OverlaySpinner from 'components/OverlaySpinner'
import Page from 'views/Page/Page.jsx'
import PropertyDrawer from 'components/PropertyDrawer'

import { nameToIconMap } from 'common/NameToIcon'

import { nodes } from 'app'

import { Node } from 'app/validators'
/**
 * @typedef {import('app/typings').Node} Node
 */

const availableIcons = Object.values(nameToIconMap).map(
  iconTriple => iconTriple.filled,
)
const availableIconNames = Object.keys(nameToIconMap)

const BLANK_ADD_NODE_FORM_DATA = Object.freeze({
  currentlySelectedIconName: null,
  currentLabelErrorMessage: null,
  currentLabelValue: '',
  currentNameErrorMessage: null,
  currentNameValue: '',
  detailsIfError: null,
  messagesIfError: null,
})

const INITIAL_ADD_NODE_FLOW = Object.freeze({
  currentlySelectedIconName: null,
  savingNode: false,
  selectingIcon: false,
  showingAddNodeDialog: false,
})

/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */
const styles = theme => ({
  addButton: {
    backgroundColor: '#f34930',
    bottom: '40px',
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    color: '#fff',
    position: 'absolute',
    right: '50px',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  card: {
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    padding: '20px 5px',
    backgroundColor: theme.palette.background.paper,
  },
  itemOption: {
    display: 'flex !important',
    flexDirection: 'column !important',
    right: '10px !important',
  },
  listItem: {
    paddingLeft: '15px',
  },
  pointerCursor: {
    cursor: 'pointer',
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 4,
    width: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 2,
    },
  },
  smallIconButton: {},
  spinner: {
    position: 'absolute',
  },
})

/**
 * @typedef {keyof ReturnType<typeof styles>} Classes
 */

/**
 * @typedef {object} Props
 * @prop {Record<Classes, string>} classes
 *
 */

/**
 * @typedef {object} AddNodeFlow
 * @prop {string|null} currentlySelectedIconName
 * @prop {boolean} savingNode
 * @prop {boolean} selectingIcon
 * @prop {boolean} showingAddNodeDialog
 */

/**
 * @typedef {object} AddNodeFormData
 * @prop {string|null} currentLabelErrorMessage
 * @prop {string} currentLabelValue
 * @prop {string|null} currentNameErrorMessage
 * @prop {string} currentNameValue
 * @prop {Record<'name'|'label', string[]|undefined>|null} detailsIfError
 * @prop {string[]|null} messagesIfError
 */

/**
 * @typedef {object} State
 * @prop {AddNodeFlow} addNodeFlow
 * @prop {AddNodeFormData} addNodeFormData
 * @prop {string|null} deactivatingNodeID
 * @prop {string|null} editingNodeID Non-null when editing a node's icon or
 * label.
 * @prop {Record<string, Node>} nodes
 * @prop {string|null} selectedNodeID Non-null when editing a node's property
 * definitions or relationships definitions.
 *
 * @prop {boolean} showingAddRelDialog
 * @prop {boolean} showingPropDialog
 * @prop {string|null} snackbarMessage
 */

/**
 * @augments React.Component<Props, State>
 */
class NodesAndProps extends React.Component {
  /** @type {State} */
  state = {
    addNodeFlow: {
      currentlySelectedIconName: null,
      savingNode: false,
      selectingIcon: false,
      showingAddNodeDialog: false,
    },
    addNodeFormData: BLANK_ADD_NODE_FORM_DATA,
    deactivatingNodeID: null,
    editingNodeID: null,
    nodes: {},
    selectedNodeID: null,
    showingAddRelDialog: false,
    showingPropDialog: false,
    snackbarMessage: null,
  }

  /**
   * @private
   * @param {string} nextLabelValue
   */
  addNodeFormOnLabelChange = nextLabelValue => {
    /**
     * @type {string}
     */
    let err

    try {
      Node.isValidLabel(nextLabelValue)
    } catch (e) {
      err = e.message
    }

    this.setState(({ addNodeFormData }) => ({
      addNodeFormData: {
        ...addNodeFormData,
        currentLabelValue: nextLabelValue,
        currentLabelErrorMessage: err || null,
      },
    }))
  }

  /**
   * @private
   * @param {string} nextNameValue
   */
  addNodeFormOnNameChange = nextNameValue => {
    /**
     * @type {string}
     */
    let err

    nextNameValue = toUpper(nextNameValue)

    try {
      Node.isValidName(nextNameValue)
    } catch (e) {
      err = e.message
    }

    this.setState(({ addNodeFormData }) => ({
      addNodeFormData: {
        ...addNodeFormData,
        currentNameValue: nextNameValue,
        currentNameErrorMessage: err || null,
      },
    }))
  }

  componentDidMount() {
    nodes.on(this.onUpdate)
  }

  /**
   * @param {Record<string, Node>} nodes
   */
  onUpdate = nodes => {
    this.setState({
      nodes,
    })
  }

  closeSnackbar = () => {
    this.setState({
      snackbarMessage: null,
    })
  }

  /** @private */
  componentWillUnmount() {
    nodes.off(this.onUpdate)
  }

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
   * @param {string} id
   */
  onClickNode = id => {
    this.setState({
      selectedNodeID: id,
    })
  }

  /** @private */
  toggleAddNodeDialog = () => {
    this.setState(({ addNodeFlow }) => ({
      addNodeFlow: {
        ...addNodeFlow,
        showingAddNodeDialog: !addNodeFlow.showingAddNodeDialog,
      },
    }))
  }

  /** @private */
  toggleAddRelDialog = () => {
    this.setState(({ showingAddRelDialog }) => ({
      showingAddRelDialog: !showingAddRelDialog,
    }))
  }

  /**
   * @private
   * @param {string} id
   */
  editNode = id => {
    this.setState({
      editingNodeID: id,
    })
  }

  /**
   * @private
   */
  stopEditingNode = () => {
    this.setState({
      editingNodeID: null,
    })
  }

  /**
   * @private
   * @param {string} id
   */
  deactivateNode = id => {
    this.setState({
      deactivatingNodeID: id,
    })
  }

  /**
   * @private
   */
  stopDeactivatingNode = () => {
    this.setState({
      deactivatingNodeID: null,
    })
  }

  /** @private */
  handleClosePropsDrawer = () => {
    this.setState({
      selectedNodeID: null,
    })
  }

  handleAddNodeAction = () => {
    if (this.state.addNodeFlow.selectingIcon) {
      this.handleAddNode()
    } else {
      this.setState(({ addNodeFlow }) => ({
        addNodeFlow: {
          ...addNodeFlow,
          selectingIcon: true,
        },
      }))
    }
  }

  handleAddNode = () => {
    this.setState(
      ({ addNodeFlow }) => ({
        addNodeFlow: {
          ...addNodeFlow,
          selectingIcon: false,
          savingNode: true,
        },
      }),
      () => {
        const { addNodeFlow, addNodeFormData } = this.state

        nodes
          .set({
            iconName: addNodeFlow.currentlySelectedIconName,
            label: addNodeFormData.currentLabelValue,
            name: addNodeFormData.currentNameValue,
          })
          .then(res => {
            if (res.ok) {
              this.setState({
                addNodeFlow: INITIAL_ADD_NODE_FLOW,
                addNodeFormData: BLANK_ADD_NODE_FORM_DATA,
                snackbarMessage: 'Node created sucessfully',
              })
            } else {
              Object.entries(res.details).forEach(([key, detail]) => {
                if (detail.length === 0) {
                  console.warn('unexpectedly received detail of length 0')
                  return
                }

                if (key === 'label') {
                  const [msg] = detail

                  this.setState(({ addNodeFlow, addNodeFormData }) => ({
                    addNodeFlow: {
                      ...addNodeFlow,
                      savingNode: false,
                    },
                    addNodeFormData: {
                      ...addNodeFormData,
                      currentLabelErrorMessage: msg,
                    },
                  }))
                } else if (key === 'name') {
                  const [msg] = detail

                  this.setState(({ addNodeFlow, addNodeFormData }) => ({
                    addNodeFlow: {
                      ...addNodeFlow,
                      savingNode: false,
                    },
                    addNodeFormData: {
                      ...addNodeFormData,
                      currentNameErrorMessage: msg,
                    },
                  }))
                } else if (key === 'iconName') {
                  const [msg] = detail

                  this.setState(({ addNodeFlow, addNodeFormData }) => ({
                    addNodeFlow: {
                      ...addNodeFlow,
                      savingNode: false,
                    },
                    addNodeFormData: {
                      ...addNodeFormData,
                      messagesIfError: [msg],
                    },
                  }))
                } else {
                  console.warn(
                    `received unexpected key in details of response: ${key}`,
                  )
                }
              })

              if (res.messages.length > 0) {
                this.setState(({ addNodeFormData }) => ({
                  addNodeFormData: {
                    ...addNodeFormData,
                    messagesIfError: res.messages,
                  },
                }))
              }
            }
          })
          .catch(e => {
            /** @type {string} */
            const msg = typeof e === 'string' ? e : e.message

            this.setState(({ addNodeFormData }) => ({
              addNodeFormData: {
                ...addNodeFormData,
                messagesIfError: [msg],
              },
            }))
          })
      },
    )
  }

  /**
   * @private
   * @param {number} i
   */
  addNodeOnClickIcon = i => {
    this.setState(({ addNodeFlow }) => {
      const name = availableIconNames[i]

      if (name === addNodeFlow.currentlySelectedIconName) {
        return {
          addNodeFlow: {
            ...addNodeFlow,
            currentlySelectedIconName: null,
          },
        }
      }

      return {
        addNodeFlow: {
          ...addNodeFlow,
          currentlySelectedIconName: name,
        },
      }
    })
  }

  closeAddNodeDialog = () => {
    this.setState({
      addNodeFlow: INITIAL_ADD_NODE_FLOW,
      addNodeFormData: BLANK_ADD_NODE_FORM_DATA,
    })
  }

  render() {
    const { classes } = this.props
    const {
      addNodeFlow,
      addNodeFormData,
      editingNodeID,
      deactivatingNodeID,
      nodes,
      selectedNodeID,
      snackbarMessage,
    } = this.state

    const validAddNodeFormData =
      addNodeFormData.currentLabelErrorMessage === null &&
      addNodeFormData.currentLabelValue.length > 0 &&
      addNodeFormData.currentNameErrorMessage === null &&
      addNodeFormData.currentNameValue.length > 0
    addNodeFlow.currentlySelectedIconName !== null

    const selectedNode =
      typeof selectedNodeID === 'string' &&
      Object.entries(nodes).filter(([id]) => id === selectedNodeID)[0][1]

    const selectedIconIdx =
      addNodeFlow.currentlySelectedIconName === null
        ? null
        : availableIconNames.indexOf(addNodeFlow.currentlySelectedIconName)

    return (
      <React.Fragment>
        <Snackbar
          autoHideDuration={2000}
          message={<span>{snackbarMessage}</span>}
          open={!!snackbarMessage}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />

        <Dialog
          actionButtonText={addNodeFlow.selectingIcon ? 'Save' : 'Next'}
          disableActionButton={
            !validAddNodeFormData ||
            addNodeFlow.savingNode ||
            (addNodeFlow.currentlySelectedIconName === null &&
              addNodeFlow.selectingIcon)
          }
          handleAction={this.handleAddNodeAction}
          handleClose={this.closeAddNodeDialog}
          open={addNodeFlow.showingAddNodeDialog}
          title={
            addNodeFlow.selectingIcon
              ? 'Select an Icon for the Node'
              : 'Add a Node'
          }
        >
          <OverlaySpinner showSpinner={addNodeFlow.savingNode}>
            {addNodeFlow.selectingIcon ? (
              <IconSelector
                icons={availableIcons}
                onClickIcon={this.addNodeOnClickIcon}
                selectedIconIdx={selectedIconIdx}
              />
            ) : (
              <React.Fragment>
                <AddNodeForm
                  {...addNodeFormData}
                  onLabelChange={this.addNodeFormOnLabelChange}
                  onNameChange={this.addNodeFormOnNameChange}
                  disableLabelInput={addNodeFlow.savingNode}
                  disableNameInput={addNodeFlow.savingNode}
                />
                {addNodeFormData.messagesIfError && (
                  <Messages messages={addNodeFormData.messagesIfError} />
                )}
              </React.Fragment>
            )}
          </OverlaySpinner>
        </Dialog>

        <Dialog
          open={editingNodeID !== null}
          title="Edit Node"
          handleClose={this.stopEditingNode}
        >
          Edit node dialog
        </Dialog>

        <Dialog
          open={deactivatingNodeID !== null}
          title="Edit Node"
          handleClose={this.stopDeactivatingNode}
        >
          Deactivating node dialog
        </Dialog>

        <Page titleText="Nodes And Properties">
          <Grid container className={classes.root}>
            {selectedNode && (
              <PropertyDrawer
                open
                propertyItems={Object.entries(selectedNode.propDefs).map(
                  ([id, propDef]) => ({
                    ...propDef,
                    _: {
                      '#': id,
                    },
                  }),
                )}
                handleClose={this.handleClosePropsDrawer}
              />
            )}

            {Object.entries(nodes).map(([id, node]) => (
              <Grid
                className={classes.pointerCursor}
                item
                xs={12}
                md={3}
                key={id}
                // TODO: fix callback in render()
                onClick={() => {
                  this.onClickNode(id)
                }}
              >
                <List className={classes.card}>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                      <DeleteOutlineIcon />
                    </ListItemAvatar>

                    <ListItemText primary={node.label} secondary={node.name} />

                    <ListItemSecondaryAction className={classes.itemOption}>
                      <IconButton
                        aria-label="Edit"
                        className={classes.smallIconButton}
                        // TODO: fix callback in render()
                        onClick={e => {
                          e.stopPropagation()
                          this.editNode(id)
                        }}
                      >
                        <EditOutlineIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Delete"
                        color="secondary"
                        className={classes.smallIconButton}
                        onClick={e => {
                          e.stopPropagation()
                          this.deactivateNode(id)
                        }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Grid>
            ))}

            <IconButton
              color="secondary"
              className={classes.addButton}
              onClick={() => {
                this.setState(state => ({
                  addNodeFlow: {
                    // TODO FIX THIS
                    ...this.state.addNodeFlow,
                    showingAddNodeDialog: true,
                  },
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

export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {import('@material-ui/core/styles').StyleRulesCallback<Classes>} */ (styles),
)(NodesAndProps)
