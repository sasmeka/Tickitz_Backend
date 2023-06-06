// import express framework
const express = require('express')
const route = express.Router()

// import controllers
const control = require('../controllers/director')

route.get('/', control.getAllData)
route.get('/:number', control.getData)
route.post('/add', control.addData)
route.put('/update/:id', control.updateData)
route.delete('/delete/:id', control.deleteData)

//export
module.exports = route