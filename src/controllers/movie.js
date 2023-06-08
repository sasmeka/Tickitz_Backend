const control = {}
const model = require('../models/movie_model')
const db = require('../configs/database')

control.getAllData = async (req, res) => {
    try {
        let { page, limit, search_title, search_release, order_by } = req.query
        page = page ? parseInt(page) : 1
        limit = limit ? parseInt(limit) : 100
        search_title = search_title ? search_title : ""
        search_release = search_release ? search_release : ""
        order_by = order_by ? order_by : "release_date"
        let offset = page >= 1 ? 0 + ((page - 1) * limit) : 0
        const result = await model.getAllData({ limit, offset, search_title, search_release, order_by })
        if (result.rowCount == 0) throw {
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        }
        return res.send(result.rows)
    } catch (e) {
        console.log(e)
        return res.send(e)
    }
}

control.getData = async (req, res) => {
    try {
        const value_params = req.params.value_params
        const result = await model.getData(value_params)
        if (result.rowCount == 0) throw {
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        }
        return res.send(result.rows)
    } catch (e) {
        console.log(e)
        return res.send(e)
    }
}

control.addData = async (req, res) => {
    try {
        const { id_director, title, release_date, duration_hour, duration_minute, synopsis, image, movie_id_cast, movie_id_genre } = req.body
        const result = await model.addAllData({ id_director, title, release_date, duration_hour, duration_minute, synopsis, image, movie_id_cast, movie_id_genre })
        return res.send(result)
    } catch (e) {
        console.log(e)
        return res.send(e)
    }
}

control.updateData = async (req, res) => {
    try {
        const id_movie = req.params.id
        const { id_director, title, release_date, duration_hour, duration_minute, synopsis, image, movie_id_cast, movie_id_genre } = req.body
        const result = await model.updateAllData({ id_movie, id_director, title, release_date, duration_hour, duration_minute, synopsis, image, movie_id_cast, movie_id_genre })
        return res.send(result)
    } catch (e) {
        console.log(e)
        return res.send(e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const id_movie = req.params.id
        const result = await model.deleteAllData({ id_movie })
        return res.send(result)
    } catch (e) {
        console.log(e)
        return res.send(e)
    }
}

module.exports = control
