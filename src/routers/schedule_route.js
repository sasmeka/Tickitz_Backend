// import express framework
const express = require('express')
const route = express.Router()

// import controllers
const control = require('../controllers/schedule')

route.get('/', control.getAllData)
route.get('/:number', control.getData)
route.post('/', control.addData)
route.post('/time', control.addDataTime)
route.put('/:id', control.updateData)
route.put('/time/:id', control.updateDataTime)
route.delete('/:id', control.deleteData)
route.delete('/time/:id', control.deleteDataTime)

//export
module.exports = route