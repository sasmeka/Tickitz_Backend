const control = {}
const model = require('../models/province_model')

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
        const id_province = req.params.number
        const result = await model.getData(id_province)
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
        const { name_province } = req.body
        const result = await model.addData({ name_province })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.updateData = async (req, res) => {
    try {
        const { id_province, name_province } = req.body
        const result_data = await model.getData(id_province)
        if (result_data.rowCount == 0) return res.send({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        const result = await model.updateData({ id_province, name_province })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const { id_province } = req.body
        const result_data = await model.getData(id_province)
        if (result_data.rowCount == 0) return res.send({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        await model.deleteDataBookingbyProvince({ id_province })
        await model.deleteDataTimeSchedulebyProvince({ id_province })
        await model.deleteDataSchedulebyProvince({ id_province })
        await model.deleteDataLocationbyProvince({ id_province })
        await model.deleteDataVillagebyProvince({ id_province })
        await model.deleteDataSubdistrictbyProvince({ id_province })
        await model.deleteDataRegencybyProvince({ id_province })
        const result = await model.deleteData({ id_province })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

module.exports = control