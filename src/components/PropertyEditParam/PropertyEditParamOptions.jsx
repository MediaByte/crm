import React from 'react'
import { Grid, Typography, Divider, IconButton } from '@material-ui/core'
import {
  RemoveCircleOutline,
  RadioButtonChecked,
  RadioButtonUnchecked,
  Reorder,
  AddCircleOutline,
} from '@material-ui/icons'

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc'

const DragHandle = SortableHandle(() => <Reorder color="disabled" />)
/**
 * React sortable hoc doesn't work well with libraries that depend on parent component
 * had to create list and list item from scratch
 */
const styles = {
  itemRoot: {
    zIndex: 100000, // add this to fix bug with react-sortable-hoc
    width: '100%',
  },
  item: {
    background: '#fff',
    padding: '10px 20px',
  },
}

const ReorderItem = ({ item, onRemove, onPick, picked, devider }) => (
  <div style={styles.itemRoot}>
    <Grid
      style={styles.item}
      container
      alignItems="center"
      justify="space-between"
    >
      <Grid item>
        <Grid container alignItems="center">
          <IconButton onClick={onRemove}>
            {picked ? (
              <RadioButtonChecked color="primary" />
            ) : (
              <RadioButtonUnchecked />
            )}
          </IconButton>
          <Typography>{item.label}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          <IconButton onClick={onRemove}>
            <RemoveCircleOutline color="secondary" />
          </IconButton>
          <DragHandle />
        </Grid>
      </Grid>
    </Grid>
    {devider && <Divider />}
  </div>
)

const SortableItem = SortableElement(props => <ReorderItem {...props} />)

const SortableList = SortableContainer(({ children }) => <div>{children}</div>)

const ReorderList = ({ reorderItems, onSortEnd }) => (
  <SortableList onSortEnd={onSortEnd} useDragHandle>
    {reorderItems.map((item, index) => (
      <SortableItem
        key={item.name}
        index={index}
        item={item}
        picked={item.name === 'home'}
        onRemove={() => {}}
        onPick={() => {}}
        devider={index !== reorderItems.length - 1}
      />
    ))}
  </SortableList>
)

const PropertyEditParamOptions = ({ options, onSortEnd, classes, onPick }) => {
  return (
    <Grid container direction="column" spacing={40}>
      <Grid item alignContent="flex-end">
        <Typography align="center">
          Selected Icon will appear next to the property
        </Typography>
      </Grid>
      <Grid item>
        <ReorderList reorderItems={options} onSortEnd={onSortEnd} />
        <IconButton onClick={onPick} aria-label="Plus">
          <AddCircleOutline fontSize="small" color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default PropertyEditParamOptions
