import React from 'react';

const Input = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input type={props.type} className="form-control" onChange={props.onChange} value={props.value} />
    </div>
  );
}

export default Input;
