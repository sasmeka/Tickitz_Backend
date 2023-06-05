const control = {}
const model = require('../models/booking_model')

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
        const id_booking = req.params.number
        const result = await model.getData(id_booking)
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
        const { id_time_schedule, id_user, seats, selected_date } = req.body
        const result = await model.addData({ id_time_schedule, id_user, seats, selected_date })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.updateData = async (req, res) => {
    try {
        const { id_booking, id_time_schedule, id_user, seats, selected_date } = req.body
        const result_data = await model.getData(id_booking)
        if (result_data.rowCount == 0) return res.send({
            "code": "404",
            "status": "Not Found",
            "message": "data not found."
        })
        const result = await model.updateData({ id_booking, id_time_schedule, id_user, seats, selected_date })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const { id_booking } = req.body
        const result_data = await model.getData(id_booking)
        if (result_data.rowCount == 0) return res.send({
            "code": "404",
            "status": "Not Found",
            "message": "data not found."
        })
        const result = await model.deleteData({ id_booking })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

module.exports = control