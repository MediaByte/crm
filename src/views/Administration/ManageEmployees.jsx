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
import Page from 'views/Page/Page.jsx';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import NewProfile from "components/UserProfile/NewProfile.jsx";
import EmployeeCard from 'components/UserProfile/EmployeeCard'
import Card from "components/Card/Card.jsx";
//gundb
import Gun from 'gun/gun';
const gun = Gun('https://crm-server.herokuapp.com/gun');
const db = gun.get('testRost').get('users')
const formatData = data => Object.keys(data).map((user, i) => {
	
	user !== '_' && user !== 'null' && user !== 'undefined'
		? user 
		: null 


}).filter(n=>n)
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
		paddingRight: 20,
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
		// border: '1px solid green',
		padding: 5,
	},
	userProfileGrid: {
		display: 'flex',	
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		flexGrow: 1,
		// border: '1px solid green',
	},
	gridContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	content: {
		display: 'flex',
		flexWrap: 'wrap',
	},
})

class ManageEmployees extends Component {
	constructor(props) {
		super(props);
			this.state = {
				addUser: true, 
				items: []
			}
		this.toggleViews = this.toggleViews.bind(this)
	}
	componentDidMount() {
		let x =[]
    	db.map((data, key) => [...data]);

	}
	toggleViews() {
    	this.setState({ addUser: !this.state.addUser })
  	}
	render() {
		const { classes } = this.props
		const { addUser } = this.state
		return (
			<div>
				<Page component={'administration'} titleText={'Employees'}>
					<GridContainer className={classes.content}>
						<GridItem sm={4} md={3} className={classes.grid}>
							<GridContainer className={classes.gridContainer} direction='column'>
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
{ 
									this.state.items.map((user) => {
										user !== null
											? (
												<GridItem md={12} className={classes.grid}>
													<Card className={classes.item} raised>
														<Typography variant='title'>{user.first + ' ' + user.last}</Typography>
														<div className={classes.itemSubContent}>
															<Typography variant='body2'>{user.groups}</Typography>
															<Typography variant='body1'>{user.home}</Typography>
															<Typography variant='body1'>{user.email}</Typography>
														</div>
													</Card>
												</GridItem>
											  )
											: null
										})

}
								
							</GridContainer>
						</GridItem>
						<GridItem sm={8} md={9} className={classes.userProfileGrid}>
							<GridContainer className={classes.gridMainPanel} direction={'column'}>
								<GridItem>
									<Card raised className={classes.mainPanel}>
										{ addUser 
											? (
												<div>
												    <EmployeeCard toggleViews={this.toggleViews} addUser={addUser}/>
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
						</GridItem>
					</GridContainer>
				</Page>
			</div>

		)
	}
}
ManageEmployees.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ManageEmployees);	