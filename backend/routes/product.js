const express = require('express')
const { isAdmin, isAuth, requireSignin } = require('../controllers/auth')
const router = express.Router()

const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo } = require('../controllers/product')
const { userById } = require('../controllers/user')


router.get('/', list)
router.get('/:productId', read)
router.get('/related/:productId', listRelated)
router.get('/categories', listCategories)
router.get('/by/search', listBySearch)
router.get('/photo/:productId', photo)
router.post('/create/:userId', requireSignin, isAuth, isAdmin, create)
router.put('/:productId/:userId', requireSignin, isAuth, isAdmin, update)
router.delete('/:productId/:userId', requireSignin, isAuth, isAdmin, remove)

router.param('userId', userById)
router.param('productId', productById)

module.exports = router