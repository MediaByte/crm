import React from 'react'

import {
  Typography,
  withStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Grid,
  Switch,
  List,
} from '@material-ui/core'

import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const styles = {
  listItem: {
    background: '#fff',
  },
}

const primaryTypographyPropsIfRed = {
  color: 'error',
}

/**
 * @typedef {object} Props
 * @prop {Record<keyof typeof styles, string>} classes
 * @prop {(React.ComponentType<import('@material-ui/core/SvgIcon').SvgIconProps>|null)=} icon
 * @prop {string=} id (Optional) The onClick prop will be called with this id as
 * the first argument if provided.
 * @prop {boolean=} isSwitch (Optional) Renders an switch, useful for setting
 * boolean options.
 * @prop {((id?: string) => void)=} onClick
 * @prop {string=} primaryText (Optional)
 * @prop {boolean=} primaryTextRed (Optional) Makes the button's primary text
 * red, this is useful for using it as a delete button for example.
 * @prop {string=} secondaryText (Optional)
 * @prop {boolean=} secTextAtBottom (Optional)
 * @prop {boolean=} switchOn (Optional) If provided together with the isSwitch
 * prop, the switch will be in the ON position.
 */

/**
 * @augments React.PureComponent<Props>
 */
class DrawerButton extends React.PureComponent {
  onClick = () => {
    const { id, onClick } = this.props

    onClick && onClick(id)
  }

  render() {
    const {
      classes,
      icon: Icon,
      id,
      isSwitch,
      primaryText,
      primaryTextRed,
      secondaryText,
      secTextAtBottom,
      switchOn,
    } = this.props

    const actuallySwitchOn = typeof switchOn === 'undefined' ? false : switchOn

    return (
      <List disablePadding data-id={id} onClick={this.onClick}>
        <ListItem className={classes.listItem} button>
          {Icon && (
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
          )}
          <ListItemText
            primary={primaryText}
            // @ts-ignore
            primaryTypographyProps={
              primaryTextRed ? primaryTypographyPropsIfRed : undefined
            }
            secondary={secTextAtBottom && secondaryText}
          />

          <ListItemSecondaryAction>
            {isSwitch ? (
              <Switch checked={actuallySwitchOn} color="primary" />
            ) : !secTextAtBottom && secondaryText ? (
              <Grid container alignItems="center">
                <Typography color="textSecondary">{secondaryText}</Typography>
                <ChevronRightIcon color="disabled" fontSize="small" />
              </Grid>
            ) : (
              <ChevronRightIcon color="disabled" fontSize="small" />
            )}
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    )
  }
}

/**
 * Needs to be wrapped in `<List />` to work correctly.
 */
export default withStyles(styles)(DrawerButton)
