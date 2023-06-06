const control = {}
const model = require('../models/premier_model')

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
        const id_premier = req.params.number
        const result = await model.getData(id_premier)
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
        const { name_premier, image, count_row_seat, count_col_seat } = req.body
        const result = await model.addData({ name_premier, image, count_row_seat, count_col_seat })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.updateData = async (req, res) => {
    try {
        const id_premier = req.params.id
        const { name_premier, image, count_row_seat, count_col_seat } = req.body
        const result_data = await model.getData(id_premier)
        if (result_data.rowCount == 0) return res.send({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        const result = await model.updateData({ id_premier, name_premier, image, count_row_seat, count_col_seat })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const id_premier = req.params.id
        const result = await model.deleteAllData({ id_premier })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

module.exports = control