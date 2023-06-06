// import express framework
const express = require('express')
const route = express.Router()

// import controllers
const control = require('../controllers/movie')

route.get('/searchbytitle', control.getAllDatabyQuery1)
route.get('/searchbytitlerelease', control.getAllDatabyQuery2)
route.get('/:value_params', control.getData)
route.get('/', control.getAllData)
route.post('/add', control.addData)
route.put('/update/:id', control.updateData)
route.delete('/delete/:id', control.deleteData)

//export
module.exports = route