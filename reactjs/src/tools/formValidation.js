const formValidation = {
  isEmail: {
    validator: 'isEmail',
    condition: true,
    message: "You should enter a valid email address."
  },
  isRequired: {
    validator: 'isEmpty',
    condition: false,
    message: "This field cannot be blank."
  },
  isUnique: {
    validator: null,
    condition: true,
    message: "This value already exists. You need to set unique value to this field."
  }
}

export default formValidation;
