const control = {}
const model = require('../models/regency_model')

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
        const id_regency = req.params.number
        const result = await model.getData(id_regency)
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
        const { name_regency, id_province } = req.body
        const result = await model.addData({ name_regency, id_province })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.updateData = async (req, res) => {
    try {
        const { id_regency, name_regency, id_province } = req.body
        const result_data = await model.getData(id_regency)
        if (result_data.rowCount == 0) return res.send({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        const result = await model.updateData({ id_regency, name_regency, id_province })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const { id_regency } = req.body
        const result_data = await model.getData(id_regency)
        if (result_data.rowCount == 0) return res.send({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        await model.deleteDataBookingbyregency({ id_regency })
        await model.deleteDataTimeSchedulebyregency({ id_regency })
        await model.deleteDataSchedulebyregency({ id_regency })
        await model.deleteDataLocationbyregency({ id_regency })
        await model.deleteDataVillagebyregency({ id_regency })
        await model.deleteDataSubdistrictbyregency({ id_regency })
        const result = await model.deleteData({ id_regency })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

module.exports = control