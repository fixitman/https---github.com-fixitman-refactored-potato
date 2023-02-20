const express = require('express')

const router = express.Router()
const {login, register, logout, getUser } = require('../controllers/authController')


router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)

router.get('/getUser', getUser)

module.exports = router