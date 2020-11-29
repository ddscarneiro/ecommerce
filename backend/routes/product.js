const express = require('express')
const { isAdmin, isAuth, requireSignin } = require('../controllers/auth')
const router = express.Router()

const { create, productById, read, remove, update } = require('../controllers/product')
const { userById } = require('../controllers/user')


router.get('/:productId', read)
router.post('/create/:userId', requireSignin, isAuth, isAdmin, create)
router.put('/:productId/:userId', requireSignin, isAuth, isAdmin, update)
router.delete('/:productId/:userId', requireSignin, isAuth, isAdmin, remove)

router.param('userId', userById)
router.param('productId', productById)

module.exports = router