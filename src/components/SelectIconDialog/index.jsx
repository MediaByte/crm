import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
/**
 * @typedef {import('@material-ui/core/IconButton').IconButtonProps} IconButtonProps
 * @typedef {import('@material-ui/core/SvgIcon').SvgIconProps} SvgIconProps
 * @typedef {import('@material-ui/core/styles').Theme} Theme
 * @typedef {import('@material-ui/core/Tabs').TabsProps} TabsProps
 */
/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRules<K>} StyleRules
 */

import DialogAppBar from '../DialogAppBar'

import SelectableIcon from './SelectableIcon'
/**
 * @typedef {import('./SelectableIcon').Props} SelectableIconProps
 */

/**
 * The castings are for making this object behaving as an enum. With no casts
 * each member is narrowed down to `string` then when importing it somewhere
 * else `striing is not assignable to IconStyle` errors will pop up.
 */
export const IconStyle = {
  filled: /** @type {'filled'} */ ('filled'),
  outlined: /** @type {'outlined'} */ ('outlined'),
  twoTone: /** @type {'two-tone'} */ ('twoTone'),
}

/**
 * @typedef {keyof typeof IconStyle} IconStyle
 */

/**
 * @typedef {object} Props
 * @prop {(ReadonlyArray<React.ReactElement<SvgIconProps>>)} children
 * (Optional) Icons to be rendered in the list of icons.
 * @prop {Record<ClassNames, string>} classes
 * @prop {IconStyle=} currentIconStyle (Optional) If provided, displays the
 * corresponding icon variant tab as selected. However, the icons themselves
 * must be switched to the corrent variant through the `children` prop. If this
 * prop is not provided, no icon tab is selected and no icons will be rendered.
 * @prop {(() => void)=} handleClose (Optional) Called when the user tries to
 * close the dialog through either clicking either outside of it or the close
 * button at the top of the dialog. It'd be ideal to set `open` to false when
 * this callback gets executed.
 * @prop {((i: number) => void)=} onClickIcon (Optional) If provided, will
 * be called when an icon is clicked, with the index as the first and only
 * argument.
 * @prop {((nextvalue: IconStyle) => void)=} onTabChange (Optional) If provided,
 * will be called with the the value (icon variety) of the tab the user is
 * trying to switch to.
 * @prop {boolean} open Controls whether the dialog is on display.
 * @prop {number=} selectedIconIndex (Optional) If provided, the selected icon
 * will be shown as such. It will also shown separately from the list of icons.
 */

/**
 * @augments React.PureComponent<Props>
 */
class SelectIconDialog extends React.PureComponent {
  /**
   * @private
   * @type {TabsProps['onChange']}
   */
  onTabChange = (_, value) => {
    const { onTabChange } = this.props

    onTabChange && onTabChange(value)
  }

  render() {
    const {
      children,
      classes,
      currentIconStyle,
      handleClose,
      onClickIcon,
      open,
      selectedIconIndex,
    } = this.props

    // TODO: don't use i for key
    const icons = children.map((icon, i) => (
      <IconWrapper
        i={i}
        key={i}
        onClick={onClickIcon}
        selected={selectedIconIndex === i}
      >
        {icon}
      </IconWrapper>
    ))

    return (
      <Dialog
        fullScreen={window.innerWidth < 750}
        fullWidth
        onClose={handleClose}
        open={open}
        scroll="body"
      >
        <DialogAppBar
          onClickCloseButton={handleClose}
          showBackArrow
          title="Select Icon"
        />

        <Grid
          alignContent="center"
          alignItems="center"
          container
          direction="column"
          justify="flex-start"
        >
          {typeof selectedIconIndex === 'number' && (
            <React.Fragment>
              <Typography color="primary" variant="body1">
                Selected Icon
              </Typography>
              <SelectableIcon big selected>
                {children[selectedIconIndex]}
              </SelectableIcon>
            </React.Fragment>
          )}
          <Paper className={classes.tabsPaper} square>
            <Tabs onChange={this.onTabChange} value={currentIconStyle}>
              <Tab label="Filled" value={IconStyle.filled} />
              <Tab label="Outlined" value={IconStyle.outlined} />
              <Tab label="Two-Tone" value={IconStyle['twoTone']} />
            </Tabs>
          </Paper>
          <Grid className={classes.iconsList} container justify="center">
            {//
            // @ts-ignore why do I care if it's undefined, the in operator will
            // still work
            currentIconStyle in IconStyle &&
              typeof selectedIconIndex === 'number' &&
              icons}
          </Grid>
        </Grid>
      </Dialog>
    )
  }
}

/**
 * @typedef {object} WrapperProps
 * @prop {SelectableIconProps['children']} children
 * @prop {number} i
 * @prop {((i: number) => void)=} onClick
 * @prop {boolean} selected
 */
/**
 * A wrapper used to not create new functions everytime the icons
 * in SelectIconDialog are mapped to components (resulting in unnecessary
 * re-renders). Purely an optimization technique.
 * @augments React.PureComponent<WrapperProps>
 */
class IconWrapper extends React.PureComponent {
  onClick = () => {
    const { i, onClick } = this.props

    onClick && onClick(i)
  }

  render() {
    return (
      <SelectableIcon onClick={this.onClick} selected={this.props.selected}>
        {this.props.children}
      </SelectableIcon>
    )
  }
}

const styles = {
  iconsList: {
    backgroundColor: '#ccc',
  },
  tabsPaper: {
    maxWidth: '80%',
  },
}

/**
 * @typedef {keyof typeof styles} ClassNames
 */

export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {StyleRules<ClassNames>} */ (styles),
)(SelectIconDialog)
