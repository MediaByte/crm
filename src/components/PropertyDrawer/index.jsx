import React, { Component } from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
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
import PropForm from '../PropForm'
import AddPropertyDialog from 'components/SimpleDialog'
import OptionsEditor from 'components/OptionsEditor'
// import PropDefEditor from '../PropDefEditor'

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
    editingProperty: 'id',
    isReordering: false,
    reorderedItems: [],
    isAddPropertyDialogOpen: false,
  }

  handleChange = (event, value) => {
    this.setState({ tab: value })
  }

  handleEdit = item => {
    this.setState({ editingProperty: item })
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
    this.setState({ isAddPropertyDialogOpen: true })
  }

  finishEdit = () => {
    this.setState({ editingProperty: null })
  }

  handleCancel = () => {
    const { isReordering, editingProperty } = this.state

    if (isReordering) return this.finishReorder()
    if (editingProperty) return this.finishEdit()
  }

  handleEditSave = () => {}

  handleSave = () => {
    const { isReordering, editingProperty } = this.state

    if (isReordering) return this.handleReorderSave()
    if (editingProperty) return this.handleEditSave()
  }

  renderTitle = () => {
    const { isReordering, editingProperty } = this.state

    if (!isReordering && !editingProperty) {
      return 'People'
    } else if (editingProperty) {
      return 'Edit Property'
    }
  }

  render() {
    const { open, propertyItems, classes, handleClose } = this.props
    const {
      tab,
      isReordering,
      reorderedItems,
      editingProperty,
      isAddPropertyDialogOpen,
    } = this.state
    const usedPropertyItems = this.props.propertyItems.filter(p => !p.unused)
    const unusedPropertyItems = propertyItems.filter(p => p.unused)

    return (
      <PcDrawer
        open={open}
        leftAction={
          isReordering || editingProperty ? (
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
          (isReordering || editingProperty) && (
            <Button className={classes.menuButton} onClick={this.handleSave}>
              Save
            </Button>
          )
        }
        title={this.renderTitle()}
      >
        <AddPropertyDialog
          handleSave={() => {}}
          open={isAddPropertyDialogOpen}
          title="Add a Property"
          handleClose={this.toggleAddPropertyDialog}
        >
          <PropForm availableTypes={[]} />
        </AddPropertyDialog>
        <div className={classes.main}>
          {editingProperty ? (
            // <PropertyEdit editItem={editingProperty} />
            <OptionsEditor />
          ) : (
            <div>
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
                <PropertyList
                  onEdit={this.handleEdit}
                  onDelete={this.handleDelete}
                  propertyItems={usedPropertyItems}
                />
              )}
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
            </div>
          )}
        </div>
      </PcDrawer>
    )
  }
}

export default withStyles(styles)(PropertyDrawer)
