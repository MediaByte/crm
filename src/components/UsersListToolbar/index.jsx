import React from 'react'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Search from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import FilterList from '@material-ui/icons/FilterList'
import Cloud from '@material-ui/icons/CloudDownloadOutlined'
import { withStyles } from '@material-ui/core'
/**
 * @typedef {import('@material-ui/core').Theme} Theme
 * @typedef {import('@material-ui/core/TextField').BaseTextFieldProps} BaseTextFieldProps
 */
/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRules<K>} StyleRules
 */

/**
 * @typedef {object} UsersListToolbarProps
 * @prop {StyleRules<keyof ReturnType<typeof styles>>} classes
 * @prop {number} numberOfRecords
 * @prop {BaseTextFieldProps['onChange']} onChangeSearchValue
 * @prop {Function} onClickAddNewGroup
 * @prop {Function} onClickFilter
 * @prop {Function} onClickSearch
 * @prop {boolean|null|undefined} showSearch
 */

/**
 * @augments React.PureComponent<UsersListToolbarProps>
 */
class UsersListToolbar extends React.PureComponent {
  filterIconref = React.createRef()

  render() {
    const {
      classes,
      numberOfRecords,
      onChangeSearchValue,
      onClickAddNewGroup,
      onClickFilter,
      onClickSearch,
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
            <FilterList onClick={onClickFilter} />
          </IconButton>
        </div>
        {/** UsersFilter here */}
        <div className={classes.records}>{numberOfRecords} records</div>
      </div>
    )
  }
}

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
