import React from 'react'

import { default as MuiDialog } from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'

import DialogAppBar from '../DialogAppBar'
/**
 * @typedef {import('../DialogAppBar').Props} DialogAppBarProps
 */

/**
 * @type {React.SFC}
 */
const Transition = props => <Slide direction="up" {...props} />

/**
 * Inhertis all DialogAppBar's props
 * @typedef {Object} _Props
 * @prop {(() => void)=} handleClose
 * @prop {boolean=} open
 * @typedef {_Props & DialogAppBarProps} Props
 */

/**
 * @augments React.PureComponent<Props>
 */
export default class Dialog extends React.PureComponent {
  render() {
    const {
      children,
      handleClose,
      open,
      next,
      ...dialogAppBarProps
    } = this.props

    return (
      <MuiDialog
        fullScreen={window.innerWidth < 750}
        fullWidth
        onClose={handleClose}
        open={!!open}
        scroll="paper"
        TransitionComponent={Transition}
      >
        <React.Fragment>
          <DialogAppBar
            onClickCloseButton={handleClose}
            {...dialogAppBarProps}
          />
          <DialogContent>{children}</DialogContent>
        </React.Fragment>
      </MuiDialog>
    )
  }
}
