import React from 'react'

import toUpper from 'lodash/toUpper'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import CloseIcon from '@material-ui/icons/Close'

import AddNodeForm from 'components/AddNodeForm'
import AddPropForm from 'components/AddPropForm'
import Dialog from 'components/Dialog'
import IconSelector from 'components/IconSelector'
import Messages from 'components/Messages'
import NodeEditor from 'components/NodeEditor'
import OverlaySpinner from 'components/OverlaySpinner'
import Page from 'views/Page/Page.jsx'
import PcDrawer from 'components/PcDrawer'
import PropDefsOverview from 'components/PropDefsOverview'
import PropDefEditor from 'components/PropDefEditor'

import { nameToIconMap } from 'common/NameToIcon'
import { typeToReadableName } from 'common/PropTypeToMetadata'

import { nodes as nodesNode, propTypes as propTypesNode } from 'app'

import * as Utils from 'common/utils'

import {
  Node as NodeValidator,
  PropDef as PropDefValidator,
} from 'app/validators'
import { Card, CardActionArea, CardHeader, Avatar } from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons'
/**
 * @typedef {import('app/gun-wrapper/SetNode').default} SetNode
 * @typedef {import('app/typings').Node} Node
 * @typedef {import('app/typings').PropertyType} PropType
 * @typedef {import('app/typings').PropDefArgument} PropDefArgument
 * @typedef {import('app/gun-wrapper/simple-typings').WrapperSetNode} WrapperSetNode
 */

const NodeDrawerTab = {
  Details: 0,
  Properties: 1,
  Relationships: 2,
}

const AVAILABLE_TABS_NAMES = Object.keys(NodeDrawerTab)

const DEACTIVATING_NODE_EXPLANATION_TEXT =
  'Deactivating a node prevents \
adding new records to it, either by you or other employees. Properties and \
relationships can still be edited. Please note, due to the nature of the app \
(offline first) this change can take some time to propagate to employees, and \
those who are currently offline will be able to add records to the node until \
they become online again.'

const REACTIVATING_NODE_EXPLANATION_TEXT =
  'Reactivating a node allows for \
records to be added to it again, either by you or other employees. Please \
note, due to the nature of the app (offline first) this change can take some \
time to propagate to employees, and those who are currently offline wont be \
able to add records to the node until they become online again.'

const AVAILABLE_ICONS = Object.values(nameToIconMap).map(
  iconTriple => iconTriple.outlined,
)
const AVAILABLE_ICON_NAMES = Object.keys(nameToIconMap)

/** @type {AddNodeFormData} */
const BLANK_ADD_NODE_FORM_DATA = Object.freeze({
  currentlySelectedIconName: null,
  currentLabelErrorMessage: null,
  currentLabelValue: '',
  currentNameErrorMessage: null,
  currentNameValue: '',
  detailsIfError: null,
  messagesIfError: null,
})

/** @type {Readonly<EditPropFlow>} */
const INITIAL_EDIT_PROP_FLOW = {
  selectedPropID: null,
  selectedSettingParamID: null,
}

/** @type {AddNodeFlow} */
const INITIAL_ADD_NODE_FLOW = Object.freeze({
  currentlySelectedIconName: null,
  savingNode: false,
  selectingIcon: false,
  showingAddNodeDialog: false,
})

/** @type {AddPropFlow} */
const INITIAL_ADD_PROP_FLOW = Object.freeze({
  currentlySelectedIconName: null,
  dialogOpen: false,
  labelError: null,
  labelValue: '',
  nameError: null,
  nameValue: '',
  typeValue: '',
  saving: false,
  selectingIcon: false,
})

/** @type {EditNodeFlow} */
const INITIAL_EDIT_NODE_FLOW = {
  currentlySelectedIconName: null,
  deactivating: false,
  editingIcon: false,
  editingLabel: false,
  editingLabelCurrentValue: '',
  reactivating: false,
}

/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */
const styles = theme => ({
  toRight: {
    marginLeft: 'auto',
  },
  itemOption: {
    display: 'flex !important',
    flexDirection: 'column !important',
    right: '10px !important',
  },
  labelEditorTextField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  listItem: {
    paddingLeft: '15px',
  },
  nodeEditorContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  pointerCursor: {
    cursor: 'pointer',
  },
  nodesContainer: {
    paddingBottom: '30px',
    paddingTop: '10px',
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
 * @typedef {object} AddPropFlow
 * @prop {string|null} currentlySelectedIconName
 * @prop {boolean} dialogOpen
 * @prop {string|null} labelError
 * @prop {string} labelValue
 * @prop {string|null} nameError
 * @prop {string} nameValue
 * @prop {string} typeValue
 * @prop {boolean} saving
 * @prop {boolean} selectingIcon
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
 * @typedef {object} EditNodeFlow
 * @prop {string|null} currentlySelectedIconName
 * @prop {boolean} deactivating
 * @prop {boolean} editingIcon
 * @prop {boolean} editingLabel
 * @prop {string} editingLabelCurrentValue
 * @prop {boolean} reactivating
 */

/**
 * @typedef {object} EditPropFlow
 * @prop {string|null} selectedPropID
 * @prop {string|null} selectedSettingParamID
 */

/**
 * @typedef {object} State
 * @prop {AddNodeFlow} addNodeFlow
 * @prop {AddPropFlow} addPropFlow
 * @prop {AddNodeFormData} addNodeFormData
 * @prop {number} currentNodeDrawerTab
 * @prop {EditNodeFlow} editNodeFlow
 * @prop {EditPropFlow} editPropFlow
 * @prop {boolean} isReorderingProps
 * @prop {Record<string, Node>} nodes
 * @prop {Record<string, PropType>} propTypes
 * @prop {string|null} selectedNodeID Non-null when editing a node's property
 * definitions or relationships definitions.
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
    addPropFlow: INITIAL_ADD_PROP_FLOW,
    addNodeFormData: BLANK_ADD_NODE_FORM_DATA,
    currentNodeDrawerTab: NodeDrawerTab.Details,
    editNodeFlow: INITIAL_EDIT_NODE_FLOW,
    editPropFlow: INITIAL_EDIT_PROP_FLOW,
    isReorderingProps: false,
    nodes: {},
    propTypes: {},
    selectedNodeID: null,
    showingAddRelDialog: false,
    showingPropDialog: false,
    snackbarMessage: null,
  }

  /*
        db         88888888ba,    88888888ba,       888b      88    ,ad8888ba,    88888888ba,    88888888888  
       d88b        88      `"8b   88      `"8b      8888b     88   d8"'    `"8b   88      `"8b   88           
      d8'`8b       88        `8b  88        `8b     88 `8b    88  d8'        `8b  88        `8b  88                 d8'  `8b      88         88  88         88     88  `8b   88  88          88  88         88  88aaaaa      
    d8YaaaaY8b     88         88  88         88     88   `8b  88  88          88  88         88  88"""""      
   d8""""""""8b    88         8P  88         8P     88    `8b 88  Y8,        ,8P  88         8P  88           
  d8'        `8b   88      .a8P   88      .a8P      88     `8888   Y8a.    .a8P   88      .a8P   88           
 d8'          `8b  88888888Y"'    88888888Y"'       88      `888    `"Y8888Y"'    88888888Y"'    88888888888  
*/

  /**
   * @private
   */
  addNodeFlowToggleDialog = () => {
    this.setState(({ addNodeFlow }) => ({
      addNodeFlow: {
        ...INITIAL_ADD_NODE_FLOW,
        showingAddNodeDialog: !addNodeFlow.showingAddNodeDialog,
      },
      addNodeFormData: BLANK_ADD_NODE_FORM_DATA,
    }))
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
      NodeValidator.isValidLabel(nextLabelValue)
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
   */
  addNodeFlowOnClickLeftAction = () => {
    this.setState(({ addNodeFlow }) => ({
      addNodeFlow: {
        ...addNodeFlow,
        selectingIcon: false,
        currentlySelectedIconName: null,
      },
    }))
  }

  /**
   * @private
   * @param {string} nextNameValue
   */
  addNodeFormOnNameChange = nextNameValue => {
    this.setState(({ addNodeFormData, nodes: stateNodes }) => {
      /**
       * @type {string}
       */
      let err = ''

      nextNameValue = toUpper(nextNameValue)

      const chars = nextNameValue.split('')

      const nodes = Object.values(stateNodes)

      // only allow A-Z
      if (!chars.every(Utils.isAZUpper)) {
        return null
      }

      try {
        NodeValidator.isValidName(nextNameValue)
      } catch (e) {
        err = e.message
      }

      nodes.forEach(node => {
        if (node.name === nextNameValue) {
          err = 'There is already a node with this name'
        }
      })

      return {
        addNodeFormData: {
          ...addNodeFormData,
          currentNameValue: nextNameValue,
          currentNameErrorMessage: err || null,
        },
      }
    })
  }

  /*
       db         88888888ba,    88888888ba,       88888888ba   88888888ba     ,ad8888ba,    88888888ba   
      d88b        88      `"8b   88      `"8b      88      "8b  88      "8b   d8"'    `"8b   88      "8b
    d8'  `8b      88         88  88         88     88aaaaaa8P'  88aaaaaa8P'  88          88  88aaaaaa8P'
   d8YaaaaY8b     88         88  88         88     88""""""'    88""""88'    88          88  88""""""'  
 d8'        `8b   88      .a8P   88      .a8P      88           88     `8b    Y8a.    .a8P   88           
d8'          `8b  88888888Y"'    88888888Y"'       88           88      `8b    `"Y8888Y"'    88           
*/

  /**
   * @private
   * @param {string} nextLabelValue
   */
  addPropFormOnLabelChange = nextLabelValue => {
    this.setState(({ addPropFlow }) => ({
      addPropFlow: {
        ...addPropFlow,
        labelValue: nextLabelValue,
      },
    }))
  }

  /**
   * @private
   * @param {string} nextNameValue
   */
  addPropFormOnNameChange = nextNameValue => {
    /**
     * @type {string}
     */
    let err

    nextNameValue = toUpper(nextNameValue)

    try {
      PropDefValidator.isValidName(nextNameValue)
    } catch (e) {
      err = e.message
    }

    this.setState(({ addPropFlow }) => ({
      addPropFlow: {
        ...addPropFlow,
        nameError: err || null,
        nameValue: nextNameValue,
      },
    }))
  }

  /**
   * @private
   * @param {string} nextType
   */
  addPropFormOnTypeChange = nextType => {
    this.setState(({ addPropFlow }) => ({
      addPropFlow: {
        ...addPropFlow,
        typeValue: nextType,
      },
    }))
  }

  addPropFlowOnClickAction = () => {
    this.setState(
      ({ addPropFlow }) => {
        if (addPropFlow.saving) {
          console.assert('shouldnt be reachable')
          return null
        }

        if (addPropFlow.selectingIcon) {
          return {
            addPropFlow: {
              ...addPropFlow,
              selectingIcon: false,
              saving: true,
            },
          }
        } else {
          return {
            addPropFlow: {
              ...addPropFlow,
              selectingIcon: true,
            },
          }
        }
      },
      () => {
        if (this.state.addPropFlow.saving) {
          this.addPropFlowHandleSave()
        }
      },
    )
  }

  addPropFlowOnClickLeftACtion = () => {
    if (this.state.addPropFlow.selectingIcon) {
      this.setState(({ addPropFlow }) => ({
        addPropFlow: {
          ...addPropFlow,
          currentlySelectedIconName: null,
          selectingIcon: false,
        },
      }))
    } else {
      this.toggleAddPropDialog()
    }
  }

  addPropFlowHandleSave = () => {
    // this method is supposed to be called in a setState callback
    // to ensure we are looking at updated state
    const { addPropFlow, selectedNodeID } = this.state

    if (!addPropFlow.saving) {
      console.warn(
        'addPropFlowHandleSave called without state.addPropflow.saving being true, aborting',
      )
      return
    }

    const propTypeNode = (() => {
      let key

      for (const [propTypeKey, pt] of Object.entries(
        propTypesNode.currentData,
      )) {
        /** @type {PropType} */
        // @ts-ignore CAST & ignore: TS wants me to convert to unknown first etc
        const propType = pt

        if (propType.name === addPropFlow.typeValue) {
          key = propTypeKey
          break
        }
      }

      if (typeof key === 'undefined') {
        console.error('expected key to be defined')
      }

      // CAST: Guaranteed tp be defined since the add prop flow takes the nanes
      // of the props from the prop types node.
      return propTypesNode.get(/** @type {string} */ (key))
    })()

    const propDefs = nodesNode
      .get(/** @type {string} */ (selectedNodeID))
      .getSet('propDefs')

    propDefs
      .set({
        helpText: null,
        iconName: addPropFlow.currentlySelectedIconName,
        indexed: false,
        label: addPropFlow.labelValue,
        name: addPropFlow.nameValue,
        order: Object.keys(propDefs).length,
        propType: propTypeNode,
        required: false,
      })
      .then(res => {
        if (res.ok) {
          this.setState({
            addPropFlow: INITIAL_ADD_PROP_FLOW,
            snackbarMessage: 'Property added correctly',
          })
        } else {
          Object.entries(res.details).forEach(([key, detail]) => {
            if (detail.length === 0) {
              console.warn('unexpectedly received detail of length 0')
              return
            }

            const [msg] = detail

            if (key === 'label') {
              this.setState(({ addPropFlow }) => ({
                addPropFlow: {
                  ...addPropFlow,
                  labelError: msg,
                  saving: false,
                },
              }))
            } else if (key === 'name') {
              this.setState(({ addPropFlow }) => ({
                addPropFlow: {
                  ...addPropFlow,
                  nameError: msg,
                  saving: false,
                },
              }))
            } else {
              console.warn(
                `received unexpected key in details of response: ${key}`,
              )
              console.warn(res)
            }
          })
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
  }

  /**
   * @private
   * @param {number} i
   */
  addPropFlowOnClickIcon = i => {
    this.setState(({ addPropFlow }) => {
      const name = AVAILABLE_ICON_NAMES[i]

      if (name === addPropFlow.currentlySelectedIconName) {
        return {
          addPropFlow: {
            ...addPropFlow,
            currentlySelectedIconName: null,
          },
        }
      }

      return {
        addPropFlow: {
          ...addPropFlow,
          currentlySelectedIconName: name,
        },
      }
    })
  }

  /**
   * @private
   * @type {import('@material-ui/core/Tabs').TabsProps['onChange']}
   */
  handleNodeDrawerTabChange = (_, tab) => {
    this.setState({
      currentNodeDrawerTab: tab,
      isReorderingProps: false,
    })
  }

  /*
88888888888  88888888ba,    88  888888888888     888b      88    ,ad8888ba,    88888888ba,    88888888888                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
88           88      `"8b   88       88          8888b     88   d8"'    `"8b   88      `"8b   88
88           88        `8b  88       88          88 `8b    88  d8'        `8b  88        `8b  88
88aaaaa      88         88  88       88          88  `8b   88  88          88  88         88  88aaaaa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
88"""""      88         88  88       88          88   `8b  88  88          88  88         88  88"""""                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
88           88         8P  88       88          88    `8b 88  Y8,        ,8P  88         8P  88                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
88           88      .a8P   88       88          88     `8888   Y8a.    .a8P   88      .a8P   88                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
88888888888  88888888Y"'    88       88          88      `888    `"Y8888Y"'    88888888Y"'    88888888888
*/

  /**
   * @type {import('@material-ui/core/TextField').TextFieldProps['onChange']}
   */
  editNodeFlowOnChangeLabelTextField = e => {
    // @ts-ignore
    const editingLabelCurrentValue = e.target.value

    this.setState(({ editNodeFlow }) => ({
      editNodeFlow: {
        ...editNodeFlow,
        editingLabelCurrentValue,
      },
    }))
  }

  editNodeFlowOnClickConfirmDeactivate = () => {
    nodesNode
      .get(/** @type {string} */ (this.state.selectedNodeID))
      .put({
        active: false,
      })
      .then(res => {
        console.log(res)
      })

    this.setState({
      editNodeFlow: INITIAL_EDIT_NODE_FLOW,
    })
  }

  editNodeFlowOnClickConfirmReactivate = () => {
    nodesNode
      .get(/** @type {string} */ (this.state.selectedNodeID))
      .put({
        active: true,
      })
      .then(res => {
        console.log(res)
      })

    this.setState({
      editNodeFlow: INITIAL_EDIT_NODE_FLOW,
    })
  }

  editNodeFlowOnClickDrawerBtnLeft = () => {}

  editNodeFlowOnClickDrawerBtnRight = () => {}

  /**
   * @param {string} id
   */
  editNodeFlowOnClickEditNode = id => {
    this.setState(({ editNodeFlow }) => ({
      editNodeFlow: {
        ...editNodeFlow,
        editingNodeID: id,
      },
    }))
  }

  /**
   * @param {number} idx
   */
  editNodeFlowOnClickIcon = idx => {
    this.setState(({ editNodeFlow }) => ({
      editNodeFlow: {
        ...editNodeFlow,
        currentlySelectedIconName:
          editNodeFlow.currentlySelectedIconName === AVAILABLE_ICON_NAMES[idx]
            ? null
            : AVAILABLE_ICON_NAMES[idx],
      },
    }))
  }

  editNodeFlowOnClickIconBtn = () => {
    this.setState(({ editNodeFlow, nodes, selectedNodeID }) => {
      const sni = /** @type {string} */ (selectedNodeID)

      return {
        editNodeFlow: {
          ...editNodeFlow,
          currentlySelectedIconName: nodes[sni].iconName,
          editingIcon: true,
        },
      }
    })
  }

  editNodeFlowOnClickLabel = () => {
    this.setState(({ editNodeFlow, nodes, selectedNodeID }) => {
      const sni = /** @type {string} */ (selectedNodeID)

      return {
        editNodeFlow: {
          ...editNodeFlow,
          editingLabelCurrentValue: nodes[sni].label,
          editingLabel: true,
        },
      }
    })
  }

  editNodeFlowToggleDeactivate = () => {
    this.setState(({ editNodeFlow }) => ({
      editNodeFlow: {
        ...editNodeFlow,
        deactivating: !editNodeFlow.deactivating,
      },
    }))
  }

  editNodeFlowToggleReactivate = () => {
    this.setState(({ editNodeFlow }) => ({
      editNodeFlow: {
        ...editNodeFlow,
        reactivating: !editNodeFlow.reactivating,
      },
    }))
  }

  /*
88888888888  88888888ba,    88  888888888888     88888888ba   88888888ba     ,ad8888ba,    88888888ba
88           88      `"8b   88       88          88      "8b  88      "8b   d8"'    `"8b   88      "8b
88           88        `8b  88       88          88      ,8P  88      ,8P  d8'        `8b  88      ,8P
88aaaaa      88         88  88       88          88aaaaaa8P'  88aaaaaa8P'  88          88  88aaaaaa8P'
88"""""      88         88  88       88          88""""""'    88""""88'    88          88  88""""""'
88           88         8P  88       88          88           88    `8b    Y8,        ,8P  88
88           88      .a8P   88       88          88           88     `8b    Y8a.    .a8P   88
88888888888  88888888Y"'    88       88          88           88      `8b    `"Y8888Y"'    88
*/

  /**
   * @private
   * @param {string} id
   */
  editPropFlowOnClickEdit = id => {
    this.setState({
      editPropFlow: {
        ...INITIAL_EDIT_PROP_FLOW,
        selectedPropID: id,
      },
    })
  }

  editPropFlowStopEditing = () => {
    this.setState({
      editPropFlow: INITIAL_EDIT_PROP_FLOW,
    })
  }

  /**
   * @private
   * @param {string} paramID
   */
  editPropFlowOnClickSetting = paramID => {
    // NOTE: This can be the id of the param or the id of an existing arg

    this.setState(({ editPropFlow }) => ({
      editPropFlow: {
        ...editPropFlow,
        selectedSettingParamID: paramID,
      },
    }))
  }

  /**
   * @private
   * @returns {React.ReactNode}
   */
  editPropFlowRenderSettingEditor = () => {
    const paramID = /** @type {string} */ (this.state.editPropFlow
      .selectedSettingParamID)

    const selectedNode = this.state.nodes[
      /** @type {string} */ (this.state.selectedNodeID)
    ]

    const selectedPropDef =
      selectedNode.propDefs[
        /** @type {string} */ (this.state.editPropFlow.selectedPropID)
      ]

    const propType = selectedPropDef.propType

    const selectedParam = propType.params[paramID]

    const maybeMatchingArg = Object.values(selectedPropDef.arguments).find(
      arg => arg.param === selectedParam,
    )

    if (selectedParam.type === 'boolean') {
      if (selectedParam.multiple) {
        const values = maybeMatchingArg
          ? Object.entries(maybeMatchingArg.value.valuesIfMultipleBoolean)
          : []
        return values && 'multiboolean'
      }

      const value = maybeMatchingArg
        ? !!maybeMatchingArg.value.valueIfBoolean
        : false

      return `single boolean : ${value}`
    }

    if (selectedParam.type === 'number') {
      if (selectedParam.multiple) {
        const values = maybeMatchingArg
          ? Object.entries(maybeMatchingArg.value.valuesIfMultipleNumber)
          : []
        return 'multienumber' && values
      }

      const value = maybeMatchingArg
        ? maybeMatchingArg.value.valueIfNumber === null
          ? 'null number'
          : maybeMatchingArg.value.valueIfNumber
        : 'no matching arg for number val'

      return value
    }

    if (selectedParam.type === 'string') {
      if (selectedParam.multiple) {
        const values = maybeMatchingArg
          ? Object.entries(maybeMatchingArg.value.valuesIfMultipleString)
          : []
        return 'multistring' && values
      }

      const value = maybeMatchingArg
        ? maybeMatchingArg.value.valueIfString === null
          ? 'null string'
          : maybeMatchingArg.value.valueIfNumber
        : 'no matching arg for string val'

      return value
    }

    console.assert('unreachable')
    return null
  }

  /*
                        88                                              88                       88                                       
                        88                                              ""                ,d     ""                                       
                        88                                                                88                                              
,adPPYba,  88       88  88,dPPYba,   ,adPPYba,   ,adPPYba,  8b,dPPYba,  88  8b,dPPYba,  MM88MMM  88   ,adPPYba,   8b,dPPYba,   ,adPPYba,  
I8[    ""  88       88  88P'    "8a  I8[    ""  a8"     ""  88P'   "Y8  88  88P'    "8a   88     88  a8"     "8a  88P'   `"8a  I8[    ""  
 `"Y8ba,   88       88  88       d8   `"Y8ba,   8b          88          88  88       d8   88     88  8b       d8  88       88   `"Y8ba,   
aa    ]8I  "8a,   ,a88  88b,   ,a8"  aa    ]8I  "8a,   ,aa  88          88  88b,   ,a8"   88,    88  "8a,   ,a8"  88       88  aa    ]8I  
`"YbbdP"'   `"YbbdP'Y8  8Y"Ybbd8"'   `"YbbdP"'   `"Ybbd8"'  88          88  88`YbbdP"'    "Y888  88   `"YbbdP"'   88       88  `"YbbdP"'  
                                                                            88                                                            
                                                                            88                                                            
*/

  componentDidMount() {
    // @ts-ignore
    nodesNode.on(this.onNodesUpdate)
    // @ts-ignore
    propTypesNode.on(this.onPropTypesUpdate)
  }

  /**
   * @param {Record<string, Node>} nodes
   */
  onNodesUpdate = nodes => {
    this.setState({
      nodes,
    })
  }

  /**
   * @param {Record<string, PropType>} propTypes
   */
  onPropTypesUpdate = propTypes => {
    this.setState({
      propTypes,
    })
  }

  componentWillUnmount() {
    // @ts-ignore
    nodesNode.off(this.onNodesUpdate)
    // @ts-ignore
    propTypesNode.off(this.onPropTypesUpdate)
  }

  closeSnackbar = () => {
    this.setState({
      snackbarMessage: null,
    })
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

        nodesNode
          .set({
            iconName: addNodeFlow.currentlySelectedIconName,
            label: addNodeFormData.currentLabelValue,
            name: addNodeFormData.currentNameValue,
            active: true,
          })
          .then(res => {
            if (res.ok) {
              this.setState({
                addNodeFlow: INITIAL_ADD_NODE_FLOW,
                addNodeFormData: BLANK_ADD_NODE_FORM_DATA,
                snackbarMessage: 'Node created sucessfully',
              })
            } else {
              const newAddNodeFormData = {
                /** @type {string|null} */
                currentLabelErrorMessage: null,
                /** @type {string|null} */
                currentNameErrorMessage: null,
                /**
                 * @type {string[]}
                 */
                messagesIfError: [],
              }

              Object.entries(res.details).forEach(([key, detail]) => {
                if (detail.length === 0) {
                  console.warn('unexpectedly received detail of length 0')
                  return
                }

                if (key === 'label') {
                  const [msg] = detail

                  newAddNodeFormData.currentLabelErrorMessage = msg
                } else if (key === 'name') {
                  const [msg] = detail

                  newAddNodeFormData.currentNameErrorMessage = msg
                } else if (key === 'iconName') {
                  const [msg] = detail

                  newAddNodeFormData.messagesIfError.push(msg)
                } else {
                  console.warn(
                    `received unexpected key in details of response: ${key}`,
                  )
                }
              })

              if (res.messages.length > 0) {
                newAddNodeFormData.messagesIfError.push(...res.messages)
              }

              this.setState(({ addNodeFormData }) => ({
                addNodeFormData: {
                  ...addNodeFormData,
                  ...newAddNodeFormData,
                },
              }))
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
          .finally(() => {
            this.setState(({ addNodeFlow }) => ({
              addNodeFlow: {
                ...addNodeFlow,
                savingNode: false,
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
      const name = AVAILABLE_ICON_NAMES[i]

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

  unselectNode = () => {
    this.setState({
      selectedNodeID: null,
    })
  }

  toggleAddPropDialog = () => {
    this.setState(({ addPropFlow }) => {
      if (addPropFlow.saving) {
        return null
      }

      return {
        addPropFlow: {
          ...INITIAL_ADD_PROP_FLOW,
          dialogOpen: !addPropFlow.dialogOpen,
        },
      }
    })
  }

  onClickDrawerLeftBtn = () => {
    this.setState(
      ({
        currentNodeDrawerTab,
        editNodeFlow,
        editPropFlow,
        selectedNodeID,
      }) => {
        // the more 'in' an screen is, the higher up top here the handling logic
        // for it has to be

        if (editPropFlow.selectedSettingParamID) {
          return {
            currentNodeDrawerTab,
            editNodeFlow,
            editPropFlow: {
              ...editPropFlow,
              selectedSettingParamID: null,
            },
            selectedNodeID,
          }
        }

        if (editPropFlow.selectedPropID) {
          return {
            currentNodeDrawerTab,
            editNodeFlow,
            editPropFlow: INITIAL_EDIT_PROP_FLOW,
            selectedNodeID,
          }
        }

        if (editNodeFlow.editingIcon) {
          return {
            currentNodeDrawerTab,
            editNodeFlow: {
              ...editNodeFlow,
              currentlySelectedIconName: null,
              editingIcon: false,
            },
            editPropFlow,
            selectedNodeID,
          }
        }

        if (editNodeFlow.editingLabel) {
          return {
            currentNodeDrawerTab,
            editNodeFlow: {
              ...editNodeFlow,
              editingLabel: false,
            },
            editPropFlow,
            selectedNodeID,
          }
        }

        return {
          currentNodeDrawerTab: 0,
          editNodeFlow: INITIAL_EDIT_NODE_FLOW,
          editPropFlow,
          selectedNodeID: null,
        }
      },
    )
  }

  onClickDrawerRightBtn = () => {
    const { editNodeFlow, selectedNodeID } = this.state

    if (editNodeFlow.editingLabel) {
      nodesNode
        .get(/** @type {string} */ (selectedNodeID))
        .put({
          label: editNodeFlow.editingLabelCurrentValue,
        })
        .then(res => {
          console.log(res)
        })

      this.setState(({ editNodeFlow }) => ({
        editNodeFlow: {
          ...editNodeFlow,
          editingLabel: false,
        },
      }))
    }

    if (editNodeFlow.editingIcon) {
      const { editNodeFlow, selectedNodeID } = this.state

      nodesNode
        .get(/** @type {string} */ (selectedNodeID))
        .put({
          iconName:
            /** @type {string} */ (editNodeFlow.currentlySelectedIconName),
        })
        .then(res => {
          console.log(res)
        })

      this.setState(({ editNodeFlow }) => ({
        editNodeFlow: {
          ...editNodeFlow,
          editingIcon: false,
        },
      }))
    }
  }

  /*
                                                          88
                                                          88
                                                          88
8b,dPPYba,   ,adPPYba,   ,adPPYba,   8b,dPPYba,   ,adPPYb,88   ,adPPYba,  8b,dPPYba,
88P'   "Y8  a8P_____88  a8"     "8a  88P'   "Y8  a8"    `Y88  a8P_____88  88P'   "Y8
88          8PP"""""""  8b       d8  88          8b       88  8PP"""""""  88
88          "8b,   ,aa  "8a,   ,a8"  88          "8a,   ,d88  "8b,   ,aa  88
88           `"Ybbd8"'   `"YbbdP"'   88           `"8bbdP"Y8   `"Ybbd8"'  88
*/

  /** @private */
  toggleReorderProps = () => {
    this.setState(({ isReorderingProps }) => ({
      isReorderingProps: !isReorderingProps,
    }))
  }

  /**
   * @private
   * @param {number} oldIndex
   * @param {number} newIndex
   */
  onReorderEnd = (oldIndex, newIndex) => {
    console.log(`onReorderEnd: ${oldIndex} -> ${newIndex}`)
  }

  //                                               88
  // 8b,dPPYba,   ,adPPYba,  8b,dPPYba,    ,adPPYb,88   ,adPPYba,  8b,dPPYba,
  // 88P'   "Y8  a8P_____88  88P'   `"8a  a8"    `Y88  a8P_____88  88P'   "Y8
  // 88          8PP"""""""  88       88  8b       88  8PP"""""""  88
  // 88          "8b,   ,aa  88       88  "8a,   ,d88  "8b,   ,aa  88
  // 88           `"Ybbd8"'  88       88   `"8bbdP"Y8   `"Ybbd8"'  88

  render() {
    const { classes } = this.props
    const {
      addNodeFlow,
      addPropFlow,
      addNodeFormData,
      currentNodeDrawerTab,
      editNodeFlow,
      editPropFlow,
      isReorderingProps,
      nodes,
      propTypes,
      selectedNodeID,
      snackbarMessage,
    } = this.state

    const validAddNodeFormData =
      addNodeFormData.currentLabelErrorMessage === null &&
      addNodeFormData.currentLabelValue.length > 0 &&
      addNodeFormData.currentNameErrorMessage === null &&
      addNodeFormData.currentNameValue.length > 0

    const selectedNode =
      typeof selectedNodeID === 'string' && nodes[selectedNodeID]

    const selectedPropDef =
      selectedNode &&
      selectedNode.propDefs[/** @type {string} */ (editPropFlow.selectedPropID)]

    const addNodeSelectedIconIdx =
      addNodeFlow.currentlySelectedIconName === null
        ? null
        : AVAILABLE_ICON_NAMES.indexOf(addNodeFlow.currentlySelectedIconName)

    const addPropFlowSelectedIconIdx =
      addPropFlow.currentlySelectedIconName === null
        ? null
        : AVAILABLE_ICON_NAMES.indexOf(addPropFlow.currentlySelectedIconName)

    const editNodeFlowSelectedIconIdx =
      editNodeFlow.currentlySelectedIconName === null
        ? null
        : AVAILABLE_ICON_NAMES.indexOf(editNodeFlow.currentlySelectedIconName)

    const activeNodes = Object.entries(nodes).filter(([_, node]) => node.active)
    const unusedNodes = Object.entries(nodes).filter(
      ([_, node]) => !node.active,
    )

    return (
      <React.Fragment>
        <Dialog
          rightActionButtonText={addPropFlow.selectingIcon ? 'Save' : 'Next'}
          disableRightActionButton={
            addPropFlow.saving ||
            (addPropFlow.currentlySelectedIconName === null &&
              addPropFlow.selectingIcon) ||
            !!addPropFlow.labelError ||
            !!addPropFlow.nameError ||
            addPropFlow.labelValue.length === 0 ||
            addPropFlow.nameValue.length === 0 ||
            addPropFlow.typeValue === ''
          }
          disableLeftActionButton={addPropFlow.saving}
          onClickLeftActionButton={this.addPropFlowOnClickLeftACtion}
          handleClose={this.toggleAddPropDialog}
          onClickRightActionButton={this.addPropFlowOnClickAction}
          showBackArrow={addPropFlow.selectingIcon}
          showCloseButton={!addPropFlow.selectingIcon}
          open={addPropFlow.dialogOpen}
          title={'Add Property'}
        >
          <OverlaySpinner showSpinner={addPropFlow.saving}>
            {addPropFlow.selectingIcon ? (
              <IconSelector
                icons={AVAILABLE_ICONS}
                onClickIcon={this.addPropFlowOnClickIcon}
                selectedIconIdx={addPropFlowSelectedIconIdx}
              />
            ) : (
              <AddPropForm
                availableTypes={Object.values(propTypes).map(pt => pt.name)}
                disableLabelInput={addPropFlow.saving}
                disableNameInput={addPropFlow.saving}
                disableTypeSelection={addPropFlow.saving}
                labelValue={addPropFlow.labelValue}
                labelErrorMessage={addPropFlow.labelError}
                nameErrorMessage={addPropFlow.nameError}
                nameValue={addPropFlow.nameValue}
                typeValue={addPropFlow.typeValue}
                onLabelChange={this.addPropFormOnLabelChange}
                onNameChange={this.addPropFormOnNameChange}
                onTypeChange={this.addPropFormOnTypeChange}
              />
            )}
          </OverlaySpinner>
        </Dialog>
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
              onClick={this.closeSnackbar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />

        {/* 88                                                                      
         88                                                                      
         88                                                                      
 ,adPPYb,88  8b,dPPYba,  ,adPPYYba,  8b      db      d8   ,adPPYba,  8b,dPPYba,  
a8"    `Y88  88P'   "Y8  ""     `Y8  `8b    d88b    d8'  a8P_____88  88P'   "Y8  
8b       88  88          ,adPPPPP88   `8b  d8'`8b  d8'   8PP"""""""  88          
"8a,   ,d88  88          88,    ,88    `8bd8'  `8bd8'    "8b,   ,aa  88          
 `"8bbdP"Y8  88          `"8bbdP"Y8      YP      YP       `"Ybbd8"'  88*/}

        {selectedNodeID && selectedNode && (
          <PcDrawer
            title={selectedNode.label}
            open
            leftButtonOnClick={this.onClickDrawerLeftBtn}
            rightButtonOnClick={this.onClickDrawerRightBtn}
            rightButtonText={(() => {
              if (
                editNodeFlow.editingIcon &&
                editNodeFlow.currentlySelectedIconName !== null
              ) {
                return 'select'
              }

              if (editNodeFlow.editingLabel) {
                return 'save'
              }

              return undefined
            })()}
            tabs={AVAILABLE_TABS_NAMES}
            tabsCurrentValue={currentNodeDrawerTab}
            tabsOnChange={this.handleNodeDrawerTabChange}
            hideTabs={
              editNodeFlow.editingLabel ||
              editNodeFlow.editingIcon ||
              !!editPropFlow.selectedPropID ||
              !!editPropFlow.selectedSettingParamID
            }
          >
            {currentNodeDrawerTab === NodeDrawerTab.Details &&
              !editNodeFlow.editingIcon &&
              !editNodeFlow.editingLabel && (
                <div className={classes.nodeEditorContainer}>
                  <NodeEditor
                    onClickDeactivate={this.editNodeFlowToggleDeactivate}
                    onClickIcon={this.editNodeFlowOnClickIconBtn}
                    onClickLabel={this.editNodeFlowOnClickLabel}
                    onClickReactivate={this.editNodeFlowToggleReactivate}
                    icon={
                      nameToIconMap[nodes[selectedNodeID].iconName].outlined
                    }
                    isNodeActive={nodes[selectedNodeID].active}
                    label={nodes[selectedNodeID].label}
                  />
                </div>
              )}

            {editNodeFlow.editingIcon && (
              <IconSelector
                icons={AVAILABLE_ICONS}
                onClickIcon={this.editNodeFlowOnClickIcon}
                selectedIconIdx={editNodeFlowSelectedIconIdx}
              />
            )}

            {editNodeFlow.editingLabel && (
              <TextField
                autoFocus
                className={classes.labelEditorTextField}
                onChange={this.editNodeFlowOnChangeLabelTextField}
                value={editNodeFlow.editingLabelCurrentValue}
                type="search"
                variant="outlined"
              />
            )}

            {currentNodeDrawerTab === NodeDrawerTab.Properties &&
              !editPropFlow.selectedPropID && (
                <PropDefsOverview
                  onReorderEnd={this.onReorderEnd}
                  onClickReorder={this.toggleReorderProps}
                  isReordering={isReorderingProps}
                  onClickAdd={this.toggleAddPropDialog}
                  onClickEdit={this.editPropFlowOnClickEdit}
                  propDefs={Object.entries(selectedNode.propDefs).map(
                    ([id, propDef]) => ({
                      id,
                      icon: nameToIconMap[propDef.iconName]
                        ? nameToIconMap[propDef.iconName].filled
                        : null,
                      label: propDef.label,
                      typeName:
                        typeToReadableName[propDef.propType.name] ||
                        propDef.propType.name,
                      unused: propDef.unused,
                    }),
                  )}
                />
              )}

            {editPropFlow.selectedPropID &&
              selectedPropDef &&
              !editPropFlow.selectedSettingParamID && (
                <PropDefEditor
                  settings={getSettingsForPropDefEditor(selectedPropDef)}
                  helpText={selectedPropDef.helpText}
                  icon={
                    selectedPropDef.iconName &&
                    nameToIconMap[selectedPropDef.iconName]
                      ? nameToIconMap[selectedPropDef.iconName].outlined
                      : null
                  }
                  isIndexed={selectedPropDef.indexed}
                  label={selectedPropDef.label}
                  required={selectedPropDef.required}
                  onClickSetting={this.editPropFlowOnClickSetting}
                />
              )}

            {!!editPropFlow.selectedSettingParamID &&
              this.editPropFlowRenderSettingEditor()}

            {currentNodeDrawerTab === NodeDrawerTab.Relationships &&
              'relationships'}
          </PcDrawer>
        )}

        {/*
                     88           88                                        88z
                     88           88                                        88
                     88           88                                        88
,adPPYYba,   ,adPPYb,88   ,adPPYb,88     8b,dPPYba,    ,adPPYba,    ,adPPYb,88   ,adPPYba,
""     `Y8  a8"    `Y88  a8"    `Y88     88P'   `"8a  a8"     "8a  a8"    `Y88  a8P_____88
,adPPPPP88  8b       88  8b       88     88       88  8b       d8  8b       88  8PP"""""""
88,    ,88  "8a,   ,d88  "8a,   ,d88     88       88  "8a,   ,a8"  "8a,   ,d88  "8b,   ,aa
`"8bbdP"Y8   `"8bbdP"Y8   `"8bbdP"Y8     88       88   `"YbbdP"'    `"8bbdP"Y8   `"Ybbd8"'

                                                                                             */}
        <Dialog
          disableLeftActionButton={addNodeFlow.savingNode}
          disableRightActionButton={
            !validAddNodeFormData ||
            addNodeFlow.savingNode ||
            (addNodeFlow.currentlySelectedIconName === null &&
              addNodeFlow.selectingIcon)
          }
          onClickRightActionButton={this.handleAddNodeAction}
          onClickLeftActionButton={
            (addNodeFlow.selectingIcon && this.addNodeFlowOnClickLeftAction) ||
            undefined
          }
          handleClose={this.closeAddNodeDialog}
          showBackArrow={addNodeFlow.selectingIcon}
          showCloseButton={!addNodeFlow.selectingIcon}
          open={addNodeFlow.showingAddNodeDialog}
          rightActionButtonText={addNodeFlow.selectingIcon ? 'Save' : 'Next'}
          rightActionButtonColorPrimary
          title={addNodeFlow.selectingIcon ? 'Select Icon' : 'Add Node'}
        >
          <OverlaySpinner showSpinner={addNodeFlow.savingNode}>
            {addNodeFlow.selectingIcon ? (
              <IconSelector
                icons={AVAILABLE_ICONS}
                onClickIcon={this.addNodeOnClickIcon}
                selectedIconIdx={addNodeSelectedIconIdx}
              />
            ) : (
              <React.Fragment>
                <AddNodeForm
                  currentLabelErrorMessage={
                    addNodeFormData.currentLabelErrorMessage
                  }
                  currentLabelValue={addNodeFormData.currentLabelValue}
                  currentNameErrorMessage={
                    addNodeFormData.currentNameErrorMessage
                  }
                  currentNameValue={addNodeFormData.currentNameValue}
                  onLabelChange={this.addNodeFormOnLabelChange}
                  onNameChange={this.addNodeFormOnNameChange}
                  disableLabelInput={addNodeFlow.savingNode}
                  disableNameInput={addNodeFlow.savingNode}
                />

                {addNodeFormData.messagesIfError && (
                  <div style={{ marginTop: '20px' }}>
                    <Messages messages={addNodeFormData.messagesIfError} />
                  </div>
                )}
              </React.Fragment>
            )}
          </OverlaySpinner>
        </Dialog>

        {/*
                                 88                                    88                            
                          ,d     ""                             ,d     ""                            
                          88                                    88                                   
,adPPYYba,   ,adPPYba,  MM88MMM  88  8b       d8  ,adPPYYba,  MM88MMM  88   ,adPPYba,   8b,dPPYba,   
""     `Y8  a8"     ""    88     88  `8b     d8'  ""     `Y8    88     88  a8"     "8a  88P'   `"8a  
,adPPPPP88  8b            88     88   `8b   d8'   ,adPPPPP88    88     88  8b       d8  88       88  
88,    ,88  "8a,   ,aa    88,    88    `8b,d8'    88,    ,88    88,    88  "8a,   ,a8"  88       88  
`"8bbdP"Y8   `"Ybbd8"'    "Y888  88      "8"      `"8bbdP"Y8    "Y888  88   `"YbbdP"'   88       88  
         88  88              88                                       
         88  ""              88                                       
         88                  88                                       
 ,adPPYb,88  88  ,adPPYYba,  88   ,adPPYba,    ,adPPYb,d8  ,adPPYba,  
a8"    `Y88  88  ""     `Y8  88  a8"     "8a  a8"    `Y88  I8[    ""  
8b       88  88  ,adPPPPP88  88  8b       d8  8b       88   `"Y8ba,   
"8a,   ,d88  88  88,    ,88  88  "8a,   ,a8"  "8a,   ,d88  aa    ]8I  
 `"8bbdP"Y8  88  `"8bbdP"Y8  88   `"YbbdP"'    `"YbbdP"Y8  `"YbbdP"'  
                                               aa,    ,88             
                                                "Y8bbdP"              
*/}

        <Dialog
          handleClose={this.editNodeFlowToggleDeactivate}
          showCloseButton
          rightActionButtonText="confirm"
          title="DEACTIVATE"
          open={editNodeFlow.deactivating}
          onClickRightActionButton={this.editNodeFlowOnClickConfirmDeactivate}
          rightActionButtonColorRed
        >
          {DEACTIVATING_NODE_EXPLANATION_TEXT}
        </Dialog>

        <Dialog
          handleClose={this.editNodeFlowToggleReactivate}
          showCloseButton
          rightActionButtonText="confirm"
          title="REACTIVATE"
          open={editNodeFlow.reactivating}
          onClickRightActionButton={this.editNodeFlowOnClickConfirmReactivate}
          rightActionButtonColorPrimary
        >
          {REACTIVATING_NODE_EXPLANATION_TEXT}
        </Dialog>

        {/*
888b      88    ,ad8888ba,    88888888ba,    88888888888  ad88888ba   
8888b     88   d8"'    `"8b   88      `"8b   88          d8"     "8b  
88 `8b    88  d8'        `8b  88        `8b  88          Y8,          
88  `8b   88  88          88  88         88  88aaaaa     `Y8aaaaa,    
88   `8b  88  88          88  88         88  88"""""       `"""""8b,  
88    `8b 88  Y8,        ,8P  88         8P  88                  `8b  
88     `8888   Y8a.    .a8P   88      .a8P   88          Y8a     a8P  
88      `888    `"Y8888Y"'    88888888Y"'    88888888888  "Y88888P"   
*/}

        <Page titleText="Nodes And Properties">
          <div className={classes.root}>
            <div>
              <Grid container className={classes.nodesContainer} spacing={24}>
                {activeNodes.map(([id, node]) => {
                  const Icon = nameToIconMap[node.iconName]

                  return (
                    <Grid
                      className={classes.pointerCursor}
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      key={id}
                      // TODO: fix callback in render()
                      onClick={() => {
                        this.onClickNode(id)
                      }}
                    >
                      <Card>
                        <CardActionArea>
                          <CardHeader
                            avatar={
                              Icon && (
                                <Avatar aria-label="icon">
                                  <Icon.outlined />
                                </Avatar>
                              )
                            }
                            title={node.label}
                            subheader={node.name}
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                  )
                })}
              </Grid>

              <IconButton
                onClick={this.addNodeFlowToggleDialog}
                aria-label="Plus"
              >
                <AddCircleOutline fontSize="small" color="primary" />
              </IconButton>
            </div>

            {unusedNodes.length > 0 && (
              <Typography variant="subtitle1">UNUSED NODES</Typography>
            )}

            <Grid container className={classes.nodesContainer}>
              {unusedNodes.map(([id, node]) => {
                const Icon = nameToIconMap[node.iconName]

                return (
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
                    <Card>
                      <CardActionArea>
                        <CardHeader
                          avatar={
                            Icon && (
                              <Avatar aria-label="icon">
                                <Icon.outlined />
                              </Avatar>
                            )
                          }
                          title={node.label}
                          subheader={node.name}
                        />
                      </CardActionArea>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </div>
        </Page>
      </React.Fragment>
    )
  }
}

/**
 * @param {import('app/typings').PropertyDefinition} propDef
 * @returns {import('components/PropDefEditor').Setting[]}
 */
const getSettingsForPropDefEditor = propDef =>
  Object.entries(propDef.propType.params).map(([id, param]) => {
    const paramName = param.name
    const paramType = param.type
    const multiple = param.multiple

    // TODO: check this actually works, especially because of equality operator
    const maybeArgEntry = Object.entries(propDef.arguments).find(
      ([_, arg]) => arg.param == param,
    )

    const maybeArg = maybeArgEntry && maybeArgEntry[1]

    if (paramType === 'boolean') {
      if (multiple) {
        // I Suspect there wont be many multiple boolean arg values
        return {
          settingValueOrValues: 'Click to edit',
          id,
          paramName,
        }
      } else {
        return {
          settingValueOrValues: maybeArg
            ? !!maybeArg.value.valueIfBoolean
            : false,
          id,
          paramName,
        }
      }
    }

    if (paramType === 'number') {
      if (multiple) {
        return {
          settingValueOrValues: maybeArg
            ? Object.values(maybeArg.value.valuesIfMultipleNumber).map(n =>
                n.toString(),
              )
            : [],
          id,
          paramName,
        }
      } else {
        return {
          settingValueOrValues: maybeArg
            ? maybeArg.value.valueIfNumber === null
              ? 'Non set'
              : maybeArg.value.valueIfNumber.toString()
            : 'Non set',
          id,
          paramName,
        }
      }
    }

    if (paramType === 'string') {
      if (multiple) {
        return {
          settingValueOrValues: maybeArg
            ? Object.values(maybeArg.value.valuesIfMultipleString)
            : [],
          id,
          paramName,
        }
      } else {
        return {
          settingValueOrValues: maybeArg
            ? maybeArg.value.valueIfString === null
              ? ''
              : maybeArg.value.valueIfString
            : '',
          id,
          paramName,
        }
      }
    }

    return {
      settingValueOrValues: '',
      id,
      paramName,
    }
  })

export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {import('@material-ui/core/styles').StyleRulesCallback<Classes>} */ (styles),
)(NodesAndProps)
