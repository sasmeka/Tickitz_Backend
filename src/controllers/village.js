const control = {}
const model = require('../models/village_model')

control.getAllData = async (req, res) => {
    try {
        const result = await model.getAllData()
        if (result.rowCount == 0) throw {
            "code": "404",
            "status": "Not Found",
            "message": "data not found."
        }
        return res.send(result.rows)
    } catch (e) {
        return res.send(e)
    }
}

control.getData = async (req, res) => {
    try {
        const id_village = req.params.number
        const result = await model.getData(id_village)
        if (result.rowCount == 0) throw {
            "code": "404",
            "status": "Not Found",
            "message": "data not found."
        }
        return res.send(result.rows)
    } catch (e) {
        return res.send(e)
    }
}

control.addData = async (req, res) => {
    try {
        const { name_village, id_subdistrict } = req.body
        const result = await model.addData({ name_village, id_subdistrict })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.updateData = async (req, res) => {
    try {
        const { id_village, name_village, id_subdistrict } = req.body
        const result_data = await model.getData(id_village)
        if (result_data.rowCount == 0) return res.send({
            "code": "404",
            "status": "Not Found",
            "message": "data not found."
        })
        const result = await model.updateData({ id_village, name_village, id_subdistrict })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const { id_village } = req.body
        const result_data = await model.getData(id_village)
        if (result_data.rowCount == 0) return res.send({
            "code": "404",
            "status": "Not Found",
            "message": "data not found."
        })
        await model.deleteDataBookingbyvillage({ id_village })
        await model.deleteDataTimeSchedulebyvillage({ id_village })
        await model.deleteDataSchedulebyvillage({ id_village })
        await model.deleteDataLocationbyvillage({ id_village })
        const result = await model.deleteData({ id_village })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

module.exports = control