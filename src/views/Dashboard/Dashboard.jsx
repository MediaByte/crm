import React, { Component } from 'react';
import PropTypes from 'prop-types';
//material ui components
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//project components
import Page from 'views/Page/Page.jsx';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Cards from "components/Cards/Card.jsx";
//gundb
import Gun from 'gun/gun';
const gun = Gun('https://crm-server.herokuapp.com/gun');
const db = gun.get('users')
const styles = theme => ({
	content: {
		[theme.breakpoints.up('md')]: {
			margin: theme.spacing.unit * 16,
			marginTop: theme.spacing.unit * 2,
			height: '100%'
		},
		[theme.breakpoints.down('md')]: {
			margin: theme.spacing.unit * 10,
			marginLeft: theme.spacing.unit * 12,
			marginTop: theme.spacing.unit * 1
		},
		[theme.breakpoints.down('sm')]: {
			margin: theme.spacing.unit * 6,
			marginTop: theme.spacing.unit * 1
		},
		[theme.breakpoints.down('xs')]: {
			margin: theme.spacing.unit * 1,
			marginTop: theme.spacing.unit * 1,
		},
	}
})
class Dashboard extends Component {
	constructor(props) {
		super(props);
			this.state = {
				user: '',
			}
	}
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
				<Page><CssBaseline />
					<div className={classes.content}>
			          <GridContainer align={'center'}>
			            <GridItem  xs={12} sm={12} md={6} lg={6}>
				            <div>
				 				<Cards />
				 			</div>
			            </GridItem>
			            <GridItem xs={12} sm={12} md={6} lg={6}>
				            <div>
				 				<Cards />
				 			</div>
			            </GridItem>
			          </GridContainer>
		          	</div>
				</Page>
			</div>
		)
	}
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Dashboard);