const control = {}
const model = require('../models/subdistrict_model')
const resp = require('../library/responses')

control.getAllData = async (req, res) => {
    try {
        if (req.data_jwt.role != 'admin') return resp(res, 401, "You are not an admin")
        let { page, limit } = req.query
        page = page ? parseInt(page) : 1
        limit = limit ? parseInt(limit) : 100
        let offset = page >= 1 ? 0 + ((page - 1) * limit) : 0
        const result = await model.getAllData({ limit, offset })
        if (result.rowCount == 0) throw 'data not found.'
        const result_count_data = await model.getCountData()
        const meta = {
            next: result_count_data.rows[0].count_data <= 0 ? null : page == Math.ceil(result_count_data.rows[0].count_data / limit) ? null : page + 1,
            prev: page == 1 ? null : page - 1,
            total: result_count_data.rows[0].count_data
        }
        return resp(res, 200, result.rows, meta)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.getData = async (req, res) => {
    try {
        if (req.data_jwt.role != 'admin') return resp(res, 401, "You are not an admin")
        const id_subdistrict = req.params.number
        const result = await model.getData(id_subdistrict)
        if (result.rowCount == 0) throw 'data not found.'
        return resp(res, 200, result.rows)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.addData = async (req, res) => {
    try {
        if (req.data_jwt.role != 'admin') return resp(res, 401, "You are not an admin")
        const { name_subdistrict, id_regency } = req.body
        const result = await model.addData({ name_subdistrict, id_regency })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.updateData = async (req, res) => {
    try {
        if (req.data_jwt.role != 'admin') return resp(res, 401, "You are not an admin")
        const id_subdistrict = req.params.id
        const { name_subdistrict, id_regency } = req.body
        const result_data = await model.getData(id_subdistrict)
        if (result_data.rowCount == 0) throw 'data not found.'
        const result = await model.updateData({ id_subdistrict, name_subdistrict, id_regency })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.deleteData = async (req, res) => {
    try {
        if (req.data_jwt.role != 'admin') return resp(res, 401, "You are not an admin")
        const id_subdistrict = req.params.id
        const result = await model.deleteAllData({ id_subdistrict })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

module.exports = control