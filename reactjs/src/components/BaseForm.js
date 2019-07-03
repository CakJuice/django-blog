import React from 'react';

class BaseForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = {};
    this.disabled = false;
  }

  disableForm() {
    for (const key in this.inputRef) {
      const elem = this.inputRef[key].current;
      elem.setDisabled();
    }
    this.disabled = true
  }

  enableForm() {
    for (const key in this.inputRef) {
      const elem = this.inputRef[key].current;
      elem.setEnabled();
    }
    this.disabled = false;
  }

  resetForm() {
    for (const key in this.inputRef) {
      const elem = this.inputRef[key].current;
      elem.resetState();
      elem.setEnabled();
    }
    this.disabled = false;
  }

  checkInputValidation() {
    let allValid = true;
    let dataInput = {};

    for (const key in this.inputRef) {
      const elem = this.inputRef[key].current;
      const valid = elem.checkValidation();
      if (valid) {
        if (elem.state.value == null || elem.state.value === "") {
          continue;
        }
        dataInput[key] = elem.state.value;
      } else {
        allValid = false
      };
    }

    return {
      valid: allValid,
      dataInput: dataInput,
    }
  }
}

export default BaseForm;
