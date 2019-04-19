import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from '@material-ui/core'

/**
 * @typedef {object} Props
 * @prop {boolean=} disableCancelButton
 * @prop {boolean=} disableSaveButton
 * @prop {() => void} handleClose
 * @prop {() => void} handleSave
 * @prop {string} title
 * @prop {boolean} open
 */

/**
 * @type {React.SFC<Props>}
 */
const AddPropertyDialog = ({
  children,
  disableCancelButton,
  disableSaveButton,
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
      <Button
        onClick={handleClose}
        color="primary"
        disabled={disableCancelButton}
      >
        Cancel
      </Button>
      <Button onClick={handleSave} color="primary" disabled={disableSaveButton}>
        Save
      </Button>
    </DialogActions>
  </Dialog>
)

export default AddPropertyDialog
