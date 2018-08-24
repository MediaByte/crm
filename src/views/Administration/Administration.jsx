import React from 'react';
//react router
import { NavLink } from 'react-router-dom'
//material-ui components
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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
		[theme.breakpoints.up('md')]: {
			marginLeft: theme.spacing.unit * 11,
			marginRight: theme.spacing.unit * 10,
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: theme.spacing.unit * 5,
			marginRight: theme.spacing.unit * 3,
		},
		[theme.breakpoints.down('xs')]: {
			marginLeft: theme.spacing.unit * 3,
		},
		marginBottom: 20,
	},
	button: {
		height: '100%',
		width: '100%',
		paddingTop: theme.spacing.unit / 50,
		paddingBottom: theme.spacing.unit / 50
	},
	panelTitle: {
		[theme.breakpoints.up('md')]: {
			marginLeft: theme.spacing.unit * 11,
			marginRight: theme.spacing.unit * 10,
			marginTop: theme.spacing.unit * 5
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: theme.spacing.unit * 5,
			marginRight: theme.spacing.unit * 3,
			marginTop: theme.spacing.unit * 5
		},
		[theme.breakpoints.down('xs')]: {
			marginLeft: theme.spacing.unit * 3,
		},

	}
})

class AdminPanel extends React.Component {
	render() {
		const { classes } = this.props
		return (
			<Page component={'administration'}><CssBaseline />
				<Typography className={classes.panelTitle}  gutterBottom noWrap align="left">Users and Control</Typography>
				<Paper className={classes.content} elevation={10}>
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
				<Typography className={classes.panelTitle}  gutterBottom noWrap align="left">General</Typography>
				<Paper className={classes.content} elevation={10}>
					<List className={classes.button}>
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