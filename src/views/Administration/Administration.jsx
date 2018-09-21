import React from 'react';
//react router
import { NavLink } from 'react-router-dom'
//material-ui components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
//Material-ui icons
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
//project files
import Page from 'views/Page/Page';
const styles = theme => ({
	content: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center'
	},
	button: {
		height: '100%',
		width: '100%',
		minWidth: 'auto',
		maxWidth: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	panelTitle: {
		[theme.breakpoints.up('md')]: {
			marginTop: theme.spacing.unit * 5
		},
		[theme.breakpoints.down('sm')]: {
			marginRight: theme.spacing.unit * 3,
			marginTop: theme.spacing.unit * 5
		},

	}
})
class AdminPanel extends React.Component {
	componentDidMount() {
	    window.scrollTo(0, 0);
	    document.body.scrollTop = 0;
	}
	render() {
		const { classes } = this.props
		return (
			<Page component={'administration'} titleText={'Administration'}>
				<Typography className={classes.panelTitle}  gutterBottom noWrap align="left">Users and Control</Typography>
				<Paper className={classes.content}elevation={10}>
					<List className={classes.button}>
						<ListItem button>
							<Typography variant="body2" gutterBottom noWrap align="left">Manage User Groups</Typography>
								<ListItemSecondaryAction style={{marginTop: 6}}>
									<ListItemIcon>
										<KeyboardArrowRight/>
									</ListItemIcon>
								</ListItemSecondaryAction>
						</ListItem>
					<Divider />
						<ListItem 
							button
							component={(props) => <NavLink to={'/management/employees'} {...props}/>}
						>
							<Typography variant="body2" gutterBottom noWrap align="left">Manage Employees</Typography>
								<ListItemSecondaryAction style={{marginTop: 6}}>
									<ListItemIcon>
										<KeyboardArrowRight/>
									</ListItemIcon>
								</ListItemSecondaryAction>
						</ListItem>
					<Divider />
						<ListItem 
							button
							component={(props) => <NavLink to={'/passwordrules'} {...props}/>}
						>
							<Typography variant="body2" gutterBottom noWrap align="left">Password Rules</Typography>
								<ListItemSecondaryAction style={{marginTop: 6}}>
									<ListItemIcon>
										<KeyboardArrowRight/>
									</ListItemIcon>
								</ListItemSecondaryAction>
						</ListItem>
					</List>
		        </Paper>
		        <br/>
				<Typography className={classes.panelTitle} gutterBottom noWrap align="left">General</Typography>
				<Paper elevation={10}>
					<List >
						<ListItem button>
							<Typography variant="body2" gutterBottom noWrap align="left">Agency Details</Typography>
								<ListItemSecondaryAction style={{marginTop: 6}}>
									<ListItemIcon>
										<KeyboardArrowRight/>
									</ListItemIcon>
								</ListItemSecondaryAction>
						</ListItem>
					<Divider />
						<ListItem  button>
							<Typography variant="body2" gutterBottom noWrap align="left">Appearance</Typography>
								<ListItemSecondaryAction style={{marginTop: 6}}>
									<ListItemIcon>
										<KeyboardArrowRight/>
									</ListItemIcon>
								</ListItemSecondaryAction>
						</ListItem>
					</List>
		        </Paper>
			</Page>
		);
	}
}
export default withStyles(styles)(AdminPanel);