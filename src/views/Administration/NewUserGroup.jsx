import React, { Component } from 'react';
import PropTypes from 'prop-types';
//material ui components
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
})
class NewUserGroup extends Component {
	render() {
		const { classes } = this.props
		return (
			<div>
				new user
			</div>
		)
	}
}
NewUserGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NewUserGroup);	