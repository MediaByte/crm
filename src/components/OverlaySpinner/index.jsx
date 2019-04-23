import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    position: 'relative',
  },
  spinner: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
}

/**
 * @typedef {object} Props
 * @prop {Record<keyof typeof styles, string>} classes
 * @prop {(boolean|undefined)=} showSpinner
 */

/**
 * @type {React.SFC<Props>}
 */
const OverlaySpinner = ({ children, classes, showSpinner }) => (
  <div className={classes.root}>
    {children}
    {showSpinner && <CircularProgress className={classes.spinner} />}
  </div>
)

export default withStyles(
  /** @type {import('@material-ui/core/styles/withStyles').StyleRules<keyof typeof styles>} */ (styles),
)(OverlaySpinner)
