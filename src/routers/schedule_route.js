// import express framework
const express = require('express')
const route = express.Router()
const authCheck = require('../middleware/authCheck')

// import controllers
const control = require('../controllers/schedule')

route.get('/', authCheck, control.getAllData)
route.get('/:number', authCheck, control.getData)
route.post('/', authCheck, control.addData)
route.post('/time', authCheck, control.addDataTime)
route.put('/:id', authCheck, control.updateData)
route.put('/time/:id', authCheck, control.updateDataTime)
route.delete('/:id', authCheck, control.deleteData)
route.delete('/time/:id', authCheck, control.deleteDataTime)

//export
module.exports = route