/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl'
//State
import { connect } from 'react-redux';
import { homePhone, mobilePhone, workPhone, } from 'state/newUser/actions.js';


const mapStateToProps = (state) => {
  return {
    homePhone: state.newUser.homePhone,
    mobilePhone: state.newUser.mobilePhone,
    workPhone: state.newUser.workPhone,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeHomePhone: (event) => dispatch(homePhone(event)),
    onChangeMobilePhone: (event) => dispatch(mobilePhone(event)),
    onChangeWorkPhone: (event) => dispatch(workPhone(event)),
  }
}


const styles = theme => ({
  container: {
    display: 'inline-block',
  },
  root: {
    display: 'inline-block',
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: 0,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
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

  constructor(props) {
    super(props)
      this.state = {
        type: '',
        number: '(  )    -    ', 
      };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event, key) {
    const { onChangeHomePhone, onChangeMobilePhone, onChangeWorkPhone} = this.props
    const type = document.getElementById(this.props.select).value
    const input = document.getElementById(this.props.input).value
    
    this.setState({[key]: event.target.value});
      // eslint-disable-next-line
      type === 'homePhone'
        ? onChangeHomePhone(input)
        : type === 'mobilePhone'
          ? onChangeMobilePhone(input)
          : type === 'workPhone'
            ? onChangeWorkPhone(input)
            : null
  }

  render() {
    const { classes, select, input } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="phoneType">Type</InputLabel>
              <Select
                native
                value={this.state.type}
                onChange={(e) => this.handleChange(e, 'type')}
                inputProps={{
                  name: 'phoneType',
                  id: select,
                }}
              >
                <option value="" />
                <option value={'homePhone'}>Home</option>
                <option value={'mobilePhone'}>Mobile</option>
                <option value={'workPhone'}>Work</option>
              </Select>
          </FormControl>
        </div>
        <div className={classes.container}>
          <FormControl>
            <Input
              value={this.state.number}
              onChange={(event) => this.handleChange(event, 'number')}
              id={input}
              inputComponent={TextMaskCustom}
            />
          </FormControl>
      </div>
    </React.Fragment>
    );
  }
}

PhoneInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PhoneInput));