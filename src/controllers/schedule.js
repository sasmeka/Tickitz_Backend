const control = {}
const model = require('../models/schedule_model')

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
        const id_schedule = req.params.number
        const result = await model.getData(id_schedule)
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
        const { id_movie, id_location, id_premier, price, date_start, date_end, times } = req.body
        const result = await model.addData({ id_movie, id_location, id_premier, price, date_start, date_end })
        let new_id = await model.newIdData()
        new_id = new_id.rows[0].new_id_schedule
        let str_values_time = ''
        times.forEach((v) => {
            str_values_time = str_values_time + "(" + new_id + ",'" + v + "'),"
        });
        await model.addDataTimeSchedulebySchedule(str_values_time.slice(0, -1))
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.updateData = async (req, res) => {
    try {
        const { id_schedule, id_movie, id_location, id_premier, price, date_start, date_end, times } = req.body
        const result_data = await model.getData(id_schedule)
        if (result_data.rowCount == 0) return res.send({
            "code": "404",
            "status": "Not Found",
            "message": "data not found."
        })
        const result = await model.updateData({ id_schedule, id_movie, id_location, id_premier, price, date_start, date_end })
        await model.deleteDataTimeSchedulebyschedule({ id_schedule })
        let str_values_time = ''
        times.forEach((v) => {
            str_values_time = str_values_time + "(" + id_schedule + ",'" + v + "'),"
        });
        await model.addDataTimeSchedulebySchedule(str_values_time.slice(0, -1))
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const { id_schedule } = req.body
        const result_data = await model.getData(id_schedule)
        if (result_data.rowCount == 0) return res.send({
            "code": "404",
            "status": "Not Found",
            "message": "data not found."
        })
        await model.deleteDataBookingbyschedule({ id_schedule })
        await model.deleteDataTimeSchedulebyschedule({ id_schedule })
        const result = await model.deleteData({ id_schedule })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

module.exports = control
