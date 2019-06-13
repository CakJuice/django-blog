import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import formValidation from '../tools/FormValidation';

class BaseInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: null,
      value: '',
      errorMessage: '',
    }

    this.setValue = this.setValue.bind(this);
    this.setError = this.setError.bind(this);
    this.setValid = this.setValid.bind(this);
    this.resetValid = this.resetValid.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.getClassName = this.getClassName.bind(this);
  }

  checkValidation() {    
    if (this.props.validators) {
      for (let v of this.props.validators) {
        const fv = formValidation[v];
  
        if (validator[fv.validator](this.state.value) !== fv.condition) {
          this.setError(fv.message);
          return false;
        }
      }
  
    }

    this.setValid();
    return true;
  }

  setValue(value) {
    this.setState({
      value: value,
    });
  }

  setError(message) {
    this.setState({
      isValid: false,
      errorMessage: message,
    });
  }

  setValid() {
    this.setState({
      isValid: true,
      errorMessage: '',
    });
  }

  resetValid() {
    this.setState({
      isValid: null,
      errorMessage: '',
    });
  }

  getClassName() {
    let inputClassName = 'form-control';
    if (this.state.isValid === true) {
      inputClassName += ' is-valid';
    } else if (this.state.isValid === false) {
      inputClassName += ' is-invalid';
    }
    return inputClassName;
  }
}

BaseInput.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.any.isRequired,
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.any.isRequired,
  ]),
  validators: PropTypes.array,
  options: PropTypes.array,
}

export default BaseInput;
