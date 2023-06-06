const db = require('../configs/database')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.location ORDER BY id_location DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.location WHERE id_location=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ id_village, street, building }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.location (id_village, street, building) values ($1,$2,$3);', [id_village, street, building])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'location data successfully added.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'location data failed to add.\''
                })
            })
    })
}

model.updateData = ({ id_location, id_village, street, building }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.location SET id_village=$2, street=$3, building=$4 where id_location = $1;', [id_location, id_village, street, building])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'location data successfully updated.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'location data failed to update.\''
                })
            })
    })
}

model.deleteData = ({ id_location }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.location where id_location=$1', [id_location])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'location data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'location data failed to delete.\''
                })
            })
    })
}

model.deleteDataBookingbylocation = ({ id_location }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_time_schedule in (select id_time_schedule from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location = $1));', [id_location])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'booking by location data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'booking by data failed to delete.\''
                })
            })
    })
}
model.deleteDataTimeSchedulebylocation = ({ id_location }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location = $1);', [id_location])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'time schedule by location data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'time schedule by location data failed to delete.\''
                })
            })
    })
}
model.deleteDataSchedulebylocation = ({ id_location }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.schedule where id_location = $1;', [id_location])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'schedule by location data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'schedule by location data failed to delete.\''
                })
            })
    })
}

model.deleteAllData = async ({ id_location }) => {
    try {
        const result_data = await model.getData(id_location)
        if (result_data.rowCount == 0) return ({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        await db.query('BEGIN')
        await model.deleteDataBookingbylocation({ id_location })
        await model.deleteDataTimeSchedulebylocation({ id_location })
        await model.deleteDataSchedulebylocation({ id_location })
        const result = await model.deleteData({ id_location })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        return error
    }
}

module.exports = model