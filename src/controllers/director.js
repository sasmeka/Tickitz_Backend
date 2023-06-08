const control = {}
const model = require('../models/director_model')

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
        const id_director = req.params.number
        const result = await model.getData(id_director)
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
        const { name_director } = req.body
        const result = await model.addData({ name_director })
        return res.send(result)
    } catch (e) {
        console.log(e)
        return res.send(e)
    }
}

control.updateData = async (req, res) => {
    try {
        const id_director = req.params.id
        const { name_director } = req.body
        const result_data = await model.getData(id_director)
        if (result_data.rowCount == 0) return res.send({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        const result = await model.updateData({ id_director, name_director })
        return res.send(result)
    } catch (e) {
        console.log(e)
        return res.send(e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const id_director = req.params.id
        const result = await model.deleteAllData({ id_director })
        return res.send(result)
    } catch (e) {
        console.log(e)
        return res.send(e)
    }
}

module.exports = control