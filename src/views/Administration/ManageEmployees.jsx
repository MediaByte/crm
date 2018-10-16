import React, { Component } from 'react';
import PropTypes from 'prop-types';
//material ui components
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from '@material-ui/core/Grid';
//material-ui icons
import Search from '@material-ui/icons/Search';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
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
		width: "100%"
	},
	list: {
		width: "100%"
	}

})
class ManageEmployees extends Component {
	constructor(props) {
		super(props);
		this.gun = Gun('https://pineconeserver.herokuapp.com/gun');
			this.state = {
				addUser: true, 
				users: [],
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
	render() {
		const { classes } = this.props
		const { addUser } = this.state
		const data = [
			{ name: "Josh Carey", role: "Administrator"},
			{ name: "Osny Neto", role: "Administrator"},
			{ name: "Abdul Aziz", role: "Administrator"},
			{ name: "Josh Carey", role: "Administrator"},
			{ name: "Osny Neto", role: "Administrator"},
			{ name: "Abdul Aziz", role: "Administrator"},
		]
		let parsedData = formatData(this.state.users)

		const leftMenu = (
			<div style={{width: "100%"}}>
				<List component="nav" className={classes.list}>
					{data.map((item, index) => (
						<ListItem className={classes.list} key={index} component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemAvatar>
								<Avatar>
									aa
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={item.name}
								secondary={item.role}
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
		return (
			<div>
				<Page component={'administration'} titleText={'Employees'}>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="stretch"
						spacing={24}
					>
						<Grid item xs={12} md={3}>
							<div className={classes.demo}>
								<br/>
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
								/>
								<br/>
								<br/>
								{leftMenu}
							</div>
						</Grid>
						<Grid item xs={12} md={9}>
							<div className={classes.demo}>
								
								<GridContainer className={classes.gridMainPanel}>
									<GridItem>
										{ addUser 
											? (
												<div>
														<EmployeeCard 
															toggleViews={this.toggleViews} 
															addUser={addUser}
														first={this.state.first}
														last={this.state.last}
														group={this.state.group}
														email={this.state.email}
														phone={this.state.phone}
														/>
												</div>
												)
											: (
												<div>
													<NewProfile toggleViews={this.toggleViews} addUser={addUser} />
												</div>
												) 
										}
									</GridItem>
								</GridContainer>

							</div>
						</Grid>
					</Grid>
				</Page>
			</div>

		)
	}
}
ManageEmployees.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ManageEmployees);	