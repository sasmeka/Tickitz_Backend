const db = require('../configs/database')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`select s.id_schedule, m.title, pri.premier ,s.price ,s.date_start ,s.date_end ,b.full_location,a.time_schedule as times from schedule s 
        left join (select id_schedule , json_agg(jsonb_build_object('id_time_schedule',id_time_schedule,'time_schedule',time_schedule)) as time_schedule from time_schedule ts group by ts.id_schedule) as a on a.id_schedule=s.id_schedule 
        left join (select l.id_location ,json_agg(jsonb_build_object('id_location',l.id_location,'address',concat('(',l.building,'), ',street ,', ',v.name_village,', ',s.name_subdistrict,', ',r.name_regency,', ',p.name_province))) as full_location  from "location" l
        left join village v on v.id_village = l.id_village 
        left join subdistrict s on s.id_subdistrict =v.id_subdistrict 
        left join regency r on r.id_regency = s.id_regency 
        left join province p on p.id_province = r.id_province group by l.id_location) as b on b.id_location = s.id_location
        left join (select id_movie, json_agg(jsonb_build_object('id_movie',id_movie,'title', title)) as title from movie group by id_movie) m on m.id_movie = s.id_movie
        left join (select id_premier, json_agg(jsonb_build_object('id_premier',id_premier,'name_premier', name_premier)) as premier from premier group by id_premier) pri on pri.id_premier = s.id_premier
        ORDER BY id_schedule DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`select s.id_schedule, m.title, pri.premier ,s.price ,s.date_start ,s.date_end ,b.full_location,a.time_schedule as times from schedule s 
        left join (select id_schedule , json_agg(jsonb_build_object('id_time_schedule',id_time_schedule,'time_schedule',time_schedule)) as time_schedule from time_schedule ts group by ts.id_schedule) as a on a.id_schedule=s.id_schedule 
        left join (select l.id_location ,json_agg(jsonb_build_object('id_location',l.id_location,'address',concat('(',l.building,'), ',street ,', ',v.name_village,', ',s.name_subdistrict,', ',r.name_regency,', ',p.name_province))) as full_location  from "location" l
        left join village v on v.id_village = l.id_village 
        left join subdistrict s on s.id_subdistrict =v.id_subdistrict 
        left join regency r on r.id_regency = s.id_regency 
        left join province p on p.id_province = r.id_province group by l.id_location) as b on b.id_location = s.id_location
        left join (select id_movie, json_agg(jsonb_build_object('id_movie',id_movie,'title', title)) as title from movie group by id_movie) m on m.id_movie = s.id_movie
        left join (select id_premier, json_agg(jsonb_build_object('id_movie',id_premier,'name_premier', name_premier)) as premier from premier group by id_premier) pri on pri.id_premier = s.id_premier
        WHERE s.id_schedule=$1;`, [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.getDataTime = (id_time_schedule) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from public.time_schedule where id_time_schedule=$1`, [id_time_schedule])
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

model.addDataTime = ({ id_schedule, time }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.time_schedule (id_schedule, time_schedule) values ($1,$2)', [id_schedule, time])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'time schedule by schedule data successfully added.'
                })
            }).catch((e) => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'time schedule by schedule data failed to add.\''
                })
            })
    })
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
            }).catch((e) => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'schedule data failed to update.\''
                })
            })
    })
}

model.updateDataTime = ({ id_time_schedule, id_schedule, time }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.time_schedule SET id_schedule=$2, time_schedule=$3 where id_time_schedule = $1;', [id_time_schedule, id_schedule, time])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'time schedule data successfully updated.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'time schedule data failed to update.\''
                })
            })
    })
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
model.deleteDataBookingbytimeschedule = ({ id_time_schedule }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_time_schedule = $1;', [id_time_schedule])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'booking by time schedule data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'booking by time schedule data failed to delete.\''
                })
            })
    })
}
model.deleteDataTimeSchedule = ({ id_time_schedule }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.time_schedule ts where ts.id_time_schedule = $1;', [id_time_schedule])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'time schedule data successfully deleted.'
                })
            }).catch((e) => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'time schedule data failed to delete.\''
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
            'message': 'data schedule not found.'
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
model.deleteAllDataTime = async ({ id_time_schedule }) => {
    try {
        const result_data = await model.getDataTime(id_time_schedule)
        if (result_data.rowCount == 0) return ({
            'code': '404',
            'status': 'Not Found',
            'message': 'data time schedule not found.'
        })
        await db.query('BEGIN')
        await model.deleteDataBookingbytimeschedule({ id_time_schedule })
        const result = await model.deleteDataTimeSchedule({ id_time_schedule })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        throw error
    }
}

module.exports = model