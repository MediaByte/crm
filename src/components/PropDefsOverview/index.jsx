import React from 'react'

/**
 * @typedef {import('react-sortable-hoc').SortEndHandler} SortEndHandler
 */

import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import Divider from '@material-ui/core/Divider'
import HistoryIcon from '@material-ui/icons/History'

import ReorderList from './ReorderList'

/**
 * @typedef {import('@material-ui/core/SvgIcon').SvgIconProps} SvgIconProps
 */

/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */
const styles = theme => ({
  addButton: {
    alignSelf: 'flex-start',
  },
  grow: {
    flexGrow: 1,
  },
  listItem: {
    background: '#fff',
  },
  main: {
    flex: 1,
    overflowX: 'hidden',
    paddingBottom: '100px',
  },
  menuButton: {
    color: '#fff',
  },
  reorderIcon: {
    // @ts-ignore
    ...theme.custom.smallIconButton,
    transform: 'rotate(90deg)',
  },

  // @ts-ignore
  smallIconButton: theme.custom.smallIconButton,
})

/**
 * @typedef {keyof ReturnType<typeof styles>} ClassKey
 */

/**
 * @typedef {object} SimplePropDef
 * @prop {React.ComponentType<SvgIconProps>|null} icon
 * @prop {string} id
 * @prop {string} label
 * @prop {number} order
 * @prop {string} typeName
 * @prop {boolean} unused
 */

/**
 * @typedef {object} Props
 * @prop {Record<ClassKey, string>} classes
 * @prop {boolean} isReordering
 * @prop {(() => void)=} onClickAdd (Optional)
 * @prop {((id: string) => void)=} onClickEdit (Optional)
 * @prop {(() => void)=} onClickReorder (Optional)
 * @prop {((oldIndex: number, newIndex: number) => void)=} onReorderEnd
 * @prop {SimplePropDef[]} propDefs
 */

/**
 * @augments React.PureComponent<Props>
 */
class PropDefsOverview extends React.PureComponent {
  /**
   * @private
   * @param {any} e
   */
  onClickEdit = e => {
    const { onClickEdit } = this.props

    onClickEdit && onClickEdit(e.currentTarget.dataset.id)
  }

  /**
   * @private
   * @type {SortEndHandler}
   */
  onSortEnd = ({ newIndex, oldIndex }) => {
    const { onReorderEnd } = this.props

    onReorderEnd && onReorderEnd(oldIndex, newIndex)
  }

  render() {
    const {
      classes,
      isReordering,
      onClickAdd,
      onClickReorder,
      propDefs,
    } = this.props

    const usedPropDefs = propDefs.filter(propDef => !propDef.unused)

    const unusedPropDefs = propDefs.filter(propDef => propDef.unused)

    return (
      <React.Fragment>
        <Toolbar>
          <div className={classes.grow} />

          {propDefs.length === 0 && (
            <Typography>Click Plus to Add Properties</Typography>
          )}

          {usedPropDefs.length > 0 && (
            <Tooltip title="Reorder" aria-label="Reorder" placement="left">
              <IconButton
                className={classes.reorderIcon}
                aria-label="CompareArrows"
                onClick={onClickReorder}
              >
                <CompareArrowsIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>

        {isReordering && usedPropDefs.length > 0 && (
          <ReorderList onSortEnd={this.onSortEnd} propDefs={usedPropDefs} />
        )}

        {!isReordering && usedPropDefs.length > 0 && (
          <List>
            {usedPropDefs.map(propDef => {
              const Icon = propDef.icon

              return (
                <ListItem className={classes.listItem} key={propDef.id}>
                  {Icon && <Icon />}

                  <ListItemText
                    primary={propDef.label}
                    secondary={propDef.typeName}
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Edit"
                      className={classes.smallIconButton}
                      data-id={propDef.id}
                      onClick={this.onClickEdit}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                  <Divider inset />
                </ListItem>
              )
            })}
          </List>
        )}

        {!isReordering && unusedPropDefs.length > 0 && (
          <List
            subheader={
              <ListSubheader component="div">Unused Properties</ListSubheader>
            }
          >
            {unusedPropDefs.map(propDef => {
              const Icon = propDef.icon

              return (
                <ListItem className={classes.listItem} key={propDef.id}>
                  {Icon && <Icon />}

                  <ListItemText
                    primary={propDef.label}
                    secondary={propDef.typeName}
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="History"
                      className={classes.smallIconButton}
                    >
                      <HistoryIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
        )}

        {!isReordering && (
          <IconButton
            aria-label="Plus"
            onClick={onClickAdd}
            className={classes.addButton}
          >
            <AddCircleOutlineIcon fontSize="small" color="primary" />
          </IconButton>
        )}
      </React.Fragment>
    )
  }
}

export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {import('@material-ui/core/styles').StyleRulesCallback<ClassKey>} */ (styles),
)(PropDefsOverview)
