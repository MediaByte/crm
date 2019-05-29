import React from 'react'

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc'
import { Typography, Grid, Divider } from '@material-ui/core'
/**
 * @typedef {import('react-sortable-hoc').SortEndHandler} SortEndHandler
 */

import ReorderIcon from '@material-ui/icons/Reorder'

/**
 * @typedef {import('.').PropDef} PropDef
 */

const DragHandle = SortableHandle(ReorderIcon)
/**
 * React sortable hoc doesn't work well with libraries that depend on parent component
 * had to create list and list item from scratch
 */
const devideInset = '60px'
const styles = {
  itemRoot: {
    width: '100%',
    zIndex: 100000,
  },
  item: {
    background: '#fff',
    padding: '10px 20px',
  },
  devide: {
    backgroundColor: '#eee',
    height: '1px',
    marginLeft: devideInset,
    width: `calc(100% - ${devideInset})`,
  },
  itemInfo: {
    flex: 1,
    paddingLeft: '15px',
  },
}

/**
 * @param {{ item: PropDef }} param0
 */
const ReorderItem = ({ item: propDef }) => {
  const Icon = propDef.icon

  return (
    <div style={styles.itemRoot}>
      <Grid style={styles.item} container alignItems="center">
        <Icon />
        <div style={styles.itemInfo}>
          <Typography variant="inherit">{propDef.label}</Typography>
          <Typography component="span" color="textSecondary">
            {propDef.typeName}
          </Typography>
        </div>
        <DragHandle />
      </Grid>
      <Divider inset />
    </div>
  )
}

const SortableItem = SortableElement(ReorderItem)

/**
 * @type {React.SFC}
 */
const SortableListRenderer = ({ children }) => <div>{children}</div>

const SortableList = SortableContainer(SortableListRenderer)

/**
 * @typedef {object} Props
 * @prop {PropDef[]} propDefs
 * @prop {SortEndHandler} onSortEnd
 */

/**
 * @augments React.PureComponent<Props>
 */
class ReorderList extends React.PureComponent {
  render() {
    const { propDefs, onSortEnd } = this.props

    return (
      <SortableList onSortEnd={onSortEnd} useDragHandle>
        {propDefs.map((propDef, index) => (
          <SortableItem key={propDef.id} index={index} item={propDef} />
        ))}
      </SortableList>
    )
  }
}

export default ReorderList
