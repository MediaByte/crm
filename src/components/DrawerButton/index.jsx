import React from 'react'

import {
  Typography,
  withStyles,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Grid,
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
 * @prop {string} primaryText
 * @prop {boolean=} primaryTextRed (Optional) Makes the button's primary text
 * red, this is useful for using it as a delete button for example.
 * @prop {string=} secondaryText
 * @prop {boolean=} secTextAtBottom
 * @prop {(() => void)=} onClick
 */

/**
 * @augments React.PureComponent<Props>
 */
class DrawerButton extends React.PureComponent {
  render() {
    const {
      classes,
      primaryText,
      primaryTextRed,
      secondaryText,
      secTextAtBottom,
      onClick,
    } = this.props

    return (
      <ListItem className={classes.listItem} button onClick={onClick}>
        <ListItemText
          // @ts-ignore
          primaryTypographyProps={
            primaryTextRed ? primaryTypographyPropsIfRed : undefined
          }
          primary={primaryText}
          secondary={secTextAtBottom && secondaryText}
        />
        <ListItemSecondaryAction>
          {!secTextAtBottom && secondaryText ? (
            <Grid container alignItems="center">
              <Typography color="textSecondary">{secondaryText}</Typography>
              <ChevronRightIcon color="disabled" fontSize="small" />
            </Grid>
          ) : (
            <ChevronRightIcon color="disabled" fontSize="small" />
          )}
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

/**
 * Needs to be wrapped in `<List />` to work correctly.
 */
export default withStyles(styles)(DrawerButton)
