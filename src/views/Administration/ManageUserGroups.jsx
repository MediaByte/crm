import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
// import _ from 'lodash';
//material ui components
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Menu from '@material-ui/core/Menu'
//material-ui icons
import Edit from '@material-ui/icons/Edit'
import MoreHoriz from '@material-ui/icons/MoreHoriz'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined'

import BackArrow from '@material-ui/icons/ArrowBackIosOutlined'
//project components
import styles from './styles.js'
import UserGroupForm from './UserGroupForm'
import PageColumn from 'views/Page/PageColumn.jsx'

import {
  AppBar,
  Dialog,
  Toolbar,
  Slide,
  Hidden,
  Paper,
  MenuItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItem,
  List,
} from '@material-ui/core'

import ListToolbar from '../../components/ListToolbar'

//gundb
import Gun from 'gun/gun'

//State
import { connect } from 'react-redux'
import {
  loadUser,
  saveUser,
  removeUser,
  duplicateUser,
  filter,
} from '../../state/userGroups/actions'
import { user } from '../../state/userGroups/user_data.js'

// const formatData = data => Object.keys(data)
// 	.map(key => ({ key, ...data[key]  }))
// 	.filter(m => m.key !== '_')

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class ManageUserGroups extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)

    this.gun = Gun('https://pineconeserver.herokuapp.com/gun')
    this.state = {
      addUser: false,
      open: false,
      // users: props.users.filter(user => user.status === 'Active'),
      selected: false,
      searchActive: false,
      anchorEl2: null,
      title: '',
      first: '',
      last: '',
      group: '',
      email: '',
      anchorEl: null,
      blocking: true,
      filterStatus: 'active',
      status: '',
      newUser: user,
    }
    this.toggleViews = this.toggleViews.bind(this)
    this.showUser = this.showUser.bind(this)
    this.toggleBlocking = this.toggleBlocking.bind(this)
  }

  toggleBlocking() {
    this.setState({ blocking: !this.state.blocking })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleCloseMenu = () => {
    this.setState({ anchorEl: null })
  }

  componentDidMount() {
    let users = []
    this.gun
      .get('testRost')
      .get('users')
      .map()
      .on((user, key) => {
        users[key] = user
        this.setState({ users: Object.assign({}, this.state.users, users) })
      })
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
  }

  componentWillMount() {
    let users = []
    this.gun
      .get('testRost')
      .get('users')
      .map()
      .on((user, key) => {
        users[key] = user
        this.setState({ users: Object.assign({}, this.state.users, users) })
      })
  }

  toggleViews() {
    this.setState({ addUser: !this.state.addUser })
  }

  showUser(user) {
    this.setState({
      first: user.first,
      last: user.last,
      email: user.email,
      group: user.groups,
    })
  }

  renderUserGroups() {
    const { classes, selected, users } = this.props

    const noUsers = users.length === 0

    if (noUsers) {
      return (
        <Hidden only={['xs']}>
          <div className={classes.noGroups}>
            <ErrorOutlineOutlined className={classes.icon} />
            No User Group Selected
          </div>
        </Hidden>
      )
    }

    return (
      <div style={{ width: '100%' }}>
        <List component="nav" className={classes.list}>
          {users.map((item, index) => (
            <ListItem
              selected={selected && selected.id === item.id}
              className={classes.list}
              key={index}
              onClick={() => this.selectUser(item)}
            >
              <ListItemText primary={item.name} secondary={item.status} />
              <Hidden smUp>
                <ListItemSecondaryAction>
                  <IconButton>
                    <KeyboardArrowRight />
                  </IconButton>
                </ListItemSecondaryAction>
              </Hidden>
            </ListItem>
          ))}
        </List>
      </div>
    )
  }

  handleChangeCheckbox = name => event => {
    this.setState({ [name]: event.target.checked })
  }

  renderContent() {
    const { classes, selected } = this.props
    const { anchorEl } = this.state
    const user = selected

    if (selected !== false && selected.id) {
      return (
        <div>
          <Hidden only={['xs']}>
            <Paper className={classes.root3} elevation={1}>
              <div className={classes.paddingFull}>
                {selected && (
                  <div className={classes.iconsRight}>
                    <IconButton
                      className={classes.icons}
                      style={{ transform: 'scale(0.8)' }}
                    >
                      <Edit onClick={this.toggleBlocking} />
                    </IconButton>
                    <IconButton
                      className={classes.icons}
                      style={{ transform: 'scale(0.8)' }}
                    >
                      <MoreHoriz onClick={this.handleClick} />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={this.handleCloseMenu}
                    >
                      <MenuItem
                        onClick={() => this.props.removeUser(selected.id)}
                      >
                        Delete
                      </MenuItem>
                      <MenuItem onClick={() => this.props.duplicateUser(user)}>
                        Duplicate
                      </MenuItem>
                    </Menu>
                  </div>
                )}
                <Typography
                  variant="h5"
                  component="h4"
                  className={classes.titleBold}
                >
                  <i className="fas fa-user-plus" /> {user.name}
                </Typography>
              </div>
              <BlockUi
                tag="div"
                blocking={this.state.blocking}
                message=""
                loader={<div />}
              >
                <div className={classes.demo}>
                  <UserGroupForm
                    user={this.props.selected}
                    handleClose={this.handleClose}
                  />
                </div>
              </BlockUi>
            </Paper>
          </Hidden>
        </div>
      )
    } else {
      return (
        <Hidden only={['xs']}>
          <div>
            <div className={classes.noGroups}>
              <ErrorOutlineOutlined className={classes.icon} />
              No User Groups Selected
            </div>
          </div>
        </Hidden>
      )
    }
  }

  selectUser(user) {
    const openModal = window.innerWidth < 750
    // const user = _.find(this.props.users, {id: id})
    this.props.loadUser(user)
    // this.setState({selected: user.id, addUser: false, open: openModal, title: user.name})
    this.setState({ addUser: false, open: openModal, title: user.name })
  }

  addNewGroup = () => {
    this.props.loadUser(false)
    // const openModal = window.innerWidth < 750
    this.setState(
      {
        addUser: true,
        selected: false,
        open: true,
        dropShadow: false,
        title: 'New User Group',
      },
      function() {},
    )
  }

  toggleSearch = () => {
    this.setState(({ searchActive }) => ({
      searchActive: !searchActive,
    }))
  }

  showFilter = event => {
    this.setState({ anchorEl2: event.currentTarget })
  }

  closeFilter = () => {
    this.setState({ anchorEl2: null })
  }

  onChangeFilter = e => {
    const value = e.target.value.toLowerCase()
    let users
    if (value === '') {
      users = this.props.users
    } else {
      users = this.props.users.filter(item =>
        item.name.toLowerCase().includes(value),
      )
    }
    this.setState({ users })
  }

  handleChange = event => {
    const value = event.target.value.toLowerCase()
    // let users
    // if (value === '' || value === 'all') {
    //   users = this.state.usersCopy
    // } else {
    //   users = this.state.usersCopy.filter((item) => item.status.toLowerCase() === value)
    // }
    // this.setState({ users, filterStatus: value })
    this.props.filter(value)
  }

  resetFilter() {
    // this.setState({ users: this.state.usersCopy, filterStatus: 'all' })
    this.props.filter('all')
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false, title: '' })
  }

  renderContentWrapper() {
    // this.openInModal();
    if (this.state.addUser && this.state.open) {
      return (
        <UserGroupForm
          user={user}
          handleClose={this.handleClose}
          title={this.state.title}
        />
      )
    } else {
      return this.renderContent()
    }
  }

  render() {
    const { classes, users } = this.props
    const { anchorEl2 } = this.state
    // let parsedData = formatData(this.state.users)

    return (
      <div>
        <PageColumn component={'administration'} titleText={'User Groups'}>
          <Grid container className={classes.gridContainer}>
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              lg={3}
              className={classes.demoLeft}
            >
              <div>
                <ListToolbar
                  filterMenuAnchorEl={anchorEl2}
                  filterMenuCurrentStatusValue={this.props.filterText}
                  onCloseFilterMenu={this.closeFilter}
                  onFilterMenuStatusChange={status => this.props.filter(status)}
                  filterMenuOpen={!!anchorEl2}
                  possibleStatuses={[
                    {
                      displayValue: 'Active',
                      value: 'active',
                    },
                    {
                      displayValue: 'Inactive',
                      value: 'inactive',
                    },
                  ]}
                  numberOfRecords={users.length}
                  onChangeSearchValue={this.onChangeFilter}
                  onClickAddNewGroup={this.addNewGroup}
                  onClickFilterButton={this.showFilter}
                  onClickSearch={this.toggleSearch}
                  showSearch={this.state.searchActive}
                />
                <Divider />
                {this.renderUserGroups()}
              </div>
            </Grid>
            <Grid item xs={12} sm={7} md={8} lg={9} className={classes.demo}>
              <div className={classes.demoContent}>
                <Dialog
                  fullScreen={window.innerWidth < 750}
                  fullWidth
                  open={this.state.open}
                  onClose={this.handleClose}
                  TransitionComponent={Transition}
                  scroll="paper"
                >
                  <Hidden smUp>
                    {this.props.selected && (
                      <div className={classes.appBar}>
                        <AppBar
                          position="fixed"
                          dropShadow="none"
                          color="default"
                        >
                          <Toolbar className={classes.noShadow}>
                            <IconButton
                              className={classes.menuButton}
                              color="default"
                              onClick={this.handleClose}
                              aria-label="Close"
                            >
                              <BackArrow />
                            </IconButton>
                            <Typography
                              variant="subtitle1"
                              textAlign="center"
                              color="inherit"
                              className={classes.newTitle}
                            >
                              {!this.state.selected ? this.state.title : ''}
                            </Typography>
                          </Toolbar>
                        </AppBar>
                      </div>
                    )}
                  </Hidden>
                  <div className={classes.demoContent}>
                    {this.renderContentWrapper()}
                  </div>
                </Dialog>
                {this.renderContentWrapper()}
              </div>
            </Grid>
          </Grid>
        </PageColumn>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.userGroups.users,
    selected: state.userGroups.selected,
    filterText: state.userGroups.filter,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filter: status => dispatch(filter(status)),
    duplicateUser: user => dispatch(duplicateUser(user)),
    loadUser: userId => dispatch(loadUser(userId)),
    saveUser: user => dispatch(saveUser(user)),
    removeUser: userId => {
      dispatch(removeUser(userId))
      // this.setState({ anchorEl: null });
    },
  }
}

ManageUserGroups.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ManageUserGroups),
)
