/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

class PhoneInput extends React.Component {

  render() {
    const { classes, onChangeValues, phone } = this.props;

    return (
      <div className={classes.container}>
        <FormControl>
          <Input
            value={phone}
            onChange={(event) => onChangeValues(event, 'phone')}
            id="formatted-text-mask-input"
            inputComponent={TextMaskCustom}
          />
        </FormControl>
      </div>
    );
  }
}

PhoneInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhoneInput);