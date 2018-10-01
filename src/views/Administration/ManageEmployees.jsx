import React, { Component } from 'react';
import PropTypes from 'prop-types';
//material ui components
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
//material-ui icons
import Search from '@material-ui/icons/Search';
//project components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import NewProfile from "components/UserProfile/NewProfile.jsx";
import EmployeeCard from 'components/UserProfile/EmployeeCard'
import Card from "components/Card/Card.jsx";
//gundb
import Gun from "gun/gun";

const formatData = data => Object.keys(data)
	.map(key => ({ key, ...data[key]  }))
	.filter(m => m.key !== '_')
const styles = theme => ({
	input: {
		marginTop: -30,
		width: 215,
	},
	gridMainPanel: {
		flexGrow: 1,
		width: '100%',
	},
	mainPanel: {
		flexGrow: 1,
		// paddingRight: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		marginTop: 0,
		marginBottom: 0,
		width: '100%',
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
		padding: 5,
	},
	userProfileGrid: {
		display: 'flex',	
		justifyContent: 'center',
	},
	gridContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	renderUsers: {
    	overflow: 'auto',
    	height: '550px',
	},
	content: {


	},
})
class ManageEmployees extends Component {
	constructor(props) {
		super(props);
		this.gun = Gun('https://crm-server.herokuapp.com/gun');
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
		let parsedData = formatData(this.state.users)
		return (
			<div>
				<GridContainer justify={'center'}>
					<GridItem sm={4} md={3} className={classes.grid}>
						<GridContainer className={classes.gridContainer}>
							<GridItem md={12} className={classes.grid}>
								<CustomInput
				                  id="search"
				                  fullwidth={true}
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

							</GridItem>
							<div className={classes.renderUsers}>
	{
								parsedData
								// eslint-disable-next-line
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
									.reverse()

	}
						</div>
						</GridContainer>
					</GridItem>
					<GridItem sm={8} md={9} className={classes.userProfileGrid}>

								<Card raised className={classes.mainPanel}>
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
								</Card>
					</GridItem>
				</GridContainer>
			</div>

		)
	}
}
ManageEmployees.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ManageEmployees);	
