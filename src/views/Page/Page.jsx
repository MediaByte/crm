import React from 'react'
import PropTypes from 'prop-types'
//material ui components
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
//project components
import Navigation from 'components/Navigation/Navigation'
//styles
import navStyles from 'components/Navigation/navStyle'

class Page extends React.Component {
  render() {
    const { children, classes, ...navProps } = this.props
    return (
      <Navigation
        title={this.props.titleText}
        style={{ backgroundColor: 'red' }}
        {...navProps}
      >
        <Typography variant="title" noWrap className={classes.title}>
          {this.props.titleText}
        </Typography>
        <div className={classes.titleStyle}>{children}</div>
      </Navigation>
    )
  }
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(navStyles)(Page)
