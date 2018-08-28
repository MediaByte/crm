import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class PhoneType extends React.Component {
  state = {
    type: '',
  };

  render() {
    const { classes, onChangeValues } = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="phoneType">Type</InputLabel>
            <Select
              native
              value={this.state.type}
              onChange={(e) => this.onChangeValues(e, null)}
              inputProps={{
                name: 'phoneType',
                id: 'phoneType',
              }}
            >
              <option value="" />
              <option value={'home'}>Home</option>
              <option value={'mobile'}>Mobile</option>
              <option value={'work'}>Work</option>
            </Select>
        </FormControl>
      </div>
    );
  }
}

PhoneType.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhoneType);
