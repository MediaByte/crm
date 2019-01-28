import React from 'react'

import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
/**
 * @typedef {import('@material-ui/core/MenuItem').MenuItemProps} MenuItemProps
 * @typedef {import('@material-ui/core/Select').SelectProps} SelectProps
 * @typedef {import('@material-ui/core/SvgIcon').SvgIconProps} SvgIconProps
 */

/**
 * @typedef {object} Item
 *
 * @prop {(React.ComponentType<SvgIconProps>)=} icon (Optional) An icon for
 * displaying along side the text in each item.
 * @prop {string=} readableText (Optional) Human-readable text for displaying on
 * each item. If not provided, the text will fall back to the value property.
 * @prop {string} value The value for each drop down item.
 */

/**
 * @param {Item} item
 * @param {number} i
 * @param {any[]} arr
 * @returns {[React.ReactElement<MenuItemProps>, React.ReactNode]} Mui wants us
 * to return an array instead of a fragment.
 */
const itemToElement = ({ icon: Icon, readableText, value }, i, { length }) => [
  <MenuItem key={value} value={value}>
    {Icon && (
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
    )}
    <ListItemText inset={!Icon} primary={readableText || value} />
  </MenuItem>,
  i !== length - 1 && (
    <li>
      <Divider />
    </li>
  ),
]

/**
 * @typedef {object} Props
 * @prop {boolean=} fullWidth (Optional) Pass true to have the select take up
 * the full width of its parent container.
 * @prop {Item[]} items
 * @prop {((nextValue: string) => void)=} onValueChange (Optional) If provided,
 * it will be called with the new value when clicked on its item.
 * @prop {(string|undefined|null)=} selectedValue (Optional) The current
 * selected value/item. If not provided, this state will be handled internally.
 * Will default to the first item.
 * and changes can still be
 * subscribed to through the `onValueChange` prop.
 */

/**
 * @typedef {object} State
 * @prop {string|undefined|boolean} selectedValue
 */

/**
 * @augments React.PureComponent<Props, State>
 */
export default class IconTextDropDown extends React.PureComponent {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props)

    if (!this.props.items.length) {
      console.warn('Empty items array provided to <IconTextDropDown/>')
    }

    /** @type {State} */
    this.state = {
      selectedValue: this.props.items[0]
        ? this.props.items[0].value
        : undefined,
    }
  }

  /**
   * @type {SelectProps['onChange']}
   */
  onChange = ({ target: { value } }) => {
    const { onValueChange } = this.props

    onValueChange && onValueChange(value)

    this.setState({
      selectedValue: value,
    })
  }

  render() {
    const { fullWidth, items } = this.props
    const selectedValue = this.props.selectedValue || this.state.selectedValue

    return (
      <Select
        fullWidth={fullWidth}
        onChange={this.onChange}
        value={selectedValue}
      >
        {items.map(itemToElement)}
      </Select>
    )
  }
}
