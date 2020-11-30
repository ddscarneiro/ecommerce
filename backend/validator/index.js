const {body, validationResult} = require('express-validator')

const userValidationRule = () => {
  return [
    body('name').isLength({min: 3}).withMessage('Name must contain at least 3 char long.'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({min: 8}).withMessage('Password must contain min 8 char long.')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage('Password must contain at least one uppercase. At least one lower case. At least one special character.')
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if(errors.isEmpty()) return next()

  const extratedErrors = []
  errors.array().map(err => extratedErrors.push(err.msg))

  return res.status(422).json({
    err: extratedErrors
  })
}

module.exports = {
  userValidationRule,
  validate
}