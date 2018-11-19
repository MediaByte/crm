import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import _ from 'lodash';
//material ui components
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
//material-ui icons
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';
import FilterList from '@material-ui/icons/FilterList';
import Search from '@material-ui/icons/Search';
import SwapVert from '@material-ui/icons/SwapVert';
//project components
import styles from "./styles.js";
import UserGroupForm from './UserGroupForm';
import PageColumn from 'views/Page/PageColumn.jsx';

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
  TextField } from '@material-ui/core';

  //gundb
import Gun from 'gun/gun';

//State
import { connect } from 'react-redux';
import { loadUser, saveUser, removeUser, duplicateUser, filter } from '../../state/userGroups/actions'


// const formatData = data => Object.keys(data)
// 	.map(key => ({ key, ...data[key]  }))
// 	.filter(m => m.key !== '_')

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ManageUserGroups extends Component {
	constructor(props) {
    super(props);
    console.log('props', props);
    
		this.gun = Gun('https://pineconeserver.herokuapp.com/gun');
    this.state = {
      addUser: false,
      open: false, 
      // users: props.users.filter(user => user.status === 'Active'),
      usersCopy: props.users,
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
      checkedA: true,
      checkedB: true,
      checkedC: true,
      checkedD: true,
      checkedE: true,
      checkedF: true,
      checkedG: true,
      checkedH: true,
      status: '',
      newUser: {
        name: '',
        age: 22
      }
    }
		this.toggleViews = this.toggleViews.bind(this)
    this.showUser = this.showUser.bind(this)
    this.toggleBlocking = this.toggleBlocking.bind(this);
  }

  toggleBlocking() {
    this.setState({blocking: !this.state.blocking});
  }
  
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  }

	componentDidMount() {
		let users = []
		this.gun.get('testRost').get('users').map().on((user, key) => {
			users[key] = user
			this.setState({ users: Object.assign({}, this.state.users, users) })
		})
	    window.scrollTo(0, 0);
	    document.body.scrollTop = 0;
	}
	componentWillMount() {
		let users = []
		this.gun.get('testRost').get('users').map().on((user, key) => {
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
			group: user.groups
		})
    }
    
  renderUserGroups() {
		const { classes } = this.props
    if (!this.props.users.length) {
      return (
        <div className={classes.noGroups}>
          <ErrorOutlineOutlined className={classes.icon} />
          No User Groups found
        </div>
      )
    } else {
      return (
        <div style={{width: "100%"}}>
            <List component="nav" className={classes.list}>
              {this.props.users.map((item, index) => (
                <ListItem selected={this.state.selected === item.id} className={classes.list} key={index} onClick={()=> this.selectUser(item.id)}>
                  <ListItemText
                    primary={item.name}
                    secondary={item.status}
                  />
                  <Hidden smUp>
                    <ListItemSecondaryAction>
                      <IconButton>
                        <KeyboardArrowRight />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </Hidden>
                </ListItem>
              ))}
            {/* parsedData
              .map((user, i) => {
                if ( user.hasOwnProperty('first')) {
                  return (
                    <div key={i}>
                      <GridItem md={12} className={classes.grid} style={{ cursor: 'pointer' }}>
                        <Card className={classes.item} raised onClick={()=>this.showUser(user)}>
                          <Typography variant='title'>{user.first + ' ' + user.last}</Typography>
                          <div className={classes.itemSubContent}>
                            <Typography variant='body2'>{user.groups}</Typography>
                            <Typography variant='body1'>{user.home}</Typography>
                            <Typography variant='body1'>{user.email}</Typography>
                          </div>
                        </Card>
                      </GridItem>
                    </div>
                  )
                }
                })
              .reverse() */}
          </List>
        </div>
      )
    }
  }

  handleChangeCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  renderContent() {
		const { classes, users } = this.props
    const { selected, anchorEl } = this.state
    const user = _.find(users, {id: selected})
    
    if (selected !== false && _.find(users, { id: selected })) {
      return (
        <div>
          <Paper className={classes.root3} elevation={1}>
            <div className={classes.paddingFull}>
              {selected && (
                <div className={classes.iconsRight}>
                  <IconButton className={classes.icons} style={{transform: 'scale(0.8)'}}><Edit onClick={this.toggleBlocking} /></IconButton>
                  <IconButton className={classes.icons} style={{transform: 'scale(0.8)'}}><MoreHoriz onClick={this.handleClick} /></IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleCloseMenu}
                  >
                    <MenuItem onClick={() => this.props.removeUser(this.state.selected)}>Delete</MenuItem>
                    <MenuItem onClick={() => this.props.duplicateUser(user)}>Duplicate</MenuItem>
                  </Menu>
                </div>
              )}
              <Typography variant="h5" component="h4" className={classes.titleBold}>
                <i className="fas fa-user-plus"></i> {user.name}
              </Typography>
            </div>
            <BlockUi tag="div" blocking={this.state.blocking} message="" loader={<div/>}>
              <div  className={classes.demo}>
                <UserGroupForm user={this.state} handleChangeCheckbox={this.handleChangeCheckbox} />
              </div>
            </BlockUi>
          </Paper>
          <br/>
        </div>
      )
    } else {
      return (
        <div>
          <div className={classes.noGroups}>
            <ErrorOutlineOutlined className={classes.icon} />
            No User Group selected
          </div>
        </div>
      )
    }
  }

  selectUser (id) {
    const openModal = window.innerWidth < 750
    const user = _.find(this.props.users, {id: id})
    this.props.loadUser(id)
    this.setState({selected: user.id, addUser: false, open: openModal, title: user.name})
  }

  addNewGroup () {
    // const openModal = window.innerWidth < 750
    this.setState({ addUser: true, selected: false, open: true, title: 'New User Group' }, function(){
    })
    
  }

  showSearch () {
    this.setState({searchActive: !this.state.searchActive})
  }

  showFilter = event => {
    this.setState({ anchorEl2: event.currentTarget });
  }

  closeFilter = () => {
    this.setState({ anchorEl2: null });
  }

  onChangeFilter (e) {
    const value = e.target.value.toLowerCase()
    let users
    if (value === '') {
      users = this.state.usersCopy
    } else {
      users = this.state.usersCopy.filter((item) => item.name.toLowerCase().includes(value))
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

  resetFilter () {
    // this.setState({ users: this.state.usersCopy, filterStatus: 'all' })
    this.props.filter('all')
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, title: '' });
  };

  renderContentWrapper() {
    // this.openInModal();
    if (this.state.addUser && this.state.open) {
      return <UserGroupForm user={this.state} handleChangeCheckbox={this.handleChangeCheckbox} />
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
					<Grid
						container
            className={classes.gridContainer}
					>
						<Grid item xs={12} sm={5} md={4} lg={3} className={classes.demoLeft}>
							<div>
                <div className={classes.toolbar}>
                  {this.state.searchActive && (
                    <div>
                      <TextField
                        type="search"
                        margin="normal"
                        fullWidth
                        placeholder="Search Groups"
                        onChange={(e)=> this.onChangeFilter(e)}
                      />
                    </div>
                  )}
                  <div className={classes.filters}>
                    <IconButton className={classes.icons}><Add onClick={()=>this.addNewGroup()} /></IconButton>
                    <IconButton className={classes.icons}><SwapVert /></IconButton>
                    <IconButton className={classes.icons}><Search onClick={()=>this.showSearch()} /></IconButton>
                    <IconButton className={classes.icons}>
                      <FilterList onClick={this.showFilter} />
                    </IconButton>
                  </div>
                      <Menu
                        id="simple-menu2"
                        anchorEl={anchorEl2}
                        open={Boolean(anchorEl2)}
                        onClose={this.closeFilter}
                      >
                        <div className={classes.filterBox}>
                          <div style={{float: 'right'}}>
                            <Button component="span" className={classes.resetButton} onClick={() => this.resetFilter()}>RESET</Button>
                          </div>
                          <Typography variant="button" color="inherit" className={classes.filterButton}>FILTERS</Typography>
                          <Grid container spacing={24}>
                            <Grid item xs={9}>
                            <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="age-simple">Status</InputLabel>
                              <Select
                                autoWidth
                                value={this.props.filterText}
                                onChange={this.handleChange}
                                // inputProps={{
                                //   name: 'age',
                                //   id: 'age-simple',
                                // }}
                              >
                                <MenuItem value="all">
                                  <em>All</em>
                                </MenuItem>
                                <MenuItem value='active'>Active</MenuItem>
                                <MenuItem value='inactive'>Inactive</MenuItem>
                              </Select>
                            </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                          </Grid>
                          {/* <MenuItem onClick={this.closeFilter}>Option 1</MenuItem> */}
                        </div>
                      </Menu>
                  <div className={classes.records}>
                    {users.length} records
                  </div>
                </div>
                <Divider />
								{/* <br/>
								<CustomInput
									id="search"
									// fullwidth={true}
									inputProps={{
										className: classes.input,
										type: "text",
										placeholder: 'Search',
										onChange: (e) => console.log(e),
										startAdornment: (
											<InputAdornment position="end">
												<IconButton color="inherit">
													<Search onClick={this.handleInputFocus} style={{fontSize: 25}}/>
												</IconButton>
											</InputAdornment>
										)
									}}
								/> */}
								{this.renderUserGroups()}
							</div>
						</Grid>
						<Grid item xs={12} sm={7} md={8} lg={9} className={classes.demo}>
              <div className={classes.demoContent}>
                <Dialog
                  fullScreen={window.innerWidth < 750}
                  open={this.state.open}
                  onClose={this.handleClose}
                  TransitionComponent={Transition}
                  scroll='body'
                >
                  <div className={classes.appBar}>
                    <AppBar position="static" color="default">
                      <Toolbar className={classes.noShadow}>
                        <IconButton className={classes.menuButton} color="default" onClick={this.handleClose} aria-label="Close">
                          <ArrowBack />
                        </IconButton>
                        <Typography variant="subtitle1" color="inherit" className={classes.newTitle}>
                          {!this.state.selected ? this.state.title : ''}
                        </Typography>
                        <Button color="inherit" style={{position: 'absolute', right: 0}} onClick={()=> this.props.saveUser(this.state.newUser)}>
                          save
                        </Button>
                      </Toolbar>
                    </AppBar>
                  </div>
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

const mapStateToProps = (state) => {
  return {
    users: state.userGroups.users,
    selected: state.userGroups.selected,
    filterText: state.userGroups.filter,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    filter: (status) => dispatch(filter(status)),
    duplicateUser: (user) => dispatch(duplicateUser(user)),
    loadUser: (userId) => dispatch(loadUser(userId)),
    saveUser: (user) => dispatch(saveUser(user)),
    removeUser: (userId) => {
      dispatch(removeUser(userId))
      // this.setState({ anchorEl: null });
    }
  }
};

ManageUserGroups.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ManageUserGroups));	
