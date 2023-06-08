// import express framework
const express = require('express')
const route = express.Router()

// import controllers
const control = require('../controllers/movie')

route.get('/:value_params', control.getData)
route.get('/', control.getAllData)
route.post('/', control.addData)
route.put('/:id', control.updateData)
route.delete('/:id', control.deleteData)

//export
module.exports = route