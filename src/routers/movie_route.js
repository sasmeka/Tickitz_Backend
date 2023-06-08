// import express framework
const express = require('express')
const route = express.Router()
const authCheck = require('../middleware/authCheck')
// import controllers
const control = require('../controllers/movie')

route.get('/:value_params', authCheck, control.getData)
route.get('/', authCheck, control.getAllData)
route.post('/', authCheck, control.addData)
route.put('/:id', authCheck, control.updateData)
route.delete('/:id', authCheck, control.deleteData)

//export
module.exports = route