import React from 'react';
//react router
import { NavLink } from 'react-router-dom'
//material-ui components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
//Material-ui icons
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
//project files
import Page from 'views/Page/Page';
const styles = theme => ({
	demo: {
		backgroundColor: theme.palette.background.paper,
	},
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
		fontWeight: 'bold',
		fontSize: '16px',
		marginBottom: '15px',
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
				<div className={classes.demo}>
					<List>
						<ListItem component={(props) => <NavLink to={'/passwordrules'} {...props}/>}>
							<ListItemText primary="Manage User Groups" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
					<List>
						<ListItem component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemText primary="Manage Employees" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
					<List>
						<ListItem component={(props) => <NavLink to={'/passwordrules'} {...props}/>}>
							<ListItemText primary="Password Rules" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
				</div>
				
				<Typography className={classes.panelTitle}  gutterBottom noWrap align="left">General</Typography>
				<div className={classes.demo}>
					<List>
						<ListItem component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemText primary="Agency Details" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
					<List>
						<ListItem component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemText primary="Uploads" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
				</div>
				
				<Typography className={classes.panelTitle}  gutterBottom noWrap align="left">General</Typography>
				<div className={classes.demo}>
					<List>
						<ListItem component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemText primary="Notes and Properties" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
					<List>
						<ListItem component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemText primary="Email Templates" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
					<List>
						<ListItem component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemText primary="Letter Templates" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
				</div>
				
				<Typography className={classes.panelTitle}  gutterBottom noWrap align="left">Financial</Typography>
				<div className={classes.demo}>
					<List>
						<ListItem component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemText primary="Expense Settings" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
					<List>
						<ListItem component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemText primary="Invoice Settings" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
					<List>
						<ListItem component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemText primary="Fees" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
					<List>
						<ListItem component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemText primary="License Settings" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
				</div>
				
				<Typography className={classes.panelTitle}  gutterBottom noWrap align="left">Automation</Typography>
				<div className={classes.demo}>
					<List>
						<ListItem component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemText primary="Action Builder" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
					<List>
						<ListItem component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemText primary="Webhooks" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
					<List>
						<ListItem component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemText primary="Mass Data Change" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
					<List>
						<ListItem component={(props) => <NavLink to={'/management/employees'} {...props}/>}>
							<ListItemText primary="Portal" />
							<ListItemSecondaryAction>
								<IconButton>
									<KeyboardArrowRight/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
				</div>

			</Page>
		);
	}
}
export default withStyles(styles)(AdminPanel);