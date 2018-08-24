import React, { Component } from 'react';
import PropTypes from 'prop-types';
//material ui components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
//material-ui icons
import Search from '@material-ui/icons/Search';
//project components
import Page from 'views/Page/Page.jsx';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Cards from "components/Cards/Card.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
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
		padding: 20,
	},
	item: {
		// border: '1px solid black',
		padding: 10,
		width: 240
	},
	itemSubContent: {
		paddingLeft: '25px'
	},
	grid: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-start',
		// border: '1px solid green',
		padding: 5,
	},
	gridContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	content: {
		[theme.breakpoints.up('lg')]: {
			marginTop: theme.spacing.unit * 8,
		},
		[theme.breakpoints.down('md')]: {
			marginTop: theme.spacing.unit * 8
		},
	},
})
class AddUser extends Component {
	// constructor(props) {
	// 	super(props);
	// 		this.state = {

	// 		}
	// }
	componentDidMount() {
		const { match } = this.props;
		const profile = match.params.id
			db.get(profile).once((user) => {
				this.setState({ user: user })
			});
	}
	render() {
		const { classes } = this.props
		return (
			<div>
				<Page component={'administration'}>
					<GridContainer classNames={classes.content}>
						<GridItem md={12}className={classes.grid}>
							<GridContainer className={classes.gridContainer} direction='column'>
								<GridItem md={3} className={classes.grid} direction='column'>
									<CustomInput
					                  id="search"
					                  inputProps={{
					                    className: classes.input,
					                    type: "text",
					                    placeholder: 'Search',
					                    fullwidth: true,
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
								<GridItem md={3} className={classes.grid} direction='column'>
									<Paper className={classes.item} elevation={8}>
										<Typography variant='title'>Employee Name</Typography>
										<div className={classes.itemSubContent}>
											<Typography variant='body2'>Group</Typography>
											<Typography variant='body1'>Phone</Typography>
											<Typography variant='body1'>Email</Typography>
										</div>
									</Paper>
								</GridItem>
								<GridItem md={3} className={classes.grid} direction='column'>
									<Paper className={classes.item} elevation={8}>
										<Typography variant='title'>Employee Name</Typography>
										<div className={classes.itemSubContent}>
											<Typography variant='body2'>Group</Typography>
											<Typography variant='body1'>Phone</Typography>
											<Typography variant='body1'>Email</Typography>
										</div>
									</Paper>
								</GridItem>
								<GridItem md={3} className={classes.grid} direction='column'>
									<Paper className={classes.item} elevation={8}>
										<Typography variant='title'>Employee Name</Typography>
										<div className={classes.itemSubContent}>
											<Typography variant='body2'>Group</Typography>
											<Typography variant='body1'>Phone</Typography>
											<Typography variant='body1'>Email</Typography>
										</div>
									</Paper>
								</GridItem>
								<GridItem md={3} className={classes.grid} direction='column'>
									<Paper className={classes.item} elevation={8}>
										<Typography variant='title'>Employee Name</Typography>
										<div className={classes.itemSubContent}>
											<Typography variant='body2'>Group</Typography>
											<Typography variant='body1'>Phone</Typography>
											<Typography variant='body1'>Email</Typography>
										</div>
									</Paper>
								</GridItem>
							</GridContainer>
							<GridItem md={9} className={classes.grid}>
								<GridContainer>
									<GridItem md={9} className={classes.grid} direction='column'>
										<Paper className={classes.mainPanel}>
											<div>
												
											</div>
										</Paper>
									</GridItem>
								</GridContainer>
							</GridItem>
						</GridItem>
					</GridContainer>
				</Page>
			</div>
		)
	}
}
AddUser.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddUser);