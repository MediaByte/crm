import React, { Component, Fragment } from 'react'
import NavigateBack from '@material-ui/icons/ChevronLeft'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'
import {
  Toolbar,
  IconButton,
  withStyles,
  Tabs,
  Tab,
  Tooltip,
  Button,
} from '@material-ui/core'
import { arrayMove } from '../../common/utils'

import ReorderList from './ReorderList'
import PcDrawer from '../PcDrawer'
import PropertyList from './PropertyList'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import PropertyEdit from '../PropertyEdit'
import AddPropertyForm from '../AddPropertyForm'
import PcDialog from 'components/PcDialog'
import { nodes } from 'views/Administration/NodesAndProps/mock'
import AddRelationshipForm from 'components/AddRelationshipForm'

const styles = theme => ({
  main: {
    flex: 1,
    overflowX: 'hidden',
    paddingBottom: '100px',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    color: '#fff',
  },
  reorderIcon: {
    ...theme.custom.smallIconButton,
    transform: 'rotate(90deg)',
  },
})

class PropertyDrawer extends Component {
  state = {
    tab: 0,
    activePropDef: null,
    activeRelationship: null,
    activeArgumentId: null,
    isReordering: false,
    reorderedItems: [],
    isAddPropertyDialogOpen: false,
    isAddRelationshipDialogOpen: false,
  }

  handleChange = (event, value) => {
    this.setState({ tab: value })
  }

  handleEdit = item => {
    if (this.state.tab) {
      this.setState({ activeRelationship: item })
    } else {
      this.setState({ activePropDef: item })
    }
  }

  handleToggleArgument = () => {}

  handleEditArgument = id => {
    this.setState({ activeArgumentId: id })
  }

  leaveEditArgument = () => {
    this.setState({ activeArgumentId: null })
  }

  handleDelete = id => {
    // Do something with id
  }

  handleShowReorder = () => {
    const { propDefs, relationships } = this.props
    const items = this.state.tab ? relationships : propDefs
    const reorderedItems = items.filter(item => !item.unused)

    this.setState({
      isReordering: true,
      reorderedItems,
    })
  }

  handleOrderChange = ({ oldIndex, newIndex }) => {
    this.setState({
      reorderedItems: arrayMove(this.state.reorderedItems, oldIndex, newIndex),
    })
  }

  handleRevertUnused = id => {
    // do revertunsed
  }

  finishReorder = () => {
    this.setState({
      isReordering: false,
      reorderedItems: [],
    })
  }

  handleReorderSave = () => {
    /**
     * Do somethign with this.state.reorderedItems
     */
    this.finishReorder()
  }

  toggleAddPropertyDialog = () => {
    this.setState({
      isAddPropertyDialogOpen: !this.state.isAddPropertyDialogOpen,
    })
  }

  toggleAddRelationshipDialog = () => {
    this.setState({
      isAddRelationshipDialogOpen: !this.state.isAddRelationshipDialogOpen,
    })
  }

  finishEdit = () => {
    if (this.state.tab) {
      this.setState({ activeRelationship: null })
    } else {
      this.setState({ activePropDef: null })
    }
  }

  handleCancel = () => {
    const { isReordering, activePropDef } = this.state

    if (isReordering) return this.finishReorder()
    if (activePropDef) return this.finishEdit()
  }

  handleEditSave = () => {}

  handleSave = () => {
    const { isReordering, activePropDef } = this.state

    if (isReordering) return this.handleReorderSave()
    if (activePropDef) return this.handleEditSave()
  }

  renderTitle = () => {
    const { isReordering, activePropDef, activeArgumentId } = this.state
    const { selectedNodeId } = this.props
    const selectedNode = nodes.find(node => node._['#'] === selectedNodeId)

    if (!isReordering && !activePropDef && selectedNode) {
      return selectedNode.name
    } else if (activePropDef) {
      if (activeArgumentId) {
        if (activeArgumentId === 'icon') return 'Icon'

        return activePropDef.arguments[activeArgumentId].param.name
      }
      return activePropDef.name
    }
    return null
  }

  render() {
    const {
      selectedNodeId,
      propDefs,
      classes,
      handleClose,
      relationships,
    } = this.props
    const {
      tab,
      isReordering,
      reorderedItems,
      activePropDef,
      isAddPropertyDialogOpen,
      isAddRelationshipDialogOpen,
      activeArgumentId,
    } = this.state

    const items = tab ? relationships : propDefs
    const usedItems = items.filter(p => !p.unused)
    const unusedItems = items.filter(p => p.unused)

    return (
      <PcDrawer
        open={selectedNodeId}
        leftAction={
          isReordering || (activePropDef && !activeArgumentId) ? (
            <Button className={classes.menuButton} onClick={this.handleCancel}>
              Cancel
            </Button>
          ) : (
            <IconButton
              onClick={activeArgumentId ? this.leaveEditArgument : handleClose}
              className={classes.menuButton}
              aria-label="ChevronLeft"
              disableRipple
            >
              <NavigateBack />
            </IconButton>
          )
        }
        rightAction={
          (isReordering || (activePropDef && !activeArgumentId)) && (
            <Button className={classes.menuButton} onClick={this.handleSave}>
              Save
            </Button>
          )
        }
        title={this.renderTitle()}
      >
        <PcDialog
          handleSave={() => {}}
          open={isAddRelationshipDialogOpen}
          title="Add Relationship"
          handleClose={this.toggleAddRelationshipDialog}
        >
          <AddPropertyForm availableTypes={[]} />
        </PcDialog>
        <PcDialog
          handleSave={() => {}}
          open={isAddPropertyDialogOpen}
          title="Add a Property"
          handleClose={this.toggleAddPropertyDialog}
        >
          <AddRelationshipForm availableTypes={[]} />
        </PcDialog>
        <div className={classes.main}>
          {activePropDef ? (
            <PropertyEdit
              activePropDef={activePropDef}
              activeArgumentId={activeArgumentId}
              handleEditArgument={this.handleEditArgument}
              handleToggleArgument={this.handleToggleArgument}
            />
          ) : (
            <div>
              {!isReordering && (
                <Tabs
                  fullWidth
                  value={tab}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Properties" />
                  <Tab label="Relationships" />
                </Tabs>
              )}

              <Toolbar>
                <div className={classes.grow} />
                {!isReordering && (
                  <Tooltip
                    title="Reorder"
                    aria-label="Reorder"
                    placement="left"
                  >
                    <IconButton
                      onClick={this.handleShowReorder}
                      className={classes.reorderIcon}
                      aria-label="CompareArrows"
                    >
                      <CompareArrowsIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Toolbar>
              {isReordering ? (
                <ReorderList
                  reorderItems={reorderedItems}
                  onSortEnd={this.handleOrderChange}
                />
              ) : (
                <Fragment>
                  <PropertyList
                    onEdit={this.handleEdit}
                    onDelete={this.handleDelete}
                    propDefs={usedItems}
                  />
                  <IconButton
                    onClick={this.toggleAddPropertyDialog}
                    aria-label="Plus"
                  >
                    <AddCircleOutlineIcon fontSize="small" color="primary" />
                  </IconButton>
                  {!!unusedItems.length && (
                    <PropertyList
                      subheader={`Unused ${
                        tab ? 'Relationships' : 'Properties'
                      }`}
                      unusedList
                      propDefs={unusedItems}
                      onRevertUnused={this.handleRevertUnused}
                    />
                  )}
                </Fragment>
              )}
            </div>
          )}
        </div>
      </PcDrawer>
    )
  }
}

export default withStyles(styles)(PropertyDrawer)
