import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Brightness1 from '@material-ui/icons/Brightness1';
import Description from '@material-ui/icons/Description';
import {
	Paper,
	Grid,
  MenuItem,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  Button,
  TextField } from '@material-ui/core';
//material ui components
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	wrapper: {
		// padding: 25
	},
	formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
	},
	root: {
    borderRadius: 0,
    boxShadow: 'none',
    borderTop: "1px solid #ddd",	
    borderBottom: "1px solid #ddd",
  },
  root2: {
    color: '#2db8b8',
    '&$checked': {
      color: '#2db8b8',
      backgroundColor: '#fff',
    },
  },
  checked: {},
  inputGrid: {
    flexGrow: 1,
  },
  textField: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '-20px'
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '-40px'
    }
	},
	selected: {
    backgroundColor: "#f00"
  },
  subtitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 10,
    color: "#aaa",
    fontSize: '0.85rem',
    borderBottom: "1px solid #ddd",
    marginLeft: 15,
    [theme.breakpoints.up('lg')]: {
      marginLeft: 30,
    }
	},
	root3: {
    borderRadius: 0,
    boxShadow: 'none',
    borderBottom: "1px solid #ddd",
	},
	paddingFull: {
    padding: 15,
    [theme.breakpoints.up('md')]: {
      padding: '20px 30px',
    }
  },
})
class UserGroupForm extends Component {
	render() {
		const { classes, user, handleChangeCheckbox } = this.props
		
		return (
			<div>
				<Paper className={classes.root3} elevation={1}>
				<div className={classes.paddingFull}>
					{/* <Hidden smDown>
						<Typography variant="title" noWrap className={classes.title}>New User Group</Typography>
					</Hidden> */}
					<Grid container spacing={8} alignItems="flex-end" className={classes.inputGrid}>
						<Grid item xs={2} sm={1}>
							<Description />
						</Grid>
						<Grid item xs={10} sm={11}>
							<TextField
								id="standard-name"
								label="Description"
								fullWidth
								className={classes.textField}
								value="Users will have administrator level permissions"
								// onChange={this.handleChange('name')}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={8} alignItems="flex-end" className={classes.inputGrid}>
						<Grid item xs={2} sm={1}>
							<Brightness1 />
						</Grid>
						<Grid item xs={10} sm={11}>
							<TextField
								id="standard-select-currency"
								select
								label="Status"
								fullWidth
								className={classes.textField}
								value={user.status}
								// onChange={this.handleChange('currency')}
								margin="normal"
							>
								<MenuItem key={0} value={0}>
									Active
								</MenuItem>
							</TextField>
							</Grid>
						</Grid>
					</div>
				</Paper>
				<br />
				<br />
				<Typography variant="title" noWrap className={classes.title}>Permissions</Typography>
				<Paper className={classes.root} elevation={1}>
					<div className={classes.paddingFull}>
						<Typography variant="title" noWrap className={classes.subtitle}>Agency Details</Typography>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedA) || false}
									onChange={handleChangeCheckbox('checkedA')}
									value="checkedA"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="View"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedB) || false}
									onChange={handleChangeCheckbox('checkedB')}
									value="checkedB"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="Create"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedC) || false}
									onChange={handleChangeCheckbox('checkedC')}
									value="checkedC"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="Edit"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedD) || false}
									onChange={handleChangeCheckbox('checkedD')}
									value="checkedD"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="Delete"
						/>
						<br />
						<Divider/>
						<br />
						<Typography variant="title" noWrap className={classes.subtitle}>Employees</Typography>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedE) || false}
									onChange={handleChangeCheckbox('checkedE')}
									value="checkedE"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="View"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedF) || false}
									onChange={handleChangeCheckbox('checkedF')}
									value="checkedF"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="Create"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedG) || false}
									onChange={handleChangeCheckbox('checkedG')}
									value="checkedG"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="Edit"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedH) || false}
									onChange={handleChangeCheckbox('checkedH')}
									value="checkedH"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="Delete"
						/>
						<br />
						<Divider/>
						<br />
						<Typography variant="title" noWrap className={classes.subtitle}>Filters</Typography>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedE) || false}
									onChange={handleChangeCheckbox('checkedE')}
									value="checkedE"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="View"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedF) || false}
									onChange={handleChangeCheckbox('checkedF')}
									value="checkedF"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="Create"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedG) || false}
									onChange={handleChangeCheckbox('checkedG')}
									value="checkedG"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="Edit"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedH) || false}
									onChange={handleChangeCheckbox('checkedH')}
									value="checkedH"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="Delete"
						/>
						<br />
						<Divider/>
						<br />
						<Typography variant="title" noWrap className={classes.subtitle}>User Groups</Typography>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedE) || false}
									onChange={handleChangeCheckbox('checkedE')}
									value="checkedE"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="View"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedF) || false}
									onChange={handleChangeCheckbox('checkedF')}
									value="checkedF"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="Create"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedG) || false}
									onChange={handleChangeCheckbox('checkedG')}
									value="checkedG"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="Edit"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={(user && user.checkedH) || false}
									onChange={handleChangeCheckbox('checkedH')}
									value="checkedH"
									classes={{
										root: classes.root2,
										checked: classes.checked,
									}}
								/>
							}
							label="Delete"
						/>
						<br />
						{this.props.user && this.props.user.addUser && (
						<div>
							<br />
							<br />
							<Button variant="contained" color="primary">
								Save
							</Button>
						</div>
					)}
					</div>
				</Paper>
			</div>
		)
	}
}
UserGroupForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UserGroupForm);	
