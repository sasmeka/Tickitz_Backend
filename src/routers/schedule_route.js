// import express framework
const express = require('express')
const route = express.Router()
const control = require('../controllers/schedule')
const authCheck = require('../middleware/authCheck')
const resp = require('../library/responses')
const admin = (req, res, next) => { return req.data_jwt.role != 'admin' ? resp(res, 401, 'your are not an admin.') : next() }
// import controllers
route.get('/', authCheck, admin, control.getAllData)
route.get('/:number', authCheck, admin, control.getData)
route.post('/', authCheck, admin, control.addData)
route.post('/time', authCheck, admin, control.addDataTime)
route.put('/:id', authCheck, admin, control.updateData)
route.put('/time/:id', authCheck, admin, control.updateDataTime)
route.delete('/:id', authCheck, admin, control.deleteData)
route.delete('/time/:id', authCheck, admin, control.deleteDataTime)

//export
module.exports = route