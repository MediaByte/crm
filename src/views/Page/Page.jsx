import React from 'react';
import PropTypes from 'prop-types';
//material ui components
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//project components
import Navigation from 'components/Navigation/Navigation.jsx';
//styles
import navStyles from 'assets/jss/material-kit-pro-react/components/navStyle.js';
class Page extends React.Component {
	render() {
		const { children, classes, ...navProps } = this.props
			return (
				<Navigation title={this.props.titleText} classes{...navProps}>
					<Typography variant="title" noWrap className={classes.titleContent}>{this.props.titleText}</Typography>
						<div className={classes.titleStyle}>
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