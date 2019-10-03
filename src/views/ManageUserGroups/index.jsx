import React from 'react'

//material-ui components
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { Grid, TextField, Typography, Divider } from '@material-ui/core'
import GroupEditor from 'components/GroupEditor'
import PcDrawer from 'components/PcDrawer'

import * as Utils from 'common/utils'
import Add from '@material-ui/icons/Add'
import Dialog from 'components/Dialog'
import OverlaySpinner from 'components/OverlaySpinner'
import AddGroupForm from 'components/AddGroupForm'
import { userGroups as groupGroups } from 'app'

/**
 * @typedef {import('@material-ui/core').Theme} Theme
 * @typedef {import('@material-ui/core/TextField').BaseTextFieldProps} BaseTextFieldProps
 */
/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRulesCallback<K>} StyleRulesCallback
 */

//Material-ui icons
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

//project files
import Page from 'views/Page/Page'

//styles
import groupStyles from './groupStyles.js'
import Messages from 'components/Messages/index.jsx'
import { Switch, Route, Link } from 'react-router-dom'
import { userGroupsList } from 'state/userGroups/user_data.js'
import ListToolbar from '../../components/ListToolbar'

import _ from 'lodash'

/**
 * @typedef {import('../../components/ListToolbar').Props} ListToolbarProps
 * @typedef {import('../../components/StatusFilterMenu').Status} Filter
 */

/**
 * @typedef {import('app/typings').UserGroup} UserGroup
 * @typedef {import('app/gun-wrapper/simple-typings').WrapperSetGroup} WrapperSetGroup
 * @typedef {import('app/gun-wrapper/simple-typings').WrapperGroup} WrapperGroup
 * @typedef {import('app/gun-wrapper/simple-typings').Response} Response
 * */

const GroupDrawerTab = {
  Details: 0,
  Permissions: 1,
  Members: 2,
}

const AVAILABLE_TABS_NAMES = Object.keys(GroupDrawerTab)

const DEACTIVATING_GROUP_EXPLANATION_TEXT =
  'Deactivating a node prevents \
adding new records to it, either by you or other employees. Properties and \
relationships can still be edited. Please note, due to the nature of the app \
(offline first) this change can take some time to propagate to employees, and \
those who are currently offline will be able to add records to the node until \
they become online again.'

const REACTIVATING_GROUP_EXPLANATION_TEXT =
  'Reactivating a node allows for \
records to be added to it again, either by you or other employees. Please \
note, due to the nature of the app (offline first) this change can take some \
time to propagate to employees, and those who are currently offline wont be \
able to add records to the node until they become online again.'

/** @type {AddGroupFormData} */
const BLANK_ADD_GROUP_FORM_DATA = Object.freeze({
  currentDescErrorMessage: null,
  currentDescValue: '',
  currentNameErrorMessage: null,
  currentNameValue: '',
  detailsIfError: null,
  messagesIfError: null,
})

/** @type {AddGroupFlow} */
const INITIAL_ADD_GROUP_FLOW = Object.freeze({
  savingGroup: false,
  showingAddGroupDialog: false,
})

/** @type {EditGroupFlow} */
const INITIAL_EDIT_GROUP_FLOW = {
  currentDescValue: null,
  deactivating: false,
  editingDesc: false,
  editingName: false,
  editingDescCurrentValue: '',
  editingNameCurrentValue: '',
  reactivating: false,
  selectedGroupID: null,
}

/**
 * @typedef {keyof ReturnType<typeof groupStyles>} Classes
 */

/**
 * @template T
 * @typedef {object} Props
 * @prop {Record<Classes, string>} classes
 * @prop {'user-groups'} component
 * @prop {((item: T) => Filter)=} extractFilterable (Optional) Must be provided
 * for the filter mechanism to work, this function should return an object with
 * `displayValue` and `value` props for each item of the list. `displayValue` is
 * what will be shown in the UI, and `value` is what will be actually used for
 * filtering. This function should be pure, as an initial map over the items
 * will be used for getting all possible filtering values.
 * @prop {((item: T) => number)=} extractID (Optional) Extract the id from the
 * item, this will be passed as the first argument to the `onClickItem` prop.
 * Index will be used if not be provided.
 * @prop {((item: T) => string)=} extractSubtitle (Optional) Extract the
 * subtitle from the item. If not provided, no subtitle will be rendered.
 * @prop {(item: T) => string} extractTitle Extract the title to be rendered.
 * @prop {T[]} items The items that will be rendered.
 * @prop {((nextSearchTerm: string) => void)=} onChangeSearchTerm (Optional) If
 * provided, gets called with the next search term inputted into the search
 * field.
 * @prop {(() => void)=} onClickAdd
 * @prop {ListToolbarProps['onClickDownload']=} onClickDownload
 * @prop {((itemID: number) => void)=} onClickItem (Optional) Gets called with
 * the ID of the item (if the `extractID` prop is defined), otherwise the
 * function will be passed the index of the item.
 * @prop {number[]=} selectedIDs (Optional) If provided, the items with these
 * IDs will be highlighted.
 * @prop {(boolean|null)=} showToolbar (Optional) If set to true, an utility
 * toolbar will be provided, it includes some add and download action icons, a
 * toggeable search field and a toggeable pop-over filter menu.
 */

/**
 * @typedef {object} AddGroupFlow
 * @prop {boolean} savingGroup
 * @prop {boolean} showingAddGroupDialog
 */

/**
 * @typedef {object} AddGroupFormData
 * @prop {string|null} currentDescErrorMessage
 * @prop {string} currentDescValue
 * @prop {string|null} currentNameErrorMessage
 * @prop {string} currentNameValue
 * @prop {Record<'name'|'description', string[]|undefined>|null} detailsIfError
 * @prop {string[]|null} messagesIfError
 */

/**
 * @typedef {object} EditGroupFlow
 * @prop {boolean} deactivating
 * @prop {string|null} currentDescValue Null when not editing it
 * @prop {boolean} editingDesc
 * @prop {boolean} editingName
 * @prop {string} editingDescCurrentValue
 * @prop {string} editingNameCurrentValue
 * @prop {boolean} reactivating
 * @prop {string|null} selectedGroupID
 */

export {} // stop jsdoc comments from merging

/**
 * @typedef {object} State
 * @prop {AddGroupFlow} addGroupFlow
 * @prop {AddGroupFormData} addGroupFormData
 * @prop {Record<string, UserGroup>} userGroups
 * @prop {number} currentGroupDrawerTab
 * @prop {EditGroupFlow} editGroupFlow
 * @prop {string|null} selectedGroupID Non-null when editing a group's property
 * definitions or relationships definitions.
 * @prop {string|null} snackbarMessage
 * @prop {string|undefined} currentFilter If null, the list is not filtered, if it's
 * an string, the list will be filtered according to the `extractFilterable`
 * prop.
 * @prop {boolean} filterMenuOpen
 * @prop {boolean} searchActive
 */

/**
 * @augments React.Component<Props, State>
 */

/**
 * @template T
 * @augments React.PureComponent<Props<T>, State>
 */
class ManageUserGroups extends React.Component {
  /**
   * @type {State}
   */
  state = {
    addGroupFlow: {
      savingGroup: false,
      showingAddGroupDialog: false,
    },
    addGroupFormData: BLANK_ADD_GROUP_FORM_DATA,
    currentGroupDrawerTab: GroupDrawerTab.Details,
    editGroupFlow: INITIAL_EDIT_GROUP_FLOW,
    userGroups: {},
    selectedGroupID: null,
    snackbarMessage: null,
    currentFilter: undefined,
    filterMenuOpen: false,
    searchActive: false,
  }
  /**
   * @private
   * @type {Filter[]}
   */
  possibleFilters = []

  /**
   * A ref for the filter icon button, this ref is used for attaching the filter
   * pop-over menu to it, (that is, it will appear alongside it when open).
   * @type {React.RefObject<SVGSVGElement>}
   */
  filterIconRef = React.createRef()

  /**
   * @param {Props<T>} props
   */
  constructor(props) {
    super(props)

    this.refreshPossiblefilters()
  }

  /**
   * @param {Props<T>} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items) {
      this.refreshPossiblefilters()
    }
  }

  /**
   * @private
   * @param {any} e
   */
  genericErrHandler = e => {
    this.setState({
      snackbarMessage: Utils.reasonToString(e),
    })
  }
  /**
   * @private
   * @param {Response} res
   */
  genericResHandler = res => {
    if (!res.ok) {
      if (res.messages.length) {
        this.setState({
          snackbarMessage: res.messages[0],
        })
      } else if (Object.keys(res.details).length) {
        const [detail] = Object.entries(res.details)
        const [key, msg] = detail

        this.setState({
          snackbarMessage: `${key}: ${msg}`,
        })
      }
    }
  }

  /**
   * @private
   * @param {string} id
   */
  onClickGroup = id => {
    this.setState({
      selectedGroupID: id,
    })
  }

  /**
   * @private
   **/
  toggleAddGroupDialog = () => {
    this.setState(({ addGroupFlow }) => ({
      addGroupFlow: {
        ...addGroupFlow,
        showingAddGroupDialog: !addGroupFlow.showingAddGroupDialog,
      },
    }))
  }

  /**
   * @private
   */
  addGroupFlowToggleDialog = () => {
    this.setState(({ addGroupFlow }) => ({
      addGroupFlow: {
        ...INITIAL_ADD_GROUP_FLOW,
        showingAddGroupDialog: !addGroupFlow.showingAddGroupDialog,
      },
      addGroupFormData: BLANK_ADD_GROUP_FORM_DATA,
    }))
  }

  /**
   * @private
   * @param {string} nextNameValue
   */
  addGroupFormOnNameChange = nextNameValue => {
    /**
     * @type {string}
     */
    let err

    this.setState(({ addGroupFormData }) => ({
      addGroupFormData: {
        ...addGroupFormData,
        currentNameValue: nextNameValue,
        currentNameErrorMessage: err || null,
      },
    }))
  }
  /**
   * @private
   * @param {string} nextDescValue
   */
  addGroupFormOnDescChange = nextDescValue => {
    /**
     * @type {string}
     */
    let err

    this.setState(({ addGroupFormData }) => ({
      addGroupFormData: {
        ...addGroupFormData,
        currentDescValue: nextDescValue,
        currentDescErrorMessage: err || null,
      },
    }))
  }

  componentDidMount() {
    // @ts-ignore
    groupGroups.on(this.onGroupsUpdate)
  }

  /**
   * @param {Record<string, UserGroup>} userGroups
   */
  onGroupsUpdate = userGroups => {
    this.setState({
      userGroups,
    })
  }

  closeSnackbar = () => {
    this.setState({
      snackbarMessage: null,
    })
  }

  async componentWillUnmount() {
    // @ts-ignore
    groupGroups.off(this.onGroupsUpdate)
  }

  /**
   * @private
   * @param {string} id
   */
  editGroupFlowOnClickEdit = id => {
    this.setState({
      editGroupFlow: {
        ...INITIAL_EDIT_GROUP_FLOW,
        selectedGroupID: id,
      },
    })
  }

  /**
   * @private
   */
  editGroupFlowSaveDescValue = () => {
    const { editGroupFlow, selectedGroupID } = this.state

    const value = /** @type {string} */ editGroupFlow.currentDescValue

    groupGroups
      .get(/** @type {string} */ (selectedGroupID))
      .getSet('propDefs')
      .get(/** @type {string} */ (editGroupFlow.selectedGroupID))
      .put({
        description: value,
      })
      .then(this.genericResHandler)
      .catch(this.genericErrHandler)
  }

  handleAddGroup = () => {
    this.setState(
      ({ addGroupFlow }) => ({
        addGroupFlow: {
          ...addGroupFlow,
          savingGroup: true,
        },
      }),
      () => {
        const { addGroupFormData } = this.state

        groupGroups
          .set({
            description: addGroupFormData.currentDescValue,
            name: addGroupFormData.currentNameValue,
            active: true,
          })
          .then(res => {
            if (res.ok) {
              this.setState({
                addGroupFlow: INITIAL_ADD_GROUP_FLOW,
                addGroupFormData: BLANK_ADD_GROUP_FORM_DATA,
                snackbarMessage: 'Group created successfully',
              })
            } else {
              const newAddGroupFormData = {
                /** @type {string|null} */
                currentDescErrorMessage: null,
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

                if (key === 'description') {
                  const [msg] = detail

                  newAddGroupFormData.currentDescErrorMessage = msg
                } else if (key === 'name') {
                  const [msg] = detail

                  newAddGroupFormData.messagesIfError.push(msg)
                } else {
                  console.warn(
                    `received unexpected key in details of response: ${key}`,
                  )
                }
              })

              if (res.messages.length > 0) {
                newAddGroupFormData.messagesIfError.push(...res.messages)
              }

              this.setState(({ addGroupFormData }) => ({
                addGroupFormData: {
                  ...addGroupFormData,
                  ...newAddGroupFormData,
                },
              }))
            }
          })
          .catch(e => {
            /** @type {string} */
            const msg = typeof e === 'string' ? e : e.message

            this.setState(({ addGroupFormData }) => ({
              addGroupFormData: {
                ...addGroupFormData,
                messagesIfError: [msg],
              },
            }))
          })
          .finally(() => {
            this.setState(({ addGroupFlow }) => ({
              addGroupFlow: {
                ...addGroupFlow,
                savingGroup: false,
                showingAddGroupDialog: false,
              },
            }))
          })
      },
    )
  }

  /**
   * @private
   * @type {import('@material-ui/core/Tabs').TabsProps['onChange']}
   */
  handleGroupDrawerTabChange = (_, tab) => {
    this.setState({
      currentGroupDrawerTab: tab,
    })
  }

  /**
   * @type {import('@material-ui/core/TextField').TextFieldProps['onChange']}
   */
  editGroupFlowOnChangeDescTextField = e => {
    // @ts-ignore
    const editingDescCurrentValue = e.target.value

    this.setState(({ editGroupFlow }) => ({
      editGroupFlow: {
        ...editGroupFlow,
        editingDescCurrentValue,
      },
    }))
  }

  /**
   * @type {import('@material-ui/core/TextField').TextFieldProps['onChange']}
   */
  editGroupFlowOnChangeNameTextField = e => {
    // @ts-ignore
    const editingNameCurrentValue = e.target.value

    this.setState(({ editGroupFlow }) => ({
      editGroupFlow: {
        ...editGroupFlow,
        editingNameCurrentValue,
      },
    }))
  }

  editGroupFlowOnClickConfirmDeactivate = () => {
    groupGroups
      .get(/** @type {string} */ (this.state.selectedGroupID))
      .put({
        active: false,
      })
      .then(res => {
        console.log(res)
      })

    this.setState({
      editGroupFlow: INITIAL_EDIT_GROUP_FLOW,
    })
  }

  editGroupFlowToggleDeactivate = () => {
    this.setState(({ editGroupFlow }) => ({
      editGroupFlow: {
        ...editGroupFlow,
        deactivating: !editGroupFlow.deactivating,
      },
    }))
  }

  editGroupFlowOnClickConfirmReactivate = () => {
    groupGroups
      .get(/** @type {string} */ (this.state.selectedGroupID))
      .put({
        active: true,
      })
      .then(res => {
        console.log(res)
      })

    this.setState({
      editGroupFlow: INITIAL_EDIT_GROUP_FLOW,
    })
  }

  editGroupFlowToggleReactivate = () => {
    this.setState(({ editGroupFlow }) => ({
      editGroupFlow: {
        ...editGroupFlow,
        reactivating: !editGroupFlow.reactivating,
      },
    }))
  }

  editGroupFlowOnClickDesc = () => {
    this.setState(({ editGroupFlow, userGroups, selectedGroupID }) => {
      const sni = /** @type {string} */ (selectedGroupID)

      return {
        editGroupFlow: {
          ...editGroupFlow,
          editingDescCurrentValue: userGroups[sni].description,
          editingDesc: true,
        },
      }
    })
  }

  editGroupFlowOnClickName = () => {
    this.setState(({ editGroupFlow, userGroups, selectedGroupID }) => {
      const sni = /** @type {string} */ (selectedGroupID)

      return {
        editGroupFlow: {
          ...editGroupFlow,
          editingNameCurrentValue: userGroups[sni].name,
          editingName: true,
        },
      }
    })
  }

  closeAddGroupDialog = () => {
    this.setState({
      addGroupFlow: INITIAL_ADD_GROUP_FLOW,
      addGroupFormData: BLANK_ADD_GROUP_FORM_DATA,
    })
  }

  unselectGroup = () => {
    this.setState({
      selectedGroupID: null,
    })
  }

  onClickDrawerLeftBtn = () => {
    this.setState(
      ({ currentGroupDrawerTab, editGroupFlow, selectedGroupID }) => {
        if (editGroupFlow.editingDesc) {
          return {
            currentGroupDrawerTab,
            editGroupFlow: {
              ...editGroupFlow,
              editingDesc: false,
            },
            selectedGroupID,
          }
        }

        if (editGroupFlow.editingName) {
          return {
            currentGroupDrawerTab,
            editGroupFlow: {
              ...editGroupFlow,
              editingName: false,
            },
            selectedGroupID,
          }
        }

        if (editGroupFlow.selectedGroupID) {
          return {
            currentGroupDrawerTab,
            editGroupFlow: INITIAL_EDIT_GROUP_FLOW,
            selectedGroupID,
          }
        }

        return {
          currentGroupDrawerTab: 0,
          editGroupFlow: INITIAL_EDIT_GROUP_FLOW,
          selectedGroupID: null,
        }
      },
    )
  }

  onClickDrawerRightBtn = () => {
    const { editGroupFlow, selectedGroupID } = this.state

    if (editGroupFlow.editingDesc) {
      groupGroups
        .get(/** @type {string} */ (selectedGroupID))
        .put({
          description: editGroupFlow.editingDescCurrentValue,
        })
        .then(this.genericResHandler)
        .catch(this.genericErrHandler)

      this.setState(({ editGroupFlow }) => ({
        editGroupFlow: {
          ...editGroupFlow,
          editingDesc: false,
        },
      }))

      return
    }
    if (editGroupFlow.editingName) {
      groupGroups
        .get(/** @type {string} */ (selectedGroupID))
        .put({
          name: editGroupFlow.editingNameCurrentValue,
        })
        .then(this.genericResHandler)
        .catch(this.genericErrHandler)

      this.setState(({ editGroupFlow }) => ({
        editGroupFlow: {
          ...editGroupFlow,
          editingName: false,
        },
      }))

      return
    }
  }

  /**
   * @private
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e
   */
  onChangeSearchTerm = e => {
    const { onChangeSearchTerm } = this.props

    if (onChangeSearchTerm) {
      onChangeSearchTerm(e.target.value)
    }
  }

  /**
   * @private
   * @param {string} nextFilter
   */
  onFilterChange = nextFilter => {
    if (nextFilter === '') {
      this.setState({
        currentFilter: undefined,
      })
    } else {
      this.setState({
        currentFilter: nextFilter,
      })
    }
  }

  /**
   * @private
   */
  refreshPossiblefilters() {
    const { extractFilterable, items } = this.props

    if (extractFilterable) {
      const filters = items && items.map(extractFilterable)
      // avoid repeated filters
      const uniqueFilters = _.uniqBy(filters, 'value')

      this.possibleFilters = uniqueFilters
    } else {
      this.possibleFilters = []
    }
  }

  /**
   * @private
   */
  toggleFilterMenu = () => {
    this.setState(({ filterMenuOpen }) => ({
      filterMenuOpen: !filterMenuOpen,
    }))
  }

  /**
   * @private
   */
  toggleSearch = () => {
    this.setState(({ searchActive }) => ({
      searchActive: !searchActive,
    }))
  }

  render() {
    const {
      classes,
      match,
      history,
      filterIconRef,
      filterMenuAnchorEl,
      filterMenuCurrentStatusValue,
      numberOfRecords,
      onChangeSearchValue,
      onClickDownload,
      onClickFilterButton,
      items: unfiltered,
      extractFilterable,
      onClickSearch,
      onCloseFilterMenu,
      onFilterMenuStatusChange,
      possibleStatuses,
      showSearch,
    } = this.props

    const {
      addGroupFlow,
      addGroupFormData,
      currentGroupDrawerTab,
      editGroupFlow,
      userGroups,
      selectedGroupID,
      currentFilter,
      filterMenuOpen,
      searchActive,
    } = this.state

    const items =
      (currentFilter && extractFilterable
        ? unfiltered.filter(
            item => extractFilterable(item).value === currentFilter,
          )
        : unfiltered) || []

    const validAddGroupFormData =
      addGroupFormData.currentDescErrorMessage === null &&
      addGroupFormData.currentDescValue.length > 0 &&
      addGroupFormData.currentNameErrorMessage === null &&
      addGroupFormData.currentNameValue.length > 0

    const selectedGroup =
      typeof selectedGroupID === 'string' && userGroups[selectedGroupID]

    const Groups = Object.entries(userGroups)

    console.log(this.props)

    return (
      <React.Fragment>
        <Dialog
          disableLeftActionButton={addGroupFlow.savingGroup}
          disableRightActionButton={
            !validAddGroupFormData || addGroupFlow.savingGroup
          }
          onClickRightActionButton={this.handleAddGroup}
          onClickLeftActionButton={this.toggleAddGroupDialog || undefined}
          handleClose={this.closeAddGroupDialog}
          showCloseButton
          open={addGroupFlow.showingAddGroupDialog}
          rightActionButtonText="Save"
          rightActionButtonColorPrimary
          title="Add User Group"
        >
          <OverlaySpinner showSpinner={addGroupFlow.savingGroup}>
            <React.Fragment>
              <AddGroupForm
                currentDescErrorMessage={
                  addGroupFormData.currentDescErrorMessage
                }
                currentDescValue={addGroupFormData.currentDescValue}
                currentNameErrorMessage={
                  addGroupFormData.currentNameErrorMessage
                }
                currentNameValue={addGroupFormData.currentNameValue}
                onDescChange={this.addGroupFormOnDescChange}
                onNameChange={this.addGroupFormOnNameChange}
                disableDescInput={addGroupFlow.savingGroup}
                disableNameInput={addGroupFlow.savingGroup}
              />
              {addGroupFormData.messagesIfError && (
                <div style={{ marginTop: '20px' }}>
                  <Messages messages={addGroupFormData.messagesIfError} />
                </div>
              )}
            </React.Fragment>
          </OverlaySpinner>
        </Dialog>

        <Dialog
          handleClose={this.editGroupFlowToggleDeactivate}
          showCloseButton
          rightActionButtonText="confirm"
          title="DEACTIVATE"
          open={editGroupFlow.deactivating}
          onClickRightActionButton={this.editGroupFlowOnClickConfirmDeactivate}
          rightActionButtonColorRed
        >
          {DEACTIVATING_GROUP_EXPLANATION_TEXT}
        </Dialog>

        <Dialog
          handleClose={this.editGroupFlowToggleReactivate}
          showCloseButton
          rightActionButtonText="confirm"
          title="REACTIVATE"
          open={editGroupFlow.reactivating}
          onClickRightActionButton={this.editGroupFlowOnClickConfirmReactivate}
          rightActionButtonColorPrimary
        >
          {REACTIVATING_GROUP_EXPLANATION_TEXT}
        </Dialog>

        {selectedGroupID && selectedGroup && (
          <PcDrawer
            title={(() => {
              if (!selectedGroup) {
                return ''
              }
              if (editGroupFlow.editingName === true) {
                return 'Name'
              }
              if (editGroupFlow.editingDesc === true) {
                return 'Description'
              }
              return selectedGroup.name
            })()}
            open
            leftButtonOnClick={this.onClickDrawerLeftBtn}
            rightButtonOnClick={this.onClickDrawerRightBtn}
            rightButtonText={(() => {
              if (
                editGroupFlow.editingName === true &&
                editGroupFlow.editingNameCurrentValue !== null &&
                editGroupFlow.editingNameCurrentValue.length > 0 &&
                (selectedGroup &&
                  selectedGroup.name !== editGroupFlow.editingNameCurrentValue)
              ) {
                return 'Save'
              }
              if (
                editGroupFlow.editingDesc === true &&
                editGroupFlow.editingDescCurrentValue !== null &&
                editGroupFlow.editingDescCurrentValue.length > 0 &&
                (selectedGroup &&
                  selectedGroup.description !==
                    editGroupFlow.editingDescCurrentValue)
              ) {
                return 'Save'
              }

              return undefined
            })()}
            tabs={AVAILABLE_TABS_NAMES}
            tabsCurrentValue={currentGroupDrawerTab}
            tabsOnChange={this.handleGroupDrawerTabChange}
            hideTabs={editGroupFlow.editingDesc || editGroupFlow.editingName}
          >
            {currentGroupDrawerTab === GroupDrawerTab.Details &&
              !editGroupFlow.editingName &&
              !editGroupFlow.editingDesc && (
                <div className={classes.groupEditorContainer}>
                  <GroupEditor
                    Desc={userGroups[selectedGroupID].description}
                    Name={userGroups[selectedGroupID].name}
                    onClickDeactivate={this.editGroupFlowToggleDeactivate}
                    onClickName={this.editGroupFlowOnClickName}
                    onClickDesc={this.editGroupFlowOnClickDesc}
                    onClickReactivate={this.editGroupFlowToggleReactivate}
                    isGroupActive={userGroups[selectedGroupID].active}
                  />
                </div>
              )}

            {editGroupFlow.editingDesc && (
              <TextField
                autoFocus
                className={classes.textField}
                onChange={this.editGroupFlowOnChangeDescTextField}
                type="search"
                value={editGroupFlow.editingDescCurrentValue}
                variant="outlined"
              />
            )}

            {editGroupFlow.editingName && (
              <TextField
                autoFocus
                className={classes.textField}
                onChange={this.editGroupFlowOnChangeNameTextField}
                type="search"
                value={editGroupFlow.editingNameCurrentValue}
                variant="outlined"
              />
            )}
            {currentGroupDrawerTab === GroupDrawerTab.Permissions &&
              'permissions'}
            {currentGroupDrawerTab === GroupDrawerTab.Members && 'members'}
          </PcDrawer>
        )}

        <Page
          //component={'ManageUserGroups'}
          titleText={'User Groups'}
        >
          <List className={classes.list}>
            <ListToolbar
              filterIconRef={this.filterIconRef}
              // @ts-ignore it works
              filterMenuAnchorEl={this.filterIconRef.current}
              filterMenuCurrentStatusValue={currentFilter}
              filterMenuOpen={filterMenuOpen}
              numberOfRecords={items.length}
              onChangeSearchValue={this.onChangeSearchTerm}
              onClickAdd={this.addGroupFlowToggleDialog}
              onClickDownload={onClickDownload}
              onClickFilterButton={this.toggleFilterMenu}
              onClickSearch={this.toggleSearch}
              onCloseFilterMenu={this.toggleFilterMenu}
              onFilterMenuStatusChange={this.onFilterChange}
              possibleStatuses={this.possibleFilters}
              showSearch={searchActive}
              className={classes.listToolBar}
            />
            <Divider />
            {Groups.map(([id, userGroup]) => (
              <ListItem
                key={id}
                className={classes.listItem}
                component={props => (
                  <Link to={`${match.url}/${id}`} {...props} />
                )}
                onClick={() => {
                  this.onClickGroup(id)
                }}
              >
                <ListItemText
                  primary={userGroup.name}
                  secondary={userGroup.description}
                />
                <ListItemSecondaryAction>
                  <Typography
                    color={userGroup.active ? 'primary' : 'secondary'}
                  >
                    {userGroup.active ? 'Active' : 'Inactive'}
                    <IconButton disabled>
                      <KeyboardArrowRight />
                    </IconButton>
                  </Typography>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Page>
      </React.Fragment>
    )
  }
}

export default withStyles(groupStyles)(ManageUserGroups)
