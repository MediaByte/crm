import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import DeleteOutline from '@material-ui/icons/DeleteOutline'
import RestoreIcon from '@material-ui/icons/RestoreOutlined'

import DrawerButton from 'components/DrawerButton'
import { withStyles } from '@material-ui/core/styles'

const activationBtnStyle = { backgroundColor: 'white' }
const activationBtnTxtStyle = { marginLeft: '5px' }

/**
 * @typedef {import('@material-ui/core').Theme} Theme
 */

/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRulesCallback<K>} StyleRulesCallback
 */

/**
 * @typedef {object} Props
 * @prop {React.ComponentType<import('@material-ui/core/SvgIcon').SvgIconProps>=} icon
 * @prop {boolean} isNodeActive If set to true, a deactivate button will be
 * rendered, otherwise a reactivate button will be.
 * @prop {string} label
 * @prop {(() => void)=} onClickDeactivate
 * @prop {(() => void)=} onClickIcon
 * @prop {(() => void)=} onClickLabel
 * @prop {(() => void)=} onClickReactivate
 */

/**
 * @param {Theme} theme
 */
const styles = theme => ({
  actionButton: {
    position: 'absolute',
    bottom: 34,
  },
})

export {} // stop jsdoc from merging

/**
 * @augments React.PureComponent<Props & { classes: Classes }>
 */
class NodeEditor extends React.PureComponent {
  render() {
    const {
      icon,
      isNodeActive,
      label,
      classes,
      onClickDeactivate,
      onClickIcon,
      onClickLabel,
      onClickReactivate,
    } = this.props

    return (
      <Grid
        alignContent="stretch"
        container
        direction="column"
        justify="flex-start"
        spacing={16}
      >
        <Grid item>
          <DrawerButton
            onClick={onClickLabel}
            primaryText="Label"
            secondaryText={label}
          />
        </Grid>

        <Grid item>
          <Typography>ICON</Typography>
        </Grid>

        <Grid item>
          <DrawerButton icon={icon} onClick={onClickIcon} />
        </Grid>

        <Grid item>
          <Button
            className={classes.actionButton}
            color={isNodeActive ? 'secondary' : 'primary'}
            onClick={isNodeActive ? onClickDeactivate : onClickReactivate}
            style={activationBtnStyle}
          >
            {isNodeActive ? <DeleteOutline /> : <RestoreIcon />}
            {isNodeActive ? (
              <span style={activationBtnTxtStyle}>Deactivate</span>
            ) : (
              <span style={activationBtnTxtStyle}>Reactivate</span>
            )}
          </Button>
        </Grid>
      </Grid>
    )
  }
}

/**
 * @typedef {keyof ReturnType<typeof styles>} ClassNames
 * @typedef {Record<ClassNames, string>} Classes
 */

export {} // stop jsdoc comments from merging

/**
 * A reusable header bar for use in app dialogs, offers close and action buttons
 * with their corresponding callback.
 */
const styled = withStyles(
  /** @type {StyleRulesCallback<ClassNames>} */ (styles),
)(NodeEditor)

export default styled
