const control = {}
const model = require('../models/movie_model')
const db = require('../configs/database')

control.getAllData = async (req, res) => {
    try {
        let { page, limit } = req.query
        page = page ? parseInt(page) : 1
        limit = limit ? parseInt(limit) : 100
        let offset = page >= 1 ? 0 + ((page - 1) * limit) : 0
        const result = await model.getAllData({ limit, offset })
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

control.getAllDatabyQuery1 = async (req, res) => {
    try {
        const { title } = req.query
        const title_like = "%" + title + "%"
        const result = await model.getAllDatabyQuery1({ title_like })
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

control.getAllDatabyQuery2 = async (req, res) => {
    try {
        const { title, release } = req.query
        const title_like = "%" + title + "%"
        const result = await model.getAllDatabyQuery2({ title_like, release })
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
        const value_params = req.params.value_params
        const result = await model.getData(value_params)
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
        const { id_director, title, release_date, duration_hour, duration_minute, synopsis, image, movie_id_cast, movie_id_genre } = req.body
        const result = await model.addAllData({ id_director, title, release_date, duration_hour, duration_minute, synopsis, image, movie_id_cast, movie_id_genre })
        return res.send(result)
    } catch (e) {
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
        return res.send(e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const id_movie = req.params.id
        const result = await model.deleteAllData({ id_movie })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

module.exports = control
