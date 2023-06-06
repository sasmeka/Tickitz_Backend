const db = require('../configs/database')
const model = {}

model.getAllData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.regency ORDER BY id_regency DESC;')
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.regency WHERE id_regency=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ name_regency, id_province }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.regency (name_regency, id_province) values ($1,$2);', [name_regency, id_province])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'regency data successfully added.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'regency data failed to add.\''
                })
            })
    })
}

model.updateData = ({ id_regency, name_regency, id_province }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.regency SET name_regency=$2, id_province=$3 where id_regency = $1;', [id_regency, name_regency, id_province])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'regency data successfully updated.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'regency data failed to update.\''
                })
            })
    })
}

model.deleteData = ({ id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.regency where id_regency=$1', [id_regency])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'regency data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'regency data failed to delete.\''
                })
            })
    })
}

model.deleteDataBookingbyregency = ({ id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_time_schedule in (select id_time_schedule from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location in (select id_location from public.location where id_village in (select id_village from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency = $1)))));', [id_regency])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'booking by regency data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'booking by regency data failed to delete.\''
                })
            })
    })
}
model.deleteDataTimeSchedulebyregency = ({ id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location in (select id_location from public.location where id_village in (select id_village from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency = $1))));', [id_regency])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'time schedule by regency data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'time schedule by regency data failed to delete.\''
                })
            })
    })
}
model.deleteDataSchedulebyregency = ({ id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.schedule where id_location in (select id_location from public.location where id_village in (select id_village from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency = $1)));', [id_regency])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'schedule by regency data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'schedule by regency data failed to delete.\''
                })
            })
    })
}
model.deleteDataLocationbyregency = ({ id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.location where id_village in (select id_village from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency = $1));', [id_regency])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'location by regency data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'location by regency data failed to delete.\''
                })
            })
    })
}
model.deleteDataVillagebyregency = ({ id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency = $1);', [id_regency])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'village by regency data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'village by regency data failed to delete.\''
                })
            })
    })
}
model.deleteDataSubdistrictbyregency = ({ id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.subdistrict where id_regency = $1;', [id_regency])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'subdistrict by regency data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'subdistrict by regency data failed to delete.\''
                })
            })
    })
}
model.deleteAllData = async ({ id_regency }) => {
    try {
        const result_data = await model.getData(id_regency)
        if (result_data.rowCount == 0) return ({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        await db.query('BEGIN')
        await model.deleteDataBookingbyregency({ id_regency })
        await model.deleteDataTimeSchedulebyregency({ id_regency })
        await model.deleteDataSchedulebyregency({ id_regency })
        await model.deleteDataLocationbyregency({ id_regency })
        await model.deleteDataVillagebyregency({ id_regency })
        await model.deleteDataSubdistrictbyregency({ id_regency })
        const result = await model.deleteData({ id_regency })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        return error
    }
}

module.exports = model