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
    editingItem: null,
    isReordering: false,
    reorderedItems: [],
    isAddPropertyDialogOpen: false,
  }

  handleChange = (event, value) => {
    this.setState({ tab: value })
  }

  handleEdit = item => {
    this.setState({ editingItem: item })
  }

  handleDelete = id => {
    // Do something with id
  }

  handleShowReorder = () => {
    const usedPropertyItems = this.props.propertyItems.filter(p => !p.unused)

    this.setState({
      isReordering: true,
      reorderedItems: usedPropertyItems,
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

  finishEdit = () => {
    this.setState({ editingItem: null })
  }

  handleCancel = () => {
    const { isReordering, editingItem } = this.state

    if (isReordering) return this.finishReorder()
    if (editingItem) return this.finishEdit()
  }

  handleEditSave = () => {}

  handleSave = () => {
    const { isReordering, editingItem } = this.state

    if (isReordering) return this.handleReorderSave()
    if (editingItem) return this.handleEditSave()
  }

  renderTitle = () => {
    const { isReordering, editingItem } = this.state

    if (!isReordering && !editingItem) {
      return 'Property Drawer'
    } else if (editingItem) {
      return 'Edit Property'
    }
    return null
  }

  render() {
    const { open, propertyItems, classes, handleClose } = this.props
    const {
      tab,
      isReordering,
      reorderedItems,
      editingItem,
      isAddPropertyDialogOpen,
    } = this.state
    const usedPropertyItems = this.props.propertyItems.filter(p => !p.unused)
    const unusedPropertyItems = propertyItems.filter(p => p.unused)

    return (
      <PcDrawer
        open={open}
        leftAction={
          isReordering || editingItem ? (
            <Button className={classes.menuButton} onClick={this.handleCancel}>
              Cancel
            </Button>
          ) : (
            <IconButton
              onClick={handleClose}
              className={classes.menuButton}
              aria-label="ChevronLeft"
              disableRipple
            >
              <NavigateBack />
            </IconButton>
          )
        }
        rightAction={
          (isReordering || editingItem) && (
            <Button className={classes.menuButton} onClick={this.handleSave}>
              Save
            </Button>
          )
        }
        title={this.renderTitle()}
      >
        <PcDialog
          handleSave={() => {}}
          open={isAddPropertyDialogOpen}
          title="Add a Property"
          handleClose={this.toggleAddPropertyDialog}
        >
          <AddPropertyForm availableTypes={[]} />
        </PcDialog>
        <div className={classes.main}>
          {editingItem ? (
            <PropertyEdit editItem={editingItem} />
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
                    propertyItems={usedPropertyItems}
                  />
                  <IconButton
                    onClick={this.toggleAddPropertyDialog}
                    aria-label="Plus"
                  >
                    <AddCircleOutlineIcon fontSize="small" color="primary" />
                  </IconButton>
                  <PropertyList
                    subheader="Unused Properties"
                    unusedList
                    propertyItems={unusedPropertyItems}
                    onRevertUnused={this.handleRevertUnused}
                  />
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
