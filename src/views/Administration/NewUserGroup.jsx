import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//material ui components
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
})
class NewUserGroup extends Component {
	render() {
		const { classes } = this.props
		return (
			<div>
				<Typography variant="title" noWrap className={classes.title}>New User Group</Typography>
				<TextField
          id="standard-name"
					label="Name"
					fullWidth
          // className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
        />
				<br />
				<br />
				<TextField
          id="standard-name"
					label="Description"
					fullWidth
          // className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
        />
				<br />
				<br />
				<TextField
          id="standard-select-currency"
          select
					label="Status"
					fullWidth
          // className={classes.textField}
          // value={this.state.currency}
          // onChange={this.handleChange('currency')}
          margin="normal"
        >
					<MenuItem key={0} value={0}>
						Active
					</MenuItem>
        </TextField>
				<br />
				<br />
				<Button variant="contained"  color="primary">
					Save
				</Button>
			</div>
		)
	}
}
NewUserGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NewUserGroup);	