const db = require('../configs/database')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.premier ORDER BY id_premier DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.premier WHERE id_premier=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ name_premier, image, count_row_seat, count_col_seat }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.premier (name_premier, image, count_row_seat, count_col_seat) values ($1,$2,$3,$4);', [name_premier, image, count_row_seat, count_col_seat])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'premier data successfully added.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'premier data failed to add.\''
                })
            })
    })
}

model.updateData = ({ id_premier, name_premier, image, count_row_seat, count_col_seat }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.premier SET name_premier=$2,image=$3,count_row_seat=$4,count_col_seat=$5 where id_premier = $1;', [id_premier, name_premier, image, count_row_seat, count_col_seat])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'premier data successfully updated.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'premier data failed to update.\''
                })
            })
    })
}

model.deleteData = ({ id_premier }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.premier where id_premier=$1', [id_premier])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'premier data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'premier data failed to delete.\''
                })
            })
    })
}

model.deleteDataBookingbypremier = ({ id_premier }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_time_schedule in (select id_time_schedule from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_premier = $1));', [id_premier])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'booking by premier data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'booking by premier data failed to delete.\''
                })
            })
    })
}
model.deleteDataTimeSchedulebypremier = ({ id_premier }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_premier = $1);', [id_premier])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'time schedule by premier data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'time schedule by premier data failed to delete.\''
                })
            })
    })
}
model.deleteDataSchedulebypremier = ({ id_premier }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.schedule where id_premier = $1;', [id_premier])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'schedule by premier data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'schedule by premier data failed to delete.\''
                })
            })
    })
}
model.deleteAllData = async ({ id_premier }) => {
    try {
        const result_data = await model.getData(id_premier)
        if (result_data.rowCount == 0) return ({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        await db.query('BEGIN')
        await model.deleteDataBookingbypremier({ id_premier })
        await model.deleteDataTimeSchedulebypremier({ id_premier })
        await model.deleteDataSchedulebypremier({ id_premier })
        const result = await model.deleteData({ id_premier })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        throw error
    }
}

module.exports = model