import React from 'react'

import Grid from '@material-ui/core/Grid'
/**
 * @typedef {import('@material-ui/core/SvgIcon').SvgIconProps} SvgIconProps
 */

import SelectableIcon from 'components/SelectableIcon'

/**
 * @typedef {object} Props
 * @prop {Array<React.ComponentType<SvgIconProps>>} icons
 * @prop {((idx: number) => void)=} onClickIcon
 * @prop {(number|null|boolean)=} selectedIconIdx
 */

/**
 * @augments React.PureComponent<Props>
 */
export default class IconSelector extends React.PureComponent {
  /**
   * @private
   * @param {{ currentTarget: { dataset: { i: string } }}} e
   */
  onClick = e => {
    const { onClickIcon } = this.props
    const idx = e.currentTarget.dataset.i

    if (onClickIcon) {
      onClickIcon(Number(idx))
    }
  }

  render() {
    const { icons, selectedIconIdx } = this.props

    return (
      <Grid
        alignItems="center"
        alignContent="center"
        container
        justify="center"
        spacing={0}
      >
        {icons.map((icon, i) => (
          <Grid item key={i}>
            <SelectableIcon
              selected={i === selectedIconIdx}
              data-i={i}
              // @ts-ignore dataset isnt typed
              onClick={this.onClick}
              icon={icon}
            />
          </Grid>
        ))}
      </Grid>
    )
  }
}
