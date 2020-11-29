const express = require('express')
const { isAdmin, isAuth, requireSignin } = require('../controllers/auth')
const router = express.Router()

const { create, categoryById, read, list, update, remove } = require('../controllers/category')
const { userById } = require('../controllers/user')


router.get('/', list)
router.get('/:categoryId', read)
router.post('/create/:userId', requireSignin, isAuth, isAdmin, create)
router.put('/update/:categoryId/:userId', requireSignin, isAuth, isAdmin, update)
router.delete('/create/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove)

router.param('userId', userById)
router.param('categoryId', categoryById)

module.exports = router