const control = {}
const model = require('../models/movie_model')

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
        const id_movie = req.params.number
        const result = await model.getData(id_movie)
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
        const result = await model.addData({ id_director, title, release_date, duration_hour, duration_minute, synopsis, image })
        let new_id = await model.newIdData()
        new_id = new_id.rows[0].new_id_movie
        let str_values_cast = ''
        movie_id_cast.forEach((v) => {
            str_values_cast = str_values_cast + '(' + new_id + ',' + v + '),'
        })
        let str_values_genre = ''
        movie_id_genre.forEach((v) => {
            str_values_genre = str_values_genre + '(' + new_id + ',' + v + '),'
        })
        await model.addDataMovieCast(str_values_cast.slice(0, -1))
        await model.addDataMovieGenre(str_values_genre.slice(0, -1))
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.updateData = async (req, res) => {
    try {
        const { id_movie, id_director, title, release_date, duration_hour, duration_minute, synopsis, image, movie_id_cast, movie_id_genre } = req.body
        const result_data = await model.getData(id_movie)
        if (result_data.rowCount == 0) return res.send({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        const result = await model.updateData({ id_movie, id_director, title, release_date, duration_hour, duration_minute, synopsis, image })
        await model.deleteDataMovieCast({ id_movie })
        await model.deleteDataMovieGenre({ id_movie })
        let str_values_cast = ''
        movie_id_cast.forEach((v) => {
            str_values_cast = str_values_cast + '(' + id_movie + ',' + v + '),'
        })
        let str_values_genre = ''
        movie_id_genre.forEach((v) => {
            str_values_genre = str_values_genre + '(' + id_movie + ',' + v + '),'
        })
        await model.addDataMovieCast(str_values_cast.slice(0, -1))
        await model.addDataMovieGenre(str_values_genre.slice(0, -1))
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const { id_movie } = req.body
        const result_data = await model.getData(id_movie)
        if (result_data.rowCount == 0) return res.send({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        await model.deleteDataMovieCast({ id_movie })
        await model.deleteDataMovieGenre({ id_movie })
        await model.deleteDataBooking({ id_movie })
        await model.deleteDataTimeSchedule({ id_movie })
        await model.deleteDataSchedule({ id_movie })
        const result = await model.deleteData({ id_movie })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

module.exports = control
