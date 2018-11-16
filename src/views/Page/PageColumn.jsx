import React from 'react';
import PropTypes from 'prop-types';
//material ui components
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//project components
import NavigationColumn from 'components/Navigation/NavigationColumn.jsx';
//styles
import navStyles from 'assets/jss/material-kit-pro-react/components/navStyleColumn.js';
class PageColumn extends React.Component {
	render() {
		const { children, classes } = this.props
			return (
				<NavigationColumn title={this.props.titleText}>
					<Typography variant="title" noWrap className={classes.title}>{this.props.titleText}</Typography>
						<div className={classes.titleStyle}>
								{children}					
						</div>
				</NavigationColumn>
			)
	}
}
PageColumn.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(navStyles)(PageColumn);