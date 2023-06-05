// import express framework
const express = require('express')
const route = express.Router()

// import controllers
const control = require('../controllers/movie')

route.get('/', control.getAllData)
route.get('/:number', control.getData)
route.post('/add', control.addData)
route.put('/update', control.updateData)
route.delete('/delete', control.deleteData)

//export
module.exports = route