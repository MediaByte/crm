import React, { PureComponent } from 'react'
import {
  Grid,
  Typography,
  Divider,
  IconButton,
  Radio,
  Checkbox,
  TextField,
  Button,
} from '@material-ui/core'
import {
  RemoveCircleOutline,
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

const ReorderItem = ({
  displayValue,
  onClickDelete,
  checked,
  devider,
  showCheckboxes,
}) => (
  <div style={styles.itemRoot}>
    <Grid
      style={styles.item}
      container
      alignItems="center"
      justify="space-between"
    >
      <Grid item>
        <Grid container alignItems="center">
          {showCheckboxes ? (
            <Checkbox
              checked={checked}
              onChange={() => {}}
              value={displayValue}
              color="primary"
            />
          ) : (
            <Radio
              color="primary"
              checked={checked}
              onChange={() => {}}
              value={displayValue}
            />
          )}
          <Typography>{displayValue}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          <IconButton onClick={onClickDelete}>
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

const ReorderList = ({
  reorderItems,
  onSortEnd,
  onClickDelete,
  checkedCheckboxIndex,
  showCheckboxes,
}) => (
  <SortableList onSortEnd={onSortEnd} useDragHandle>
    {reorderItems.map(({ displayValue }, index) => (
      <SortableItem
        onClickDelete={onClickDelete}
        checked={checkedCheckboxIndex === index}
        showCheckboxes={showCheckboxes}
        key={displayValue}
        index={index}
        displayValue={displayValue}
        devider={index !== reorderItems.length - 1}
      />
    ))}
  </SortableList>
)

const optionsEditorSamplePropsA = {
  addingOption: true,
  checkedCheckboxIndex: 1,
  currentValueForAddingOption: '',
  options: [
    {
      displayValue: 'Glasses',
    },
    {
      displayValue: 'Pants',
    },
    {
      displayValue: 'Shoes',
    },
  ],
  onChangeAddingOptionText: undefined,
  onClickAdd: undefined,
  onClickDelete: undefined,
  onSortEnd: undefined,
  onClickSave: undefined,
  showCheckboxes: true,
}

class OptionsEditor extends PureComponent {
  render() {
    const {
      addingOption,
      checkedCheckboxIndex,
      currentValueForAddingOption,
      options,
      onChangeAddingOptionText,
      onClickAdd,
      onClickDelete,
      onSortEnd,
      // onClickSave,
      showCheckboxes,
    } = this.props

    return (
      <div style={{ padding: '20px' }}>
        <Grid container direction="column" spacing={40}>
          <Grid item>
            <Typography align="center">
              Selected Icon will appear next to the property
            </Typography>
          </Grid>
          <Grid item>
            <ReorderList
              reorderItems={options}
              onSortEnd={onSortEnd}
              onClickDelete={onClickDelete}
              checkedCheckboxIndex={checkedCheckboxIndex}
              showCheckboxes={showCheckboxes}
            />
            {addingOption ? (
              <Grid container alignItems="center">
                <Grid item style={{ flex: 1 }}>
                  <TextField
                    id="name"
                    fullWidth
                    value={currentValueForAddingOption}
                    onChange={onChangeAddingOptionText}
                    margin="normal"
                  />
                </Grid>
                <Grid item>
                  <Button color="primary">Save</Button>
                </Grid>
              </Grid>
            ) : (
              <IconButton onClick={onClickAdd} aria-label="Plus">
                <AddCircleOutline fontSize="small" color="primary" />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </div>
    )
  }
}

OptionsEditor.defaultProps = optionsEditorSamplePropsA

export default OptionsEditor
