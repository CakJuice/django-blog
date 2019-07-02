import React from 'react';
import BaseInput from './BaseInput';

class FormSelect extends BaseInput {
  constructor(props) {
    super(props);

    this.newProps = Object.assign({}, props);
    delete this.newProps['options'];

    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(e) {
    this.resetValid();
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const listOptions = this.props.options.map((option) =>
      <option key={option.key} value={option.key}>{option.value}</option>
    );
    listOptions.unshift(<option key={0} defaultValue value></option>);

    return (
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <select className={this.getClassName()} {...this.newProps} onChange={this.changeValue}>
          {listOptions}
        </select>
        {this.state.isValid === false && <div className="invalid-feedback">{this.state.errorMessage}</div>}
      </div>
    );
  }
}

export default FormSelect;
