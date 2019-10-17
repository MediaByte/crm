import React from 'react'

import classNames from 'classnames'

/**
 * @typedef {import('react-sortable-hoc').SortEndHandler} SortEndHandler
 */

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'

import ReorderList from './ReorderList'
import PropDefItem from './PropDefItem'

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
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
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
    padding: '5px !important',
    paddingRight: '8px',
    transform: 'rotate(90deg)',
  },
  hidden: {
    visibility: 'hidden',
  },
  itemRoot: {
    width: '100%',
    zIndex: 100000,
  },
  item: {
    background: '#fff',
    padding: '10px 20px',
  },
  itemInfo: {
    flex: 1,
    paddingLeft: '15px',
  },

  // @ts-ignore
  smallIconButton: {
    padding: '5px !important',
  },
})

const UNUSED_PROP_DEFS_SUBHEADER = (
  <ListSubheader component="div">UNUSED PROPERTIES</ListSubheader>
)

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
   * @param {string} id
   */
  onClickEdit = id => {
    const { onClickEdit } = this.props

    onClickEdit && onClickEdit(id)
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
      <Grid container direction="column">
        {propDefs.length === 0 && (
          <Grid className={classes.alignSelfCenter} item>
            <Typography>Click Plus to Add Properties</Typography>
          </Grid>
        )}

        {usedPropDefs.length > 0 && (
          <Grid
            className={classNames(
              classes.alignSelfEnd,
              (usedPropDefs.length === 0 || isReordering) && classes.hidden,
            )}
            item
          >
            <Tooltip title="Reorder" aria-label="Reorder" placement="left">
              <IconButton
                className={classes.reorderIcon}
                aria-label="CompareArrows"
                onClick={onClickReorder}
              >
                <CompareArrowsIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        )}

        {isReordering && usedPropDefs.length > 0 && (
          <Grid item>
            <ReorderList onSortEnd={this.onSortEnd} propDefs={usedPropDefs} />
          </Grid>
        )}

        {!isReordering && usedPropDefs.length > 0 && (
          <Grid item>
            {usedPropDefs.map(propDef => (
              <PropDefItem
                icon={propDef.icon}
                id={propDef.id}
                key={propDef.id}
                label={propDef.label}
                typeName={propDef.typeName}
                isActive
                onClickActionIcon={this.onClickEdit}
              />
            ))}
          </Grid>
        )}
        {!isReordering && (
          <Grid item>
            <IconButton
              aria-label="Plus"
              onClick={onClickAdd}
              className={classes.addButton}
            >
              <AddCircleOutlineIcon fontSize="small" color="primary" />
            </IconButton>
          </Grid>
        )}

        {!isReordering && unusedPropDefs.length > 0 && (
          <Grid item>
            <List subheader={UNUSED_PROP_DEFS_SUBHEADER}>
              {unusedPropDefs.map(propDef => (
                <PropDefItem
                  icon={propDef.icon}
                  id={propDef.id}
                  key={propDef.id}
                  label={propDef.label}
                  typeName={propDef.typeName}
                  onClickActionIcon={this.onClickEdit}
                />
              ))}
            </List>
          </Grid>
        )}
      </Grid>
    )
  }
}

export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {import('@material-ui/core/styles').StyleRulesCallback<ClassKey>} */ (styles),
)(PropDefsOverview)
