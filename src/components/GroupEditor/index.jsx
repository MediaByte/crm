import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

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
 * @prop {boolean} isGroupActive If set to true, a deactivate button will be
 * rendered, otherwise a reactivate button will be.
 * @prop {string} Desc
 * @prop {string} Name
 * @prop {(() => void)=} onClickDeactivate
 * @prop {(() => void)=} onClickDesc
 * @prop {(() => void)=} onClickName
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
class GroupEditor extends React.PureComponent {
  render() {
    const {
      isGroupActive,
      Desc,
      Name,
      classes,
      onClickDeactivate,
      onClickDesc,
      onClickName,
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
            onClick={onClickName}
            primaryText="Name"
            secondaryText={Name}
          />
        </Grid>

        <Grid item>
          <DrawerButton
            onClick={onClickDesc}
            primaryText="Description"
            secondaryText={Desc}
          />
        </Grid>

        <Grid item>
          <Button
            className={classes.actionButton}
            color={isGroupActive ? 'secondary' : 'primary'}
            onClick={isGroupActive ? onClickDeactivate : onClickReactivate}
            style={activationBtnStyle}
            fullWidth
          >
            {isGroupActive ? <DeleteOutline /> : <RestoreIcon />}
            {isGroupActive ? (
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
)(GroupEditor)

export default styled
