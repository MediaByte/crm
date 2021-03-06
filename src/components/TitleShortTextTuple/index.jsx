import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRules<K>} StyleRules
 */

/**
 * @typedef {object} Props
 * @prop {Record<keyof typeof styles, string>} classes Don't pass in this prop,
 * it will be passed in by material-ui.
 * @prop {(React.ComponentType|null|false|undefined)=} icon
 * @prop {React.DOMAttributes<HTMLDivElement>['onClick']=} onClick (Optional)
 * @prop {boolean=} pointerCursor (Optional) If passed, will show the pointer
 * cursor on hover.
 * @prop {string} text
 * @prop {string} title
 */

export {} // prevent JSDOC comments from merging

/**
 * A left-aligned title and short text pair (text will always appear below the
 * title plus some indentation). Receives an optional icon component to be
 * rendered alongside the title.
 * @augments React.PureComponent<Props>
 */
class TitleShortTextTuple extends React.PureComponent {
  render() {
    const {
      classes,
      icon: Icon,
      onClick,
      pointerCursor,
      text,
      title,
    } = this.props

    return (
      <div
        className={
          pointerCursor ? classes.rootStylePointerCursor : classes.root
        }
        onClick={onClick}
      >
        <div className={classes.heading}>
          <Typography align="left" color="textSecondary" variant="h5">
            {title}
          </Typography>
          {Icon && (
            <IconButton>
              <Icon />
            </IconButton>
          )}
        </div>
        <Typography
          className={classes.text}
          align="left"
          variant="subtitle1"
          paragraph
        >
          {text}
        </Typography>
      </div>
    )
  }
}

const rootStyle = {
  alignContent: 'flex-start',
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
}

const styles = {
  root: rootStyle,
  rootStylePointerCursor: {
    ...rootStyle,
    cursor: 'pointer',
  },
  heading: {
    alignContent: 'flex-start',
    alignItems: 'center', // line up the title and the icon
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  text: {
    paddingLeft: 6,
  },
}

export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {StyleRules<keyof typeof styles>} */ (styles),
)(TitleShortTextTuple)
