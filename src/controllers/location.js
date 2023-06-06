const control = {}
const model = require('../models/location_model')

control.getAllData = async (req, res) => {
    try {
        const result = await model.getAllData()
        if (result.rowCount == 0) throw {
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        }
        return res.send(result.rows)
    } catch (e) {
        return res.send(e)
    }
}

control.getData = async (req, res) => {
    try {
        const id_location = req.params.number
        const result = await model.getData(id_location)
        if (result.rowCount == 0) throw {
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        }
        return res.send(result.rows)
    } catch (e) {
        return res.send(e)
    }
}

control.addData = async (req, res) => {
    try {
        const { id_village, street, building } = req.body
        const result = await model.addData({ id_village, street, building })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.updateData = async (req, res) => {
    try {
        const id_location = req.params.id
        const { id_village, street, building } = req.body
        const result_data = await model.getData(id_location)
        if (result_data.rowCount == 0) return res.send({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        const result = await model.updateData({ id_location, id_village, street, building })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const id_location = req.params.id
        const result = await model.deleteAllData({ id_location })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

module.exports = control