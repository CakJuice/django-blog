import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';

const FormSelect = (props) => {
  const listOptions = props.options.map((option) =>
    <option key={option.key} value={option.key}>{option.value}</option>
  );

  if (!props.required) {
    listOptions.unshift(<option key={0} selected value></option>);
  }

  delete props.options;

  return (
    <FormGroup>
      <label htmlFor={props.name}>{props.label}</label>
      <select className="form-control" {...props}>
        {listOptions}
      </select>
    </FormGroup>
  );
}

FormSelect.propTypes = {
  options: PropTypes.array,
}

export default FormSelect;
