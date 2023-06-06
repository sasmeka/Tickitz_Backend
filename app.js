// import express framework
const express = require('express')
const app = express()
// import config dotenv
require('dotenv').config()
// import cors
const cors = require('cors')
app.use(cors())

// import database config
const db = require('./src/configs/database')

// import route
const route = require('./src/routers/routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(route)

db.connect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('app running on port ' + process.env.PORT)
    })
}).catch((e) => {
    console.log(e)
})

