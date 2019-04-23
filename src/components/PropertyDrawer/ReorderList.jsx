import React from 'react'
import ReorderIcon from '@material-ui/icons/Reorder'

import PropertyIcon from './PropertyIcon'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc'
import { Typography, Grid, Divider } from '@material-ui/core'

const DragHandle = SortableHandle(() => <ReorderIcon />)
/**
 * React sortable hoc doesn't work well with libraries that depend on parent component
 * had to create list and list item from scratch
 */
const devideInset = '60px'
const styles = {
  itemRoot: {
    zIndex: 100000,
    width: '100%',
  },
  item: {
    background: '#fff',
    padding: '10px 20px',
  },
  devide: {
    height: '1px',
    marginLeft: devideInset,
    width: `calc(100% - ${devideInset})`,
    backgroundColor: '#eee',
  },
  itemInfo: {
    paddingLeft: '15px',
    flex: 1,
  },
}

const ReorderItem = ({ item }) => (
  <div style={styles.itemRoot}>
    <Grid style={styles.item} container alignItems="center">
      <PropertyIcon type={item.type} />
      <div style={styles.itemInfo}>
        <Typography variant="inherit">{item.name}</Typography>
        <Typography component="span" color="textSecondary">
          {item.label}
        </Typography>
      </div>
      <DragHandle />
    </Grid>
    <Divider inset />
  </div>
)

const SortableItem = SortableElement(({ item }) => <ReorderItem item={item} />)

const SortableList = SortableContainer(({ children }) => <div>{children}</div>)

const ReorderList = ({ reorderItems, onSortEnd }) => (
  <SortableList onSortEnd={onSortEnd} useDragHandle>
    {reorderItems.map((item, index) => (
      <SortableItem key={item.id} index={index} item={item} />
    ))}
  </SortableList>
)

export default ReorderList
