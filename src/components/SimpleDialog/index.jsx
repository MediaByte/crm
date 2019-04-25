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
 * @prop {string=} actionButtonText (Optional)
 * @prop {boolean=} disableActionButton (Optional) Alias for `disableSaveButton`
 * @prop {boolean=} disableCancelButton
 * @prop {boolean=} disableSaveButton
 * @prop {(() => void)=} handleAction Invoked when the action button is clicked
 * on.
 * @prop {(() => void)=} handleClose (Optional)
 * @prop {(() => void)=} handleSave (Optional) Alias for the `handleAction`
 * prop.
 * @prop {boolean} open
 * @prop {string} title
 */

/**
 * @augments React.PureComponent<Props>
 */
export default class SimpleDialog extends React.PureComponent {
  render() {
    const {
      actionButtonText,
      children,
      disableActionButton,
      disableCancelButton,
      disableSaveButton,
      handleAction,
      handleClose,
      handleSave,
      title,
      open,
    } = this.props

    return (
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
          <Button
            onClick={handleAction || handleSave}
            color="primary"
            disabled={disableActionButton || disableSaveButton}
          >
            {actionButtonText || 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
