import React from 'react'

import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItem from '@material-ui/core/ListItem'

import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

/**
 * @typedef {object} Props
 * @prop {number} id
 * @prop {((id: number) => void)=} onClick (Optional) Handler for the onClick
 * event called with the id of the item.
 * @prop {boolean=} selected Pass true to highlight the item
 * compared to its siblings.
 * @prop {string|null|boolean=} subtitle Text that will rendered below
 * the main title in smaller type.
 * @prop {string} title Main text that gets rendered for the item.
 */

export {} // stop jsdoc comments from merging

/**
 * A simple list item to show a a title and a subtitle beneath it. To be wrapped
 * inside a material-ui's `<List />`.
 * @augments React.PureComponent<Props>
 */
export default class TitleSubtitleListItem extends React.PureComponent {
  onClick = () => {
    const { onClick, id } = this.props

    onClick && onClick(id)
  }

  render() {
    const { selected, subtitle, title } = this.props

    return (
      <ListItem onClick={this.onClick} selected={selected} style={style}>
        <ListItemText primary={title} secondary={subtitle} />
        <Hidden smUp>
          {/* TODO: Why smUp here?*/}
          <ListItemSecondaryAction>
            <IconButton>
              <KeyboardArrowRight />
            </IconButton>
          </ListItemSecondaryAction>
        </Hidden>
      </ListItem>
    )
  }
}

/** @type {React.CSSProperties} */
const style = {
  cursor: 'pointer',
}
