import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
/**
 * @typedef {import('@material-ui/core/SvgIcon').SvgIconProps} SvgIconProps
 * @typedef {import('@material-ui/core/IconButton').IconButtonProps} IconButtonProps
 * @typedef {import('@material-ui/core').Theme} Theme
 */
/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRulesCallback<K>} StyleRulesCallback
 */

import CheckCircle from '@material-ui/icons/CheckCircle'

/**
 * @typedef {object} Props
 * @prop {boolean=} big (Optional) If passed in, set the icon to a bigger (1.5x)
 * size.
 * @prop {React.ReactElement<SvgIconProps>=} children The icon to be rendered.
 * @prop {Record<ClassNames, string>} classes
 * @prop {React.ComponentType<SvgIconProps>=} icon (Optional) Use this prop
 * instead of the children prop to prevent re-renders.
 * @prop {IconButtonProps['onClick']=} onClick
 * @prop {boolean=} selected
 */

/**
 * @augments React.PureComponent<Props>
 */
class SelectableIcon extends React.PureComponent {
  render() {
    const {
      big,
      children,
      classes,
      icon: Icon,
      onClick,
      selected,
      ...restProps
    } = this.props

    const icon = children ? (
      React.cloneElement(children, {
        // shouldn't produce unnecesary re-renders since it's an string
        // that is, if shouldComponentUpdate inside MuI's IconButton is
        // well-implemented
        className: big ? classes.bigIcon : classes.icon,
      })
    ) : Icon ? (
      <Icon className={big ? classes.bigIcon : classes.icon} />
    ) : null

    return (
      <div className={(selected && classes.selectedWrapper) || undefined}>
        <RoundedIconButton
          color={(selected && 'primary') || undefined}
          onClick={onClick}
          {...restProps}
        >
          {icon}
        </RoundedIconButton>
        {selected && (
          <CheckCircle color="primary" className={classes.checkCircle} />
        )}
      </div>
    )
  }
}

const ABSOLUTE_OFFSET = -6

const BORDER_RADIUS = 10

const BIG_ICON_SIZE = 72
const ICON_SIZE = 48

const RoundedIconButton = withStyles({
  root: {
    borderRadius: BORDER_RADIUS,
    borderStyle: 'hidden',
  },
})(IconButton)

/**
 * @param {Theme} theme
 */
const styles = theme => ({
  bigIcon: {
    height: BIG_ICON_SIZE,
    width: BIG_ICON_SIZE,
  },
  checkCircle: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: 'white', // otherwise the border shows up through
    position: 'absolute',
    right: ABSOLUTE_OFFSET,
    top: ABSOLUTE_OFFSET,
  },
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedWrapper: {
    borderColor: theme.palette.primary.main,
    borderRadius: BORDER_RADIUS,
    borderStyle: 'solid',
    borderWidth: 2,
    display: 'inline-block',
    position: 'relative',
  },
})

/**
 * @typedef {keyof ReturnType<typeof styles>} ClassNames
 */

/**
 * Unknown props get spread to the underlying `<IconButton />` component.
 */
export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {StyleRulesCallback<ClassNames>} */ (styles),
)(SelectableIcon)
