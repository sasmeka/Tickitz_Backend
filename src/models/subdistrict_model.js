const db = require('../configs/database')
const model = {}

model.getAllData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.subdistrict ORDER BY id_subdistrict DESC;')
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.subdistrict WHERE id_subdistrict=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ name_subdistrict, id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.subdistrict (name_subdistrict,id_regency) values ($1,$2);', [name_subdistrict, id_regency])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'subdistrict data successfully added.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'subdistrict data failed to add.\''
                })
            })
    })
}

model.updateData = ({ id_subdistrict, name_subdistrict, id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.subdistrict SET name_subdistrict=$2,id_regency=$3 where id_subdistrict = $1;', [id_subdistrict, name_subdistrict, id_regency])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'subdistrict data successfully updated.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'subdistrict data failed to update.\''
                })
            })
    })
}

model.deleteData = ({ id_subdistrict }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.subdistrict where id_subdistrict=$1', [id_subdistrict])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'subdistrict data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'subdistrict data failed to delete.\''
                })
            })
    })
}

model.deleteDataBookingbysubdistrict = ({ id_subdistrict }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_time_schedule in (select id_time_schedule from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location in (select id_location from public.location where id_village in (select id_village from public.village where id_subdistrict = $1))));', [id_subdistrict])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'booking by subdistrict data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'booking by subdistrict data failed to delete.\''
                })
            })
    })
}
model.deleteDataTimeSchedulebysubdistrict = ({ id_subdistrict }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location in (select id_location from public.location where id_village in (select id_village from public.village where id_subdistrict = $1)));', [id_subdistrict])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'time schedule by subdistrict data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'time schedule by subdistrict data failed to delete.\''
                })
            })
    })
}
model.deleteDataSchedulebysubdistrict = ({ id_subdistrict }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.schedule where id_location in (select id_location from public.location where id_village in (select id_village from public.village where id_subdistrict = $1));', [id_subdistrict])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'schedule by subdistrict data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'schedule by subdistrict data failed to delete.\''
                })
            })
    })
}
model.deleteDataLocationbysubdistrict = ({ id_subdistrict }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.location where id_village in (select id_village from public.village where id_subdistrict = $1);', [id_subdistrict])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'location by subdistrict data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'location by subdistrict data failed to delete.\''
                })
            })
    })
}
model.deleteDataVillagebysubdistrict = ({ id_subdistrict }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.village where id_subdistrict = $1;', [id_subdistrict])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'village by subdistrict data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'village by subdistrict data failed to delete.\''
                })
            })
    })
}

model.deleteAllData = async ({ id_subdistrict }) => {
    try {
        const result_data = await model.getData(id_subdistrict)
        if (result_data.rowCount == 0) return ({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        await db.query('BEGIN')
        await model.deleteDataBookingbysubdistrict({ id_subdistrict })
        await model.deleteDataTimeSchedulebysubdistrict({ id_subdistrict })
        await model.deleteDataSchedulebysubdistrict({ id_subdistrict })
        await model.deleteDataLocationbysubdistrict({ id_subdistrict })
        await model.deleteDataVillagebysubdistrict({ id_subdistrict })
        const result = await model.deleteData({ id_subdistrict })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        return error
    }
}

module.exports = model