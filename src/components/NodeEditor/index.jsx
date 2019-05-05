import React from 'react'

import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'

import DrawerButton from 'components/DrawerButton'

/**
 * @typedef {object} Props
 * @prop {React.ComponentType<import('@material-ui/core/SvgIcon').SvgIconProps>=} icon
 * @prop {string} label
 * @prop {(() => void)=} onClickDeactivate
 * @prop {(() => void)=} onClickIcon
 * @prop {(() => void)=} onClickLabel
 */

/**
 * @augments React.PureComponent<Props>
 */
export default class NodeEditor extends React.PureComponent {
  render() {
    const {
      icon,
      label,
      onClickDeactivate,
      onClickIcon,
      onClickLabel,
    } = this.props

    return (
      <Grid alignContent="center" direction="column" container>
        <Typography>
          You can only change a node's label but not the name. The label is a
          free form bla bla bla
        </Typography>

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

        <Typography>
          Deactivating a node bla bla bla bla bla bla bla...
        </Typography>

        <List>
          <DrawerButton
            onClick={onClickDeactivate}
            primaryText="Deactivate"
            primaryTextRed
          />
        </List>
      </Grid>
    )
  }
}
