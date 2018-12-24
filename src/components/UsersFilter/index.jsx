import React from 'react'

import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
/**
 * @typedef {import('@material-ui/core/Menu').MenuProps} MenuProps
 * @typedef {import('@material-ui/core/index').Theme} Theme
 * @typedef {import('@material-ui/core/Select').SelectProps} SelectProps
 */
/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRules<K>} StyleRules
 */

import * as R from '../../res'

/**
 * A displayValue and value map for presenting status options inside the filter.
 * @typedef {object} Status
 * @prop {string} displayValue The text that is shown to the user to select the
 * status.
 * @prop {string} value Value of the status, will be passed to corresponding
 * callbacks.
 */

/**
 * @typedef {object} UsersFilterProps
 * @prop {MenuProps['anchorEl']} anchorEl DOM element to which the filter
 * pop-over menu will attach itself.
 * @prop {StyleRules<keyof ReturnType<typeof styles>>} classes Don't pass this
 * prop, it is passed to the component by material-ui.
 * @prop {string|undefined|false|null} currentStatusValue
 * @prop {MenuProps['onClose']} onClose Called when the user blurs the menu.
 * @prop {MenuProps['open']} open
 * @prop {(statusValue: string) => void} onStatusChange Called with the curent
 * status changes. Called with an empty string if the user picks 'All' from the
 * drop down list.
 * @prop {Status[]} possibleStatuses
 */

/**
 * @augments React.PureComponent<UsersFilterProps>
 */
class UsersFilter extends React.PureComponent {
  /**
   * @type {Pick<UsersFilterProps, 'currentStatusValue'>}
   */
  static defaultProps = {
    currentStatusValue: '',
  }

  /**
   * @type {Status[]}
   */
  static defaultStatuses = [
    {
      displayValue: 'All',
      value: '',
    },
  ]

  /**
   * @private
   */
  _onClickReset = () => {
    this.props.onStatusChange(UsersFilter.defaultStatuses[0].value)
  }

  /**
   * @private
   * @type {SelectProps['onChange']}
   */
  _onSelectChange = ({ target: { value: statusValue } }) => {
    this.props.onStatusChange(statusValue)
  }

  render() {
    const {
      classes,
      currentStatusValue,
      onStatusChange,
      possibleStatuses,
      ...menuProps
    } = this.props

    return (
      <Menu {...menuProps}>
        <div className={classes.filterBox}>
          <div style={{ float: 'right' }}>
            <Button
              component="span"
              className={classes.resetButton}
              onClick={this._onClickReset}
            >
              RESET
            </Button>
          </div>
          <Typography
            variant="button"
            color="inherit"
            className={classes.filterButton}
          >
            FILTERS
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={9}>
              <FormControl className={classes.formControl}>
                <InputLabel>Status</InputLabel>
                <Select
                  autoWidth
                  displayEmpty
                  onChange={this._onSelectChange}
                  value={currentStatusValue}
                >
                  {UsersFilter.defaultStatuses
                    .concat(possibleStatuses)
                    .map(({ displayValue, value }, i) => (
                      <MenuItem key={value} value={value}>
                        {i === 0 ? <em>{displayValue}</em> : displayValue}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </div>
      </Menu>
    )
  }
}

/**
 * @param {Theme} theme
 */
const styles = theme => ({
  filterBox: {
    padding: 15,
  },
  filterButton: {
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  resetButton: {
    color: R.Colors.MAIN_TEAL,
    marginTop: '-10px',
  },
})

export default withStyles(styles)(UsersFilter)
