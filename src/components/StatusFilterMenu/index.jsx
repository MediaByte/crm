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
 * @typedef {import('@material-ui/core/styles').StyleRulesCallback<K>} StyleRulesCallback
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

export {} // stop jsdoc comments from merging

/**
 * @typedef {object} Props
 * @prop {MenuProps['anchorEl']} anchorEl DOM element to which the filter
 * pop-over menu will attach itself.
 * @prop {Record<classNames, string>} classes Don't pass this prop, it is passed
 * to the component by material-ui.
 * @prop {string|undefined|false} currentStatusValue
 * @prop {MenuProps['onClose']=} onClose Called when the user blurs the menu.
 * @prop {MenuProps['open']} open
 * @prop {((statusValue: string) => void)=} onStatusChange Called with the curent
 * status changes. Called with an empty string if the user picks 'All' from the
 * drop down list.
 * @prop {Status[]} possibleStatuses
 */

export {} // stop jsdoc comments from merging

/**
 * A data-agnostic pop-over menu for filtering statuses from a given list. The
 * most common use case is to have a control to show/hide the menu, anchored to
 * the provided DOM node through the `anchorEl` prop, and update a list based
 * on the current status selected by the user. It provides an 'All' selection by
 * default, which calls the selection change callback with an empty string.
 * @augments React.PureComponent<Props>
 */
class StatusFilterMenu extends React.PureComponent {
  /**
   * @type {Pick<Props, 'currentStatusValue'>}
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
   * When the user clicks the reset button, we probably want to revert to the
   * 'All' filter, that is, no filter, that's what done inside this function.
   * @private
   */
  _onClickReset = () => {
    const { onStatusChange } = this.props
    if (onStatusChange) {
      onStatusChange(StatusFilterMenu.defaultStatuses[0].value)
    }
  }

  /**
   * Receives the newly selected value from the drop-down menu and calls the
   * `onStatusChange()` callback with the value as argument.
   * @private
   * @type {SelectProps['onChange']}
   */
  _onSelectChange = ({ target: { value: statusValue } }) => {
    const { onStatusChange } = this.props
    if (onStatusChange) {
      onStatusChange(statusValue)
    }
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
                  {StatusFilterMenu.defaultStatuses
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
 * Styles for the `<StatusFilterMenu />` component/.
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

/**
 * @typedef {keyof ReturnType<typeof styles>} classNames
 */

export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {StyleRulesCallback<classNames>} */ (styles),
)(StatusFilterMenu)
