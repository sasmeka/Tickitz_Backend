// import express framework
const express = require('express')
const route = express.Router()
const authCheck = require('../middleware/authCheck')

// import controllers
const control = require('../controllers/regency')

route.get('/', authCheck, control.getAllData)
route.get('/:number', authCheck, control.getData)
route.post('/', authCheck, control.addData)
route.put('/:id', authCheck, control.updateData)
route.delete('/:id', authCheck, control.deleteData)

//export
module.exports = route