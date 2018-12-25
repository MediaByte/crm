import React from 'react'

import Add from '@material-ui/icons/Add'
import Cloud from '@material-ui/icons/CloudDownloadOutlined'
import FilterList from '@material-ui/icons/FilterList'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Search from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core'
/**
 * @typedef {import('@material-ui/core').Theme} Theme
 * @typedef {import('@material-ui/core/TextField').BaseTextFieldProps} BaseTextFieldProps
 */
/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRules<K>} StyleRules
 */

import UsersFilter from '../UsersFilter'
/**
 * @typedef {import('../UsersFilter').UsersFilterProps} UsersFilterProps
 */

/**
 * Props to be given to the `<usersListToolbar />` component.
 * @typedef {object} UsersListToolbarProps
 * @prop {StyleRules<keyof ReturnType<typeof styles>>} classes
 * @prop {UsersFilterProps['anchorEl']} filterMenuAnchorEl (Refer to
 * `<UsersFilter />`'s props).
 * @prop {UsersFilterProps['currentStatusValue']} filterMenuCurrentStatusValue
 * (Refer to `<UsersFilter />`'s props).
 * @prop {UsersFilterProps['open']} filterMenuOpen (Refer to`<UsersFilter />`'s
 * props).
 * @prop {number} numberOfRecords
 * @prop {Function} onClickAddNewGroup Called when the user clicks on the plus
 * icon.
 * @prop {Function} onClickFilterButton Consumer should create a dom ref to pass
 * into filter (through filterProps), to which the menu will 'attach'.
 * @prop {Function} onClickSearch Called when the user clicks on the search
 * icon, ideally this should change state above and pass true to the
 * `showSearch` prop as a result.
 * @prop {BaseTextFieldProps['onChange']} onChangeSearchValue Called when the
 * value inside the search text (if it's currently on display) input changes.
 * @prop {UsersFilterProps['onClose']} onCloseFilterMenu (Refer to
 * `<UsersFilter />`'s props).
 * @prop {UsersFilterProps['onStatusChange']} onFilterMenuStatusChange (Refer to
 * `<UsersFilter />`'s props).
 * @prop {UsersFilterProps['possibleStatuses']} possibleStatuses (Refer to
 * `<UsersFilter />`'s props).
 * @prop {boolean|null|undefined} showSearch Determines whether the text input
 * for search should be on display.
 */

export {} // stop jsdoc comments from merging
/**
 * This component receives the underlying <UsersFilter /> props directly as an
 * optimization technique.
 * @augments React.PureComponent<UsersListToolbarProps>
 */
class UsersListToolbar extends React.PureComponent {
  render() {
    const {
      classes,
      filterMenuAnchorEl,
      filterMenuCurrentStatusValue,
      filterMenuOpen,
      numberOfRecords,
      onChangeSearchValue,
      onClickAddNewGroup,
      onClickFilterButton,
      onClickSearch,
      onCloseFilterMenu,
      onFilterMenuStatusChange,
      possibleStatuses,
      showSearch,
    } = this.props

    return (
      <div className={classes.root}>
        {showSearch && (
          <div>
            <TextField
              className={classes.textField}
              type="search"
              margin="dense"
              variant="outlined"
              fullWidth
              placeholder="Search Groups"
              InputProps={{
                startAdornment: (
                  <InputAdornment className={classes.inputAdornment}>
                    <Search className={classes.searchIcon} />
                  </InputAdornment>
                ),
              }}
              onChange={onChangeSearchValue}
            />
          </div>
        )}

        <div className={classes.filters}>
          <IconButton className={classes.icons}>
            <Add onClick={onClickAddNewGroup} />
          </IconButton>
          <IconButton className={classes.icons}>
            <Cloud />
          </IconButton>
          <IconButton className={classes.icons}>
            <Search onClick={onClickSearch} />
          </IconButton>
          <IconButton className={classes.icons}>
            <FilterList onClick={onClickFilterButton} />
          </IconButton>
        </div>
        <UsersFilter
          anchorEl={filterMenuAnchorEl}
          currentStatusValue={filterMenuCurrentStatusValue}
          onClose={onCloseFilterMenu}
          onStatusChange={onFilterMenuStatusChange}
          open={filterMenuOpen}
          possibleStatuses={possibleStatuses}
        />
        <div className={classes.records}>{numberOfRecords} records</div>
      </div>
    )
  }
}

/**
 * Styles for the `<UsersListToolbar />` component.
 * @param {Theme} theme
 */
const styles = theme => ({
  filters: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  inputAdornment: {
    position: 'start',
  },
  records: {
    paddingTop: 0,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 10,
    },
  },
  root: {
    padding: '0 15px 15px 25px',
    [theme.breakpoints.up('sm')]: {
      padding: '15px 15px 15px 25px',
    },
  },
  searchIcon: {
    color: 'bdbdbd',
  },
  textField: {
    backgroundColor: '#F9F9F9',
    color: 'white',
  },
})

export default withStyles(styles)(UsersListToolbar)
