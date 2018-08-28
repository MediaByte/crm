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
const db = gun.get('users')
const styles = theme => ({
	input: {
		marginBottom: -10,
		width: 215,
	},
	mainPanel: {
		paddingTop: 40,
		paddingRight: 40,
		paddingBottom: 40,
		paddingLeft: 40,
		marginTop: 0,
		marginBottom: 0,
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
		[theme.breakpoints.up('md')]: {
			justifyContent: 'flex-end',
		},
	},
	userProfileGrid: {
		display: 'flex',	
		justifyContent: 'center',
		alignItems: 'center',
		// border: '1px solid green',
	},
	gridContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	content: {
		display: 'flex',
		justifyContent: 'center',

		[theme.breakpoints.up('md')]: {
			paddingTop: theme.spacing.unit * 2,
		},
		[theme.breakpoints.down('xs')]: {
			paddingTop: theme.spacing.unit * 5,
			flexDirection: 'column-reverse',
		},
	},
})
class ManageEmployees extends Component {
	constructor(props) {
		super(props);
			this.state = {
				addUser: true,
			}
		this.toggleViews = this.toggleViews.bind(this)
	}
	componentDidMount() {
		const { match } = this.props;
		const profile = match.params.id
			db.get(profile).once((user) => {
				this.setState({ user: user })
			});
			db.map().once((props)=>console.log(props))
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
								<GridItem md={12} className={classes.grid}>
									<Card className={classes.item} raised>
										<Typography variant='title'>Employee Name</Typography>
										<div className={classes.itemSubContent}>
											<Typography variant='body2'>Group</Typography>
											<Typography variant='body1'>Phone</Typography>
											<Typography variant='body1'>Email</Typography>
										</div>
									</Card>
								</GridItem>
								<GridItem md={12} className={classes.grid}>
									<Card className={classes.item} raised>
										<Typography variant='title'>Employee Name</Typography>
										<div className={classes.itemSubContent}>
											<Typography variant='body2'>Group</Typography>
											<Typography variant='body1'>Phone</Typography>
											<Typography variant='body1'>Email</Typography>
										</div>
									</Card>
								</GridItem>
								<GridItem md={12} className={classes.grid}>
									<Card className={classes.item} raised>
										<Typography variant='title'>Employee Name</Typography>
										<div className={classes.itemSubContent}>
											<Typography variant='body2'>Group</Typography>
											<Typography variant='body1'>Phone</Typography>
											<Typography variant='body1'>Email</Typography>
										</div>
									</Card>
								</GridItem>
								<GridItem md={12} className={classes.grid}>
									<Card className={classes.item} raised>
										<Typography variant='title'>Employee Name</Typography>
										<div className={classes.itemSubContent}>
											<Typography variant='body2'>Group</Typography>
											<Typography variant='body1'>Phone</Typography>
											<Typography variant='body1'>Email</Typography>
										</div>
									</Card>
								</GridItem>
							</GridContainer>
						</GridItem>
						<GridItem sm={8} md={9} className={classes.userProfileGrid}>
							<GridContainer direction={'column'}>
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