import validator from 'validator'

export default data => {
  let errors = {}
  let isValid = true

  if (validator.isEmpty(data.email || '')) {
    errors.email = 'Enter email'
    isValid = false
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Enter valid email'
    isValid = false
  }

  if (validator.isEmpty(data.password || '')) {
    errors.password = 'Enter password'
    isValid = false
  }

  return {
    errors,
    isValid
  }
}
