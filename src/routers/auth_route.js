// import express framework
const express = require('express')
const route = express.Router()

// import controllers
const control = require('../controllers/auth')

route.get('/', control.home)
route.post('/login', control.login)
route.post('/register', control.register)
route.put('/verification', control.verification)

//export
module.exports = route