const db = require('../configs/database')
const model = {}

model.getAllData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.village ORDER BY id_village DESC;')
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.village WHERE id_village=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ name_village, id_subdistrict }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.village (name_village,id_subdistrict) values ($1,$2);', [name_village, id_subdistrict])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'village data successfully added.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'village data failed to add.\''
                })
            })
    })
}

model.updateData = ({ id_village, name_village, id_subdistrict }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.village SET name_village=$2,id_subdistrict=$3 where id_village = $1;', [id_village, name_village, id_subdistrict])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'village data successfully updated.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'village data failed to update.\''
                })
            })
    })
}

model.deleteData = ({ id_village }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.village where id_village=$1', [id_village])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'village data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'village data failed to delete.\''
                })
            })
    })
}

model.deleteDataBookingbyvillage = ({ id_village }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_time_schedule in (select id_time_schedule from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location in (select id_location from public.location where id_village = $1)));', [id_village])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'booking by village data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'booking by village data failed to delete.\''
                })
            })
    })
}
model.deleteDataTimeSchedulebyvillage = ({ id_village }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location in (select id_location from public.location where id_village = $1));', [id_village])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'time schedule by village data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'time schedule by village data failed to delete.\''
                })
            })
    })
}
model.deleteDataSchedulebyvillage = ({ id_village }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.schedule where id_location in (select id_location from public.location where id_village = $1);', [id_village])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'schedule by village data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'schedule by village data failed to delete.\''
                })
            })
    })
}
model.deleteDataLocationbyvillage = ({ id_village }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.location where id_village = $1;', [id_village])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'location by village data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'location by village data failed to delete.\''
                })
            })
    })
}

module.exports = model