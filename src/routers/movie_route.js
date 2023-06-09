// import express framework
const express = require('express')
const route = express.Router()
const authCheck = require('../middleware/authCheck')
// import controllers
const control = require('../controllers/movie')
const resp = require('../library/responses')
const admin = (req, res, next) => { return req.data_jwt.role != 'admin' ? resp(res, 401, 'your are not an admin.') : next() }
route.get('/:value_params', authCheck, admin, control.getData)
route.get('/', authCheck, admin, control.getAllData)
route.post('/', authCheck, admin, control.addData)
route.put('/:id', authCheck, admin, control.updateData)
route.delete('/:id', authCheck, admin, control.deleteData)

//export
module.exports = route