const db = require('../configs/database')
const model = {}

model.getAllData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.booking ORDER BY id_booking DESC;')
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.booking WHERE id_booking=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ id_time_schedule, id_user, seats, selected_date }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.booking (id_time_schedule, id_user, seats, selected_date) values ($1,$2,$3,$4);', [id_time_schedule, id_user, seats, selected_date])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'booking data successfully added.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'booking data failed to add.\''
                })
            })
    })
}

model.updateData = ({ id_booking, id_time_schedule, id_user, seats, selected_date }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.booking SET id_time_schedule=$2, id_user=$3, seats=$4, selected_date=$5 where id_booking = $1;', [id_booking, id_time_schedule, id_user, seats, selected_date])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'booking data successfully updated.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'booking data failed to update.\''
                })
            })
    })
}

model.deleteData = ({ id_booking }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_booking=$1', [id_booking])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'booking data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'booking data failed to delete.\''
                })
            })
    })
}

module.exports = model