// import express framework
const express = require('express')
const route = express.Router()
const authCheck = require('../middleware/authCheck')
const resp = require('../library/responses')
const admin = (req, res, next) => { return req.data_jwt.role != 'admin' ? resp(res, 401, 'your are not an admin.') : next() }
// import controllers
const control = require('../controllers/user')

route.get('/', authCheck, admin, control.getAllData)
route.get('/:number', authCheck, admin, control.getData)
route.post('/', authCheck, admin, control.addData)
route.put('/:id', authCheck, admin, control.updateData)
route.delete('/:id', authCheck, admin, control.deleteData)

//export
module.exports = route