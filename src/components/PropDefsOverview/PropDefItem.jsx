import React from 'react'

import { SortableHandle } from 'react-sortable-hoc'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import HistoryIcon from '@material-ui/icons/History'
import ReorderIcon from '@material-ui/icons/Reorder'

const DragHandle = SortableHandle(ReorderIcon)

/**
 * @typedef {keyof ReturnType<typeof styles>} ClassKey
 */

/**
 * @typedef {object} Props
 * @prop {Record<keyof ReturnType<typeof styles>, string>} classes
 * @prop {React.ComponentType<import('@material-ui/core/SvgIcon').SvgIconProps>|null} icon
 * @prop {string} id
 * @prop {boolean} isActive
 * @prop {boolean} isReordering If true, will render a drag handle instead of
 * the action icon.
 * @prop {string} label
 * @prop {(id: string) => void} onClickActionIcon When clicking on the pencil or
 * rollback icons.
 * @prop {string} typeName
 */

/**
 * @augments React.PureComponent<Props>
 */
class PropDefItem extends React.PureComponent {
  /**
   * @private
   * @param {any} e
   */
  onClickActionIcon = e => {
    const { onClickActionIcon } = this.props

    onClickActionIcon &&
      onClickActionIcon(/** @type {string} */ (e.currentTarget.dataset.id))
  }

  render() {
    const {
      classes,
      icon: Icon,
      id,
      isActive,
      isReordering,
      label,
      typeName,
    } = this.props

    return (
      <div className={classes.itemRoot}>
        <Grid className={classes.item} container alignItems="center">
          {/* a hidden icon that takes up the same space so things line up */}
          {Icon ? <Icon /> : <EditOutlinedIcon className={classes.hidden} />}

          <div className={classes.itemInfo}>
            <Typography variant="inherit">{label}</Typography>
            <Typography component="span" color="textSecondary">
              {typeName}
            </Typography>
          </div>

          {isReordering ? (
            <DragHandle />
          ) : (
            <IconButton
              aria-label="Edit"
              className={classes.smallIconButton}
              data-id={id}
              onClick={this.onClickActionIcon}
            >
              {isActive ? <EditOutlinedIcon /> : <HistoryIcon />}
            </IconButton>
          )}
        </Grid>
      </div>
    )
  }
}

/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */
const styles = theme => ({
  hidden: {
    visibility: 'hidden',
    color: 'textSecondary',
  },
  item: {
    background: '#FFFFFF',
    padding: '3.5px 3.5px',
    paddingLeft: '10px',
    marginBottom: 1,
  },
  itemInfo: {
    flex: 1,
    paddingLeft: '25px',
  },
  itemRoot: {
    width: '100%',
    zIndex: 100000,
  },

  // @ts-ignore
  smallIconButton: {
    color: '#757575',
  },
})

export default withStyles(
  /** @type {import('@material-ui/core/styles').StyleRulesCallback<ClassKey>} */ (styles),
)(PropDefItem)
