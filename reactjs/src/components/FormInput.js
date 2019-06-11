import React from 'react';
import { FormGroup } from 'reactstrap';

const FormInput = (props) => {
  return (
    <FormGroup>
      <label htmlFor={props.name}>{props.label}</label>
      <input className="form-control" {...props} />
    </FormGroup>
  );
}
  
export default FormInput;
