import React from 'react';
import { FormGroup } from 'reactstrap';
import validator from 'validator';
import formValidation from '../tools/FormValidation';

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      value: '',
      errorMessage: '',
    }

    this.changeValue = this.changeValue.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.resetError = this.resetError.bind(this);
  }

  checkValidation() {
    if (!this.props.validators) return true;
    
    for (let v of this.props.validators) {
      const fv = formValidation[v];

      if (validator[fv.validator](this.state.value) !== fv.condition) {
        this.setError(fv.message);
        return false;
      }
    }

    return true;
  }

  setError(message) {
    this.setState({
      isError: true,
      errorMessage: message,
    });
  }

  resetError() {
    this.setState({
      isError: false,
      errorMessage: '',
    });
  }

  changeValue(e) {
    if (this.state.isError) {
      this.resetError();
    }

    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return (
      <FormGroup>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input className="form-control" {...this.props} onChange={this.changeValue} value={this.state.value} />
        {this.state.isError && <span>{this.state.errorMessage}</span>}
      </FormGroup>
    );
  }
}
  
export default FormInput;
