const db = require('../configs/database')
const model = {}

// GET ALL DATA
model.getAllData = () => {
    return new Promise((resolve, reject) => {
        db.query(`select tm.*, a.movie_cast as movie_id_cast,b.movie_genre as movie_id_genre from movie tm 
        left join (select tmc.id_movie,ARRAY_AGG(tc.id_cast) as movie_cast from movie_cast tmc
        left join casts tc on tmc.id_cast = tc.id_cast
        group by tmc.id_movie) as a on a.id_movie = tm.id_movie
        left join (select tmg.id_movie, ARRAY_AGG(tg.id_genre) as movie_genre from movie_genre tmg
        left join genre tg on tmg.id_genre = tg.id_genre
        group by tmg.id_movie) as b on b.id_movie = tm.id_movie ORDER BY id_movie DESC;`)
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

// GET DATA BY ID
model.getData = (id_movie) => {
    return new Promise((resolve, reject) => {
        db.query(`select tm.*, a.movie_cast as movie_id_cast,b.movie_genre as movie_id_genre from movie tm 
        left join (select tmc.id_movie,ARRAY_AGG(tc.id_cast) as movie_cast from movie_cast tmc
        left join casts tc on tmc.id_cast = tc.id_cast
        group by tmc.id_movie) as a on a.id_movie = tm.id_movie
        left join (select tmg.id_movie, ARRAY_AGG(tg.id_genre) as movie_genre from movie_genre tmg
        left join genre tg on tmg.id_genre = tg.id_genre
        group by tmg.id_movie) as b on b.id_movie = tm.id_movie WHERE tm.id_movie=$1`, [id_movie])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
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

// ADD DATA
model.addData = ({ id_director, title, release_date, duration_hour, duration_minute, synopsis, image }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.movie (id_director, title, release_date, duration_hour, duration_minute, synopsis, image) values ($1,$2,$3,$4,$5,$6,$7)', [id_director, title, release_date, duration_hour, duration_minute, synopsis, image])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "movie data successfully added."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "movie data failed to add.'"
                })
            })
    })
}

model.addDataMovieCast = (values) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.movie_cast (id_movie,id_cast) values ' + values)
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "cast by movie data successfully added."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "cast by movie data failed to add.'"
                })
            })
    })
}
model.addDataMovieGenre = (values) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.movie_genre (id_movie,id_genre) values ' + values)
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "genre by movie data successfully added."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "genre by movie data failed to add.'"
                })
            })
    })
}

// UPDATE DATA
model.updateData = ({ id_movie, id_director, title, release_date, duration_hour, duration_minute, synopsis, image }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.movie SET id_director=$2, title=$3, release_date=$4, duration_hour=$5, duration_minute=$6, synopsis=$7, image=$8 where id_movie = $1;', [id_movie, id_director, title, release_date, duration_hour, duration_minute, synopsis, image])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "movie data successfully updated."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "movie data failed to update.'"
                })
            })
    })
}

// DELETE DATA
model.deleteData = ({ id_movie }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.movie where id_movie=$1', [id_movie])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "movie data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "movie data failed to delete.'"
                })
            })
    })
}
model.deleteDataMovieCast = ({ id_movie }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.movie_cast where id_movie=$1', [id_movie])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "cast by movie data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "cast by movie data failed to delete.'"
                })
            })
    })
}
model.deleteDataMovieGenre = ({ id_movie }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.movie_genre where id_movie=$1', [id_movie])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "genre by movie data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "genre by movie data failed to delete.'"
                })
            })
    })
}
model.deleteDataBooking = ({ id_movie }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_time_schedule in (select id_time_schedule from public.time_schedule where id_schedule in (select id_schedule from public.schedule s where id_movie=$1))', [id_movie])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "booking by movie data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "booking by movie data failed to delete.'"
                })
            })
    })
}
model.deleteDataTimeSchedule = ({ id_movie }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.time_schedule where id_schedule in (select id_schedule from public.schedule s where id_movie=$1)', [id_movie])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "time schedule by movie data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "time schedule by movie data failed to delete.'"
                })
            })
    })
}
model.deleteDataSchedule = ({ id_movie }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.schedule where id_movie=$1', [id_movie])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "schedule by movie data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "schedule by movie data failed to delete.'"
                })
            })
    })
}

module.exports = model