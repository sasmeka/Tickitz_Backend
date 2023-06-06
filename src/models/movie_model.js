const db = require('../configs/database')
const model = {}

// GET ALL DATA
model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`select tm.id_movie,tm.title,tm.release_date, tm.duration_hour, tm.duration_minute, tm.synopsis , tm.image, c.movie_director ,a.movie_cast as movie_id_cast,b.movie_genre as movie_id_genre from movie tm 
        left join (select tmc.id_movie,json_object_agg(tc.id_cast,tc.name_cast) as movie_cast from movie_cast tmc
        left join casts tc on tmc.id_cast = tc.id_cast
        group by tmc.id_movie) as a on a.id_movie = tm.id_movie
        left join (select tmg.id_movie, json_object_agg(tg.id_genre,tg.name_genre) as movie_genre from movie_genre tmg
        left join genre tg on tmg.id_genre = tg.id_genre
        group by tmg.id_movie) as b on b.id_movie = tm.id_movie
       left join (select id_director,json_object_agg(id_director,name_director) as movie_director from director d group by id_director) as c on c.id_director=tm.id_director ORDER BY tm.id_movie DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getAllDatabyQuery1 = ({ title_like }) => {
    return new Promise((resolve, reject) => {
        db.query(`select tm.id_movie,tm.title,tm.release_date, tm.duration_hour, tm.duration_minute, tm.synopsis , tm.image, c.movie_director ,a.movie_cast as movie_id_cast,b.movie_genre as movie_id_genre from movie tm 
        left join (select tmc.id_movie,json_object_agg(tc.id_cast,tc.name_cast) as movie_cast from movie_cast tmc
        left join casts tc on tmc.id_cast = tc.id_cast
        group by tmc.id_movie) as a on a.id_movie = tm.id_movie
        left join (select tmg.id_movie, json_object_agg(tg.id_genre,tg.name_genre) as movie_genre from movie_genre tmg
        left join genre tg on tmg.id_genre = tg.id_genre
        group by tmg.id_movie) as b on b.id_movie = tm.id_movie
       left join (select id_director,json_object_agg(id_director,name_director) as movie_director from director d group by id_director) as c on c.id_director=tm.id_director WHERE tm.title like $1 ORDER BY tm.id_movie DESC;`, [title_like])
            .then((res) => {
                resolve(res)
            }).catch((e) => {

                console.log(e)
                reject(e)
            })
    })
}

model.getAllDatabyQuery2 = ({ title_like, release }) => {
    return new Promise((resolve, reject) => {
        db.query(`select tm.id_movie,tm.title,tm.release_date, tm.duration_hour, tm.duration_minute, tm.synopsis , tm.image, c.movie_director ,a.movie_cast as movie_id_cast,b.movie_genre as movie_id_genre from movie tm 
        left join (select tmc.id_movie,json_object_agg(tc.id_cast,tc.name_cast) as movie_cast from movie_cast tmc
        left join casts tc on tmc.id_cast = tc.id_cast
        group by tmc.id_movie) as a on a.id_movie = tm.id_movie
        left join (select tmg.id_movie, json_object_agg(tg.id_genre,tg.name_genre) as movie_genre from movie_genre tmg
        left join genre tg on tmg.id_genre = tg.id_genre
        group by tmg.id_movie) as b on b.id_movie = tm.id_movie
       left join (select id_director,json_object_agg(id_director,name_director) as movie_director from director d group by id_director) as c on c.id_director=tm.id_director WHERE tm.title like $1 AND tm.release_date=$2 ORDER BY tm.id_movie DESC;`, [title_like, release])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

// GET DATA BY params
model.getData = (value_params) => {
    return new Promise((resolve, reject) => {
        db.query(`select tm.id_movie,tm.title,tm.release_date, tm.duration_hour, tm.duration_minute, tm.synopsis , tm.image, c.movie_director ,a.movie_cast as movie_id_cast,b.movie_genre as movie_id_genre from movie tm 
        left join (select tmc.id_movie,json_object_agg(tc.id_cast,tc.name_cast) as movie_cast from movie_cast tmc
        left join casts tc on tmc.id_cast = tc.id_cast
        group by tmc.id_movie) as a on a.id_movie = tm.id_movie
        left join (select tmg.id_movie, json_object_agg(tg.id_genre,tg.name_genre) as movie_genre from movie_genre tmg
        left join genre tg on tmg.id_genre = tg.id_genre
        group by tmg.id_movie) as b on b.id_movie = tm.id_movie
       left join (select id_director,json_object_agg(id_director,name_director) as movie_director from director d group by id_director) as c on c.id_director=tm.id_director WHERE tm.id_movie = $1`, [value_params])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

// ADD DATA
model.addData = ({ id_director, title, release_date, duration_hour, duration_minute, synopsis, image }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.movie (id_director, title, release_date, duration_hour, duration_minute, synopsis, image) values ($1,$2,$3,$4,$5,$6,$7)', [id_director, title, release_date, duration_hour, duration_minute, synopsis, image])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'movie data successfully added.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'movie data failed to add.\''
                })
            })
    })
}

model.newIdData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT currval(pg_get_serial_sequence(\'public.movie\', \'id_movie\')) as new_id_movie')
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addDataMovieCast = (values) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.movie_cast (id_movie,id_cast) values ' + values)
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'cast by movie data successfully added.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'cast by movie data failed to add.\''
                })
            })
    })
}
model.addDataMovieGenre = (values) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.movie_genre (id_movie,id_genre) values ' + values)
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'genre by movie data successfully added.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'genre by movie data failed to add.\''
                })
            })
    })
}

model.addAllData = async ({ id_director, title, release_date, duration_hour, duration_minute, synopsis, image, movie_id_cast, movie_id_genre }) => {
    try {
        await db.query('BEGIN')
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
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        return error
    }
}

// UPDATE DATA
model.updateData = ({ id_movie, id_director, title, release_date, duration_hour, duration_minute, synopsis, image }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.movie SET id_director=$2, title=$3, release_date=$4, duration_hour=$5, duration_minute=$6, synopsis=$7, image=$8 where id_movie = $1;', [id_movie, id_director, title, release_date, duration_hour, duration_minute, synopsis, image])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'movie data successfully updated.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'movie data failed to update.\''
                })
            })
    })
}

model.updateAllData = async ({ id_movie, id_director, title, release_date, duration_hour, duration_minute, synopsis, image, movie_id_cast, movie_id_genre }) => {
    try {
        const result_data = await model.getData(id_movie)
        if (result_data.rowCount == 0) return ({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        await db.query('BEGIN')
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
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        return error
    }
}

// DELETE DATA
model.deleteData = ({ id_movie }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.movie where id_movie=$1', [id_movie])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'movie data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'movie data failed to delete.\''
                })
            })
    })
}
model.deleteDataMovieCast = ({ id_movie }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.movie_cast where id_movie=$1', [id_movie])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'cast by movie data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'cast by movie data failed to delete.\''
                })
            })
    })
}
model.deleteDataMovieGenre = ({ id_movie }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.movie_genre where id_movie=$1', [id_movie])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'genre by movie data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'genre by movie data failed to delete.\''
                })
            })
    })
}
model.deleteDataBooking = ({ id_movie }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_time_schedule in (select id_time_schedule from public.time_schedule where id_schedule in (select id_schedule from public.schedule s where id_movie=$1))', [id_movie])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'booking by movie data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'booking by movie data failed to delete.\''
                })
            })
    })
}
model.deleteDataTimeSchedule = ({ id_movie }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.time_schedule where id_schedule in (select id_schedule from public.schedule s where id_movie=$1)', [id_movie])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'time schedule by movie data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'time schedule by movie data failed to delete.\''
                })
            })
    })
}
model.deleteDataSchedule = ({ id_movie }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.schedule where id_movie=$1', [id_movie])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'schedule by movie data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'schedule by movie data failed to delete.\''
                })
            })
    })
}

model.deleteAllData = async ({ id_movie }) => {
    try {
        const result_data = await model.getData(id_movie)
        if (result_data.rowCount == 0) return ({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        await db.query('BEGIN')
        await model.deleteDataMovieCast({ id_movie })
        await model.deleteDataMovieGenre({ id_movie })
        await model.deleteDataBooking({ id_movie })
        await model.deleteDataTimeSchedule({ id_movie })
        await model.deleteDataSchedule({ id_movie })
        const result = await model.deleteData({ id_movie })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        return error
    }
}

module.exports = model