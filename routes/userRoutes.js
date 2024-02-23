const express = require('express')
const authController = require('./../controllers/authController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', requireAuth, authController.logout)

module.exports = router