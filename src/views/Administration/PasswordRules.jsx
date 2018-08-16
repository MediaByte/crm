import React, { Component } from 'react';
//material-ui components
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
//project files & components
import Page from 'views/Page/Page';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

const styles = theme => ({
	content: {
		[theme.breakpoints.up('lg')]: {
			display: 'block',
			margin: 'auto',
			marginLeft: theme.spacing.unit * 18,
			marginRight: theme.spacing.unit * 18,
			marginTop: theme.spacing.unit * 2,
			height: '100%'
		},
		[theme.breakpoints.down('md')]: {
			display: 'block',
			margin: 'auto',
			marginLeft: theme.spacing.unit * 15,
			marginRight: theme.spacing.unit * 13,
			marginTop: theme.spacing.unit * 1
		},
		[theme.breakpoints.down('sm')]: {
			display: 'block',
			margin: 'auto',
			marginLeft: theme.spacing.unit * 7,
			marginRight: theme.spacing.unit * 7,
			marginTop: theme.spacing.unit * 1
		},
		[theme.breakpoints.down('xs')]: {
			display: 'block',
			margin: 'auto',
			marginTop: theme.spacing.unit * 1,
		},
	},
	grid: {
		width: "100%",
		height: "60vh"
	}
})

class PasswordRules extends Component {

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Page><CssBaseline />
					<GridContainer className={classes.content}>
						<Paper>
							<GridContainer>
								<GridItem xs={12}>
									<GridContainer className={classes.grid}>
									<GridItem md={1}/>
										<GridItem xs={8} md={5}>
											<Typography variant={'body2'} gutterBottom> Password Expiration Period (Days)</Typography>
										</GridItem>
										<GridItem xs={3}/>
										<GridItem xs={2} sm={2}>
											<CustomInput
												inputProps={{
													placeholder: "45"
												}}
											/>
										</GridItem>
									</GridContainer>
								</GridItem>
							</GridContainer>
						</Paper>
					</GridContainer>
				</Page>
			</div>
		)
	}
}

export default withStyles(styles)(PasswordRules);