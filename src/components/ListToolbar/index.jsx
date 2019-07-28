import React from 'react'
import ReactDOM from 'react-dom'

import Cloud from '@material-ui/icons/CloudDownloadOutlined'
import FilterList from '@material-ui/icons/FilterList'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Search from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core'
import StatusFilterMenu from '../StatusFilterMenu'
/**
 * @typedef {import('@material-ui/core').Theme} Theme
 * @typedef {import('@material-ui/core/TextField').BaseTextFieldProps} BaseTextFieldProps
 */
/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRulesCallback<K>} StyleRulesCallback
 */

import Add from '@material-ui/icons/Add'
import Dialog from 'components/Dialog'
import OverlaySpinner from 'components/OverlaySpinner'
import AddRecordForm from 'components/AddRecordForm'

/**
 * @typedef {import('app/typings').Node} Node
 * @typedef {import('app/typings').PropertyType} PropType
 */

/** @type {AddRecordFlow} */
const INITIAL_ADD_RECORD_FLOW = Object.freeze({
  savingRecord: false,
  showingAddRecordDialog: false,
})

/** @type {AddRecordFormData} */
const BLANK_ADD_RECORD_FORM_DATA = Object.freeze({
  currentLabelErrorMessage: null,
  currentLabelValue: '',
  currentNameErrorMessage: null,
  currentNameValue: '',
  detailsIfError: null,
  messagesIfError: null,
})

/**
 * @typedef {object} AddRecordFlow
 * @prop {boolean} savingRecord
 * @prop {boolean} showingAddRecordDialog
 */

/**
 * @typedef {object} AddRecordFormData
 * @prop {string|null} currentLabelErrorMessage
 * @prop {string} currentLabelValue
 * @prop {string|null} currentNameErrorMessage
 * @prop {string} currentNameValue
 * @prop {Record<'name'|'label', string[]|undefined>|null} detailsIfError
 * @prop {string[]|null} messagesIfError
 */

/**
 * @prop {Record<Classes, string>} classes
 */

/**
 * @typedef {object} State
 * @prop {AddRecordFlow} AddRecordFlow
 * @prop {AddRecordFormData} AddRecordFormData
 * @prop {Record<string, Node>} nodes
 * @prop {Record<string, PropType>} propTypes
 * @prop {string|null} selectedNodeID Non-null when editing a node's property
 * definitions or relationships definitions.
 * @prop {boolean} showingAddRelDialog
 * @prop {string|null} snackbarMessage
 */

/**
 * @typedef {import('../StatusFilterMenu').Props} StatusFilterMenuProps
 */

/**
 * @typedef {object} Props
 * @prop {Record<classNames, string>} classes
 * @prop {React.Ref<SVGSVGElement>} filterIconRef
 * @prop {StatusFilterMenuProps['anchorEl']} filterMenuAnchorEl (Refer to
 * `<StatusFilterMenu />`'s props).
 * @prop {StatusFilterMenuProps['currentStatusValue']=} filterMenuCurrentStatusValue
 * (Refer to `<StatusFilterMenu />`'s props).
 * @prop {StatusFilterMenuProps['open']=} filterMenuOpen (Refer to
 * `<StatusFilterMenu />`'s props).
 * @prop {number} numberOfRecords
 * @prop {(() => void)=} onClickAdd Called when the user clicks on the plus icon.
 * @prop {(() => void)=} onClickDownload Called when the user clicks on the download
 * icon.
 * @prop {(() => void)=} onClickFilterButton Consumer should create a dom ref to
 * pass inSvgIconOnClick= , to which the menu will 'attach'.
 * @prop {(() => void)=} onClickSearch Called when the user clicks on the search
 * icon, ideally this should change state above and pass true to the
 * `showSearch` prop as a result.
 * @prop {BaseTextFieldProps['onChange']=} onChangeSearchValue Called when the
 * value inside the search text (if it's currently on display) input changes.
 * @prop {StatusFilterMenuProps['onClose']=} onCloseFilterMenu (Refer to
 * `<StatusFilterMenu />`'s props).
 * @prop {StatusFilterMenuProps['onStatusChange']=} onFilterMenuStatusChange
 * (Refer to `<StatusFilterMenu />`'s props).
 * @prop {StatusFilterMenuProps['possibleStatuses']} possibleStatuses (Refer to
 * `<StatusFilterMenu />`'s props).
 * @prop {(boolean|null)=} showSearch Determines whether the text input
 * for search should be on display.
 */

export {} // stop jsdoc comments from merging

/**
 * You shouldn't probably be importing this component but instead any consumier
 * container, as you'll be managing more state than needed (such as keeping
 * track of opening and closing the pop-over filter menu). Please refer to that
 * container's documentation to know what is offered from this
 * component/container combo.
 * This component receives the underlying filter menu component's props directly
 * as an optimization technique.
 * @augments React.PureComponent<Props>
 */
class ListToolbar extends React.PureComponent {
  /** @type {State} */
  state = {
    AddRecordFlow: {
      savingRecord: false,
      showingAddRecordDialog: false,
    },
    //addPropFlow: INITIAL_ADD_PROP_FLOW,
    AddRecordFormData: BLANK_ADD_RECORD_FORM_DATA,
    //editNodeFlow: INITIAL_EDIT_NODE_FLOW,
    //editPropFlow: INITIAL_EDIT_PROP_FLOW,
    nodes: {},
    propTypes: {},
    selectedNodeID: null,
    showingAddRelDialog: false,
    snackbarMessage: null,
  }

  /**
   * @private
   **/
  toggleAddRecordDialog = () => {
    this.setState(({ AddRecordFlow }) => ({
      AddRecordFlow: {
        ...AddRecordFlow,
        showingAddRecordDialog: !AddRecordFlow.showingAddRecordDialog,
      },
    }))
  }

  /**
   * @private
   */
  addRecordFlowToggleDialog = () => {
    this.setState(({ AddRecordFlow }) => ({
      addRecordFlow: {
        ...INITIAL_ADD_RECORD_FLOW,
        showingAddRecordDialog: !AddRecordFlow.showingAddRecordDialog,
      },
      addRecordFormData: BLANK_ADD_RECORD_FORM_DATA,
    }))
  }

  /**
   * @private
   */

  addRecordFlowOnClickLeftAction = () => {
    this.setState(({ AddRecordFlow }) => ({
      AddRecordFlow: {
        ...AddRecordFlow,
      },
    }))
  }

  closeAddRecordDialog = () => {
    this.setState({
      addRecordFlow: INITIAL_ADD_RECORD_FLOW,
      addRecordFormData: BLANK_ADD_RECORD_FORM_DATA,
      showingAddRecordDialog: false,
    })
  }
  /** @private */
  handleCloseRecordForm = () => {
    this.setState({
      showingAddRecordDialog: false,
    })
  }
  render() {
    const {
      classes,
      filterIconRef,
      filterMenuAnchorEl,
      filterMenuCurrentStatusValue,
      filterMenuOpen,
      numberOfRecords,
      onChangeSearchValue,

      onClickDownload,
      onClickFilterButton,
      onClickSearch,
      onCloseFilterMenu,
      onFilterMenuStatusChange,
      possibleStatuses,
      showSearch,
    } = this.props

    const { AddRecordFlow, AddRecordFormData } = this.state

    return (
      <div className={classes.root}>
        {showSearch && (
          <div>
            <TextField
              className={classes.textField}
              type="search"
              margin="dense"
              variant="outlined"
              fullWidth
              placeholder="Search Groups"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    className={classes.inputAdornment}
                    position="start"
                  >
                    <Search className={classes.searchIcon} />
                  </InputAdornment>
                ),
              }}
              onChange={onChangeSearchValue}
            />
          </div>
        )}
        <Dialog
          handleClose={this.closeAddRecordDialog}
          showCloseButton
          onClickLeftActionButton={this.toggleAddRecordDialog || undefined}
          rightActionButtonText="Save"
          title="Add Record"
          open={AddRecordFlow.showingAddRecordDialog}
          rightActionButtonColorPrimary
        >
          <OverlaySpinner showSpinner={AddRecordFlow.savingRecord}>
            <React.Fragment>
              <AddRecordForm
                currentLabelValue={AddRecordFormData.currentLabelValue}
                currentNameErrorMessage={
                  AddRecordFormData.currentNameErrorMessage
                }
                currentNameValue={AddRecordFormData.currentNameValue}
                disableLabelInput={AddRecordFlow.savingRecord}
                disableNameInput={AddRecordFlow.savingRecord}
              />
            </React.Fragment>
          </OverlaySpinner>
        </Dialog>
        <div className={classes.filters}>
          <IconButton onClick={this.toggleAddRecordDialog} aria-label="Plus">
            <Add />
          </IconButton>
          <IconButton onClick={onClickDownload}>
            <Cloud />
          </IconButton>
          <IconButton onClick={onClickSearch}>
            <Search />
          </IconButton>
          <IconButton onClick={onClickFilterButton}>
            <FilterList ref={filterIconRef} />
          </IconButton>
        </div>
        <StatusFilterMenu
          anchorEl={
            // @ts-ignore it works
            ReactDOM.findDOMNode(filterMenuAnchorEl)
          }
          currentStatusValue={filterMenuCurrentStatusValue}
          onClose={onCloseFilterMenu}
          onStatusChange={onFilterMenuStatusChange}
          open={!!filterMenuOpen}
          possibleStatuses={possibleStatuses}
        />
        <div className={classes.records}>{numberOfRecords} records</div>
      </div>
    )
  }
}

/**
 * @param {Theme} theme
 */
const styles = theme => ({
  filters: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  inputAdornment: {
    position: 'start',
  },
  records: {
    paddingTop: 0,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 10,
    },
  },
  root: {
    padding: '0 15px 15px 25px',
    [theme.breakpoints.up('sm')]: {
      padding: '15px 15px 15px 25px',
    },
  },
  searchIcon: {
    color: 'bdbdbd',
  },
  textField: {
    backgroundColor: '#F9F9F9',
    color: 'white',
  },
})

/**
 * @typedef {keyof ReturnType<typeof styles>} classNames
 */

export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {StyleRulesCallback<classNames>} */ (styles),
)(ListToolbar)
