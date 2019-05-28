import React from 'react'

import Grid from '@material-ui/core/Grid'
/**
 * @typedef {import('@material-ui/core/SvgIcon').SvgIconProps} SvgIconProps
 */

import SelectableIcon from 'components/SelectableIcon'

/**
 * @typedef {object} Props
 * @prop {Array<React.ComponentType<SvgIconProps>>} icons
 * @prop {((idx: number) => void)=} onClickIcon (Optional) Gets called with -1
 * when clicking on the 'no icon' option.
 * @prop {(number|null|boolean)=} selectedIconIdx
 * @prop {boolean=} showNoIconOption If set to true, will show a 'no icon'
 * option.
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
    const { icons, selectedIconIdx, showNoIconOption } = this.props

    return (
      <Grid
        alignItems="center"
        alignContent="center"
        container
        justify="center"
        spacing={0}
      >
        {showNoIconOption && (
          <Grid item>
            <SelectableIcon
              data-i={-1}
              // @ts-ignore dataset isnt typed
              onClick={this.onClick}
              selected={selectedIconIdx === -1}
              text="No Icon   "
            />
          </Grid>
        )}
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
