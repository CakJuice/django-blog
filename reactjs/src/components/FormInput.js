import React from 'react';
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

  getClassName() {
    let inputClassName = 'form-control';
    if (this.state.isValid === true) {
      inputClassName += ' is-valid';
    } else if (this.state.isValid === false) {
      inputClassName += ' is-invalid';
    }
    return inputClassName;
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input className={this.getClassName()} {...this.props} onChange={this.changeValue} value={this.state.value} />
        {this.state.isValid === false && <div className="invalid-feedback">{this.state.errorMessage}</div>}
      </div>
    );
  }
}

export default FormInput;
