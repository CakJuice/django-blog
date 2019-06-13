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
  }
}

export default formValidation;
