import React from 'react';
import { FormGroup } from 'reactstrap';
import BaseInput from './BaseInput';

class FormInput extends BaseInput {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(e) {
    this.resetValid();
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return (
      <FormGroup>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input className={this.getClassName()} {...this.props} onChange={this.changeValue} value={this.state.value} />
        {this.state.isValid === false && <div className="invalid-feedback">{this.state.errorMessage}</div>}
      </FormGroup>
    );
  }
}

export default FormInput;
