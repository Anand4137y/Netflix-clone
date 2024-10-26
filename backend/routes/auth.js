const express = require('express')
const router = express.Router()
const {signup,login,logout} = require('../controllers/auth.controllers')

router.post('/logout',logout)
router.post('/signup',signup)
router.post('/login',login)

module.exports = router