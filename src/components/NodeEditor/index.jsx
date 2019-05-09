import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'

import DeleteOutline from '@material-ui/icons/DeleteOutline'

import DrawerButton from 'components/DrawerButton'

const alignSelfCenter = { alignSelf: 'center' }

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
 * @augments React.PureComponent<Props>
 */
export default class NodeEditor extends React.PureComponent {
  render() {
    const {
      icon,
      isNodeActive,
      label,
      onClickDeactivate,
      onClickIcon,
      onClickLabel,
      onClickReactivate,
    } = this.props

    return (
      <Grid
        alignContent="center"
        container
        direction="column"
        justify="flex-start"
      >
        <Grid item>
          <Typography>
            You can only change a node's label but not the name. The label is a
            free form bla bla bla
          </Typography>
        </Grid>

        <List>
          <DrawerButton
            onClick={onClickLabel}
            primaryText="Label"
            secondaryText={label}
          />
        </List>

        <Typography>ICON</Typography>

        <List>
          <DrawerButton icon={icon} onClick={onClickIcon} />
        </List>

        <Grid item style={alignSelfCenter}>
          <Button
            color={isNodeActive ? 'secondary' : 'primary'}
            onClick={isNodeActive ? onClickDeactivate : onClickReactivate}
          >
            <DeleteOutline />
            {isNodeActive ? 'Deactivate' : 'Reactivate'}
          </Button>
        </Grid>
      </Grid>
    )
  }
}
