// import express framework
const express = require('express')
const route = express.Router()

// import controllers
const control = require('../controllers/subdistrict')

route.get('/', control.getAllData)
route.get('/:number', control.getData)
route.post('/', control.addData)
route.put('/:id', control.updateData)
route.delete('/:id', control.deleteData)

//export
module.exports = route