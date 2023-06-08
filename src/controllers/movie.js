const control = {}
const model = require('../models/movie_model')
const resp = require('../library/responses')

control.getAllData = async (req, res) => {
    try {
        if (req.data_jwt.role != 'admin') return resp(res, 401, "You are not an admin")
        let { page, limit, search_title, search_release, order_by } = req.query
        page = page ? parseInt(page) : 1
        limit = limit ? parseInt(limit) : 1
        search_title = search_title ? search_title : ""
        search_release = search_release ? search_release : ""
        order_by = order_by ? order_by : "release_date"
        let offset = page >= 1 ? 0 + ((page - 1) * limit) : 0
        const result = await model.getAllData({ limit, offset, search_title, search_release, order_by })
        if (result.rowCount == 0) throw 'data not found.'
        const result_count_data = await model.getCountData({ search_title, search_release })
        const meta = {
            next: result_count_data.rows[0].count_data <= 0 ? null : page == Math.ceil(result_count_data.rows[0].count_data / limit) ? null : page + 1,
            prev: page == 1 ? null : page - 1,
            total: result_count_data.rows[0].count_data
        }
        return resp(res, 200, result.rows, meta)
    } catch (e) {
        console.log(e)
        return resp(res, 200, e)
    }
}

control.getData = async (req, res) => {
    try {
        if (req.data_jwt.role != 'admin') return resp(res, 401, "You are not an admin")
        const value_params = req.params.value_params
        const result = await model.getData(value_params)
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
        const { id_director, title, release_date, duration_hour, duration_minute, synopsis, image, movie_id_cast, movie_id_genre } = req.body
        const result = await model.addAllData({ id_director, title, release_date, duration_hour, duration_minute, synopsis, image, movie_id_cast, movie_id_genre })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.updateData = async (req, res) => {
    try {
        if (req.data_jwt.role != 'admin') return resp(res, 401, "You are not an admin")
        const id_movie = req.params.id
        const { id_director, title, release_date, duration_hour, duration_minute, synopsis, image, movie_id_cast, movie_id_genre } = req.body
        const result = await model.updateAllData({ id_movie, id_director, title, release_date, duration_hour, duration_minute, synopsis, image, movie_id_cast, movie_id_genre })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.deleteData = async (req, res) => {
    try {
        if (req.data_jwt.role != 'admin') return resp(res, 401, "You are not an admin")
        const id_movie = req.params.id
        const result = await model.deleteAllData({ id_movie })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

module.exports = control
