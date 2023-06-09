// import express framework
const express = require('express')
const route = express.Router()

// import controllers
const control = require('../controllers/auth')

const cookieparser = require('cookie-parser');
route.use(cookieparser());

route.get('/', control.home)
route.get('/refresh_token', control.refresh)
route.post('/login', control.login)
route.post('/register', control.register)
route.get('/verification', control.verification)

//export
module.exports = route