const express = require('express')
const router = express.Router()
const {userValidationRule, validate} = require('../validator')

const { signup, signin, signout } = require('../controllers/auth')

router.post('/signup', userValidationRule(), validate, signup)
router.post('/signin', signin)
router.get('/signout', signout)

module.exports = router