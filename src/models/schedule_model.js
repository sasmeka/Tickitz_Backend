const db = require('../configs/database')
const model = {}

model.getAllData = () => {
    return new Promise((resolve, reject) => {
        db.query(`select s.*,a.time_id_schedule as times from schedule s left join (select id_schedule , ARRAY_AGG(time_schedule) as time_id_schedule from time_schedule ts group by ts.id_schedule) as a on a.id_schedule=s.id_schedule ORDER BY id_schedule DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('select s.*,a.time_id_schedule as times from schedule s left join (select id_schedule , ARRAY_AGG(time_schedule) as time_id_schedule from time_schedule ts group by ts.id_schedule) as a on a.id_schedule=s.id_schedule WHERE s.id_schedule=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.newIdData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT currval(pg_get_serial_sequence(\'public.schedule\', \'id_schedule\')) as new_id_schedule')
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.addData = ({ id_movie, id_location, id_premier, price, date_start, date_end }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.schedule (id_movie, id_location, id_premier, price, date_start, date_end) values ($1,$2,$3,$4,$5,$6);', [id_movie, id_location, id_premier, price, date_start, date_end])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'schedule data successfully added.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'schedule data failed to add.\''
                })
            })
    })
}

model.addDataTimeSchedulebySchedule = (values) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.time_schedule (id_schedule, time_schedule) values ' + values)
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'time schedule by schedule data successfully added.'
                })
            }).catch(() => {
                console.log('insert into public.time_schedule (id_schedule, time_schedule) values ' + values)
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'time schedule by schedule data failed to add.\''
                })
            })
    })
}

model.addAllData = async ({ id_movie, id_location, id_premier, price, date_start, date_end, times }) => {
    try {
        await db.query('BEGIN')
        const result = await model.addData({ id_movie, id_location, id_premier, price, date_start, date_end })
        let new_id = await model.newIdData()
        new_id = new_id.rows[0].new_id_schedule
        let str_values_time = ''
        times.forEach((v) => {
            str_values_time = str_values_time + '(' + new_id + ',\'' + v + '\'),'
        })
        await model.addDataTimeSchedulebySchedule(str_values_time.slice(0, -1))
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        return error
    }
}

model.updateData = ({ id_schedule, id_movie, id_location, id_premier, price, date_start, date_end }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.schedule SET id_movie=$2, id_location=$3, id_premier=$4, price=$5, date_start=$6, date_end=$7 where id_schedule = $1;', [id_schedule, id_movie, id_location, id_premier, price, date_start, date_end])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'schedule data successfully updated.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'schedule data failed to update.\''
                })
            })
    })
}

model.updateAllData = async ({ id_schedule, id_movie, id_location, id_premier, price, date_start, date_end, times }) => {
    try {
        const result_data = await model.getData(id_schedule)
        if (result_data.rowCount == 0) return ({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        await db.query('BEGIN')
        const result = await model.updateData({ id_schedule, id_movie, id_location, id_premier, price, date_start, date_end, times })
        await model.deleteDataBookingbyschedule({ id_schedule })
        await model.deleteDataTimeSchedulebyschedule({ id_schedule })
        let str_values_time = ''
        times.forEach((v) => {
            str_values_time = str_values_time + '(' + id_schedule + ',\'' + v + '\'),'
        })
        await model.addDataTimeSchedulebySchedule(str_values_time.slice(0, -1))
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        return error
    }
}

model.deleteData = ({ id_schedule }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.schedule where id_schedule=$1', [id_schedule])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'schedule data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'schedule data failed to delete.\''
                })
            })
    })
}

model.deleteDataBookingbyschedule = ({ id_schedule }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_time_schedule in (select id_time_schedule from public.time_schedule ts where id_schedule = $1);', [id_schedule])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'booking by schedule data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'booking by schedule data failed to delete.\''
                })
            })
    })
}
model.deleteDataTimeSchedulebyschedule = ({ id_schedule }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.time_schedule ts where id_schedule = $1;', [id_schedule])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'time schedule by schedule data successfully deleted.'
                })
            }).catch((e) => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'time schedule by schedule data failed to delete.\''
                })
            })
    })
}

model.deleteAllData = async ({ id_schedule }) => {
    try {
        const result_data = await model.getData(id_schedule)
        if (result_data.rowCount == 0) return ({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        await db.query('BEGIN')
        await model.deleteDataBookingbyschedule({ id_schedule })
        await model.deleteDataTimeSchedulebyschedule({ id_schedule })
        const result = await model.deleteData({ id_schedule })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        return error
    }
}

module.exports = model