const control = {}
const model = require('../models/user_model')

control.getAllData = async (req, res) => {
    try {
        let { page, limit } = req.query
        page = page ? parseInt(page) : 1
        limit = limit ? parseInt(limit) : 100
        let offset = page >= 1 ? 0 + ((page - 1) * limit) : 0
        const result = await model.getAllData({ limit, offset })
        if (result.rowCount == 0) throw {
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        }
        return res.send(result.rows)
    } catch (e) {
        console.log(e)
        return res.send(e)
    }
}

control.getData = async (req, res) => {
    try {
        const id_user = req.params.number
        const result = await model.getData(id_user)
        if (result.rowCount == 0) throw {
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        }
        return res.send(result.rows)
    } catch (e) {
        console.log(e)
        return res.send(e)
    }
}

control.addData = async (req, res) => {
    try {
        const { first_name, last_name, phone, email, pass } = req.body
        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount > 0) return res.send({
            'code': '400',
            'status': 'Bad Request',
            'message': 'e-mail has been registered.'
        })
        const result = await model.addData({ first_name, last_name, phone, email, pass })
        return res.send(result)
    } catch (e) {
        console.log(e)
        return res.send(e)
    }
}

control.updateData = async (req, res) => {
    try {
        const id_user = req.params.id
        const { first_name, last_name, phone, email, pass, status_verification } = req.body
        const result_data = await model.getData(id_user)
        if (result_data.rowCount == 0) return res.send({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        const result = await model.updateData({ id_user, first_name, last_name, phone, email, pass, status_verification })
        return res.send(result)
    } catch (e) {
        console.log(e)
        return res.send(e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const id_user = req.params.id
        const result = await model.deleteAllData({ id_user })
        return res.send(result)
    } catch (e) {
        console.log(e)
        return res.send(e)
    }
}

module.exports = control