import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from '@material-ui/core'

const AddPropertyDialog = ({
  children,
  handleClose,
  handleSave,
  title,
  open,
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="add-property-dialog-title"
  >
    <DialogTitle id="add-property-dialog-title">{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSave} color="primary" disabled>
        Save
      </Button>
    </DialogActions>
  </Dialog>
)

export default AddPropertyDialog
