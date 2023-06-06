// import express framework
const express = require('express')
const route = express.Router()

// import controllers
const control = require('../controllers/schedule')

route.get('/', control.getAllData)
route.get('/:number', control.getData)
route.post('/add', control.addData)
route.post('/addtime', control.addDataTime)
route.put('/update/:id', control.updateData)
route.put('/updatetime/:id', control.updateDataTime)
route.delete('/delete/:id', control.deleteData)
route.delete('/deletetime/:id', control.deleteDataTime)

//export
module.exports = route