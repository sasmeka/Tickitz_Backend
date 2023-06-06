const control = {}
const model = require('../models/schedule_model')

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
        const id_schedule = req.params.number
        const result = await model.getData(id_schedule)
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
        const { id_movie, id_location, id_premier, price, date_start, date_end, times } = req.body
        const result = await model.addAllData({ id_movie, id_location, id_premier, price, date_start, date_end, times })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.updateData = async (req, res) => {
    try {
        const id_schedule = req.params.id
        const { id_movie, id_location, id_premier, price, date_start, date_end, times } = req.body
        const result = await model.updateAllData({ id_schedule, id_movie, id_location, id_premier, price, date_start, date_end, times })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const id_schedule = req.params.id
        const result = await model.deleteAllData({ id_schedule })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

module.exports = control
