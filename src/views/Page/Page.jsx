import React from 'react';
import PropTypes from 'prop-types';
//material ui components
import { withStyles } from '@material-ui/core/styles';
//project components
import Navigation from 'components/Navigation/Navigation.jsx';
//styles
import navStyles from 'assets/jss/material-kit-pro-react/components/navStyle.js';
class Page extends React.Component {
	render() {
		const { children, ...classes } = this.props
			return (
				<Navigation classes{...classes}>
					<div>
						{children}
					</div>
				</Navigation>
			)
	}
}
Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(navStyles)(Page);