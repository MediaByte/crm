import React, { Component } from 'react';
import PropTypes from 'prop-types';
//material ui components
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
//material-ui icons
import Add from '@material-ui/icons/Add';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';
import FilterList from '@material-ui/icons/FilterList';
//project components
import Page from 'views/Page/Page.jsx';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import NewProfile from "components/UserProfile/NewProfile.jsx";
import EmployeeCard from 'components/UserProfile/EmployeeCard'
import Card from "components/Card/Card.jsx";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//gundb
import Gun from 'gun/gun';

const formatData = data => Object.keys(data)
	.map(key => ({ key, ...data[key]  }))
	.filter(m => m.key !== '_')

const styles = theme => ({
	input: {
		marginBottom: -10,
		width: 215,
	},
	gridMainPanel: {
		flexGrow: 1,
		width: '100%',
	},
	mainPanel: {
		flexGrow: 1,
		paddingTop: 10,
		// paddingRight: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		marginTop: 0,
		marginBottom: 0,
		width: '100%',
		height: '100%'
	},
	item: {
		border: '1px solid black',
		padding: 10,
		marginTop: 0,
	},
	itemSubContent: {
		paddingLeft: '25px'
	},
	grid: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
	},
	userProfileGrid: {
		display: 'flex',	
		justifyContent: 'center',
		alignItems: 'center',
	},
	gridContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	renderUsers: {
    	overflow: 'auto',

    	height: '600px'
	},
	content: {


	},
	demo: {
		backgroundColor: "#fff",
		width: "100%",
		height: "100%",
	},
	demoContent: {
    backgroundColor: "#fff",
    padding: 20,
	},
	list: {
		width: "100%"
  },
  noGroups: {
    textAlign: 'center',
    padding: "40px 0"
  },
  icon: {
    fontSize: "50px",
    display: 'block',
    margin: "0 auto",
    color: "#999"
  },
  toolbar: {
    padding: 15
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  selected: {
    backgroundColor: "#f00"
  },
  title: {
    marginBottom: 10
  }
})
class ManageUserGroups extends Component {
	constructor(props) {
		super(props);
		this.gun = Gun('https://pineconeserver.herokuapp.com/gun');
			this.state = {
				addUser: true, 
				users: [
          { id: 1, name: "Administrator", status: "Active"},
          { id: 2, name: "User", status: "Inactive"}
        ],
        selected: false,
				first: '',
				last: '',
				group: '',
				email: '',
			}
		this.toggleViews = this.toggleViews.bind(this)
		this.showUser = this.showUser.bind(this)
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
		console.log(user)
    }
    
  renderUserGroups() {
		const { classes } = this.props
    if (!this.state.users.length) {
      return (
        <div className={classes.noGroups}>
          <ErrorOutlineOutlined className={classes.icon} />
          No User Groups yet
        </div>
      )
    } else {
      return (
        <div style={{width: "100%"}}>
          <List component="nav" className={classes.list}>
            {this.state.users.map((item, index) => (
              <ListItem selected={this.state.selected === item.id-1} className={classes.list} key={index} onClick={()=> this.selectUser(item.id)}>
                <ListItemText
                  primary={item.name}
                  secondary={item.status}
                />
                <ListItemSecondaryAction>
                  <IconButton>
                    <KeyboardArrowRight />
                  </IconButton>
                </ListItemSecondaryAction>
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

  renderContent() {
		const { classes } = this.props
    const { users, selected } = this.state
    const user = users[selected]
    if (selected !== false) {
      return (
        <div>
          <Typography variant="title" noWrap className={classes.title}>Permissions</Typography>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Administration</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Tasks</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>People</Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Agencies</Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Events</Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Expenses</Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Mass Emails</Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
        </div>
      )
    } else {
      return (
        <div className={classes.demo}>
          <div className={classes.noGroups}>
            <ErrorOutlineOutlined className={classes.icon} />
            No User Group selected
          </div>
        </div>
      )
    }
  }

  selectUser (id) {
    this.setState({selected: id-1})
  }

	render() {
		const { classes } = this.props
		const { addUser, users } = this.state
    let parsedData = formatData(this.state.users)
    
		return (
			<div>
				<Page component={'administration'} titleText={'User Groups'}>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="stretch"
						spacing={24}
					>
						<Grid item xs={12} sm={5} md={3}>
							<div className={classes.demo}>
                <div className={classes.toolbar}>
                  <Grid container>
                    <Grid item xs={9} sm={8} md={9}>
                      <span>{users.length} records</span>
                    </Grid>
                    <Grid item xs={3} sm={4} sm={3}>
                      <Add />
                      <FilterList style={{float: 'right'}} />
                    </Grid>
                  </Grid>
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
						<Grid item xs={12} sm={7} md={9}>
              {this.renderContent()}
						</Grid>
					</Grid>
				</Page>
			</div>

		)
	}
}
ManageUserGroups.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ManageUserGroups);	