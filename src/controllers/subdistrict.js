const control = {}
const model = require('../models/subdistrict_model')

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
        const id_subdistrict = req.params.number
        const result = await model.getData(id_subdistrict)
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
        const { name_subdistrict, id_regency } = req.body
        const result = await model.addData({ name_subdistrict, id_regency })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.updateData = async (req, res) => {
    try {
        const id_subdistrict = req.params.id
        const { name_subdistrict, id_regency } = req.body
        const result_data = await model.getData(id_subdistrict)
        if (result_data.rowCount == 0) return res.send({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        const result = await model.updateData({ id_subdistrict, name_subdistrict, id_regency })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const id_subdistrict = req.params.id
        const result = await model.deleteAllData({ id_subdistrict })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

module.exports = control