const db = require('../configs/database')
const model = {}

model.getAllData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.province ORDER BY id_province DESC;')
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.province WHERE id_province=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ name_province }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.province (name_province) values ($1);', [name_province])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "province data successfully added."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "province data failed to add.'"
                })
            })
    })
}

model.updateData = ({ id_province, name_province }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.province SET name_province=$2 where id_province = $1;', [id_province, name_province])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "province data successfully updated."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "province data failed to update.'"
                })
            })
    })
}

model.deleteData = ({ id_province }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.province where id_province=$1', [id_province])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "province data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "province data failed to delete.'"
                })
            })
    })
}
model.deleteDataBookingbyProvince = ({ id_province }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_time_schedule in (select id_time_schedule from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location in (select id_location from public.location where id_village in (select id_village from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency in (select id_regency from public.regency where id_province = $1))))));', [id_province])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "booking by province data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "booking by province data failed to delete.'"
                })
            })
    })
}
model.deleteDataTimeSchedulebyProvince = ({ id_province }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location in (select id_location from public.location where id_village in (select id_village from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency in (select id_regency from public.regency where id_province = $1)))));', [id_province])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "time schedule by province data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "time schedule by province data failed to delete.'"
                })
            })
    })
}
model.deleteDataSchedulebyProvince = ({ id_province }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.schedule where id_location in (select id_location from public.location where id_village in (select id_village from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency in (select id_regency from public.regency where id_province = $1))));', [id_province])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "schedule by province data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "schedule by province data failed to delete.'"
                })
            })
    })
}
model.deleteDataLocationbyProvince = ({ id_province }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.location where id_village in (select id_village from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency in (select id_regency from public.regency where id_province = $1)));', [id_province])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "location by province data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "location by province data failed to delete.'"
                })
            })
    })
}
model.deleteDataVillagebyProvince = ({ id_province }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency in (select id_regency from public.regency where id_province = $1));', [id_province])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "village by province data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "village by province data failed to delete.'"
                })
            })
    })
}
model.deleteDataSubdistrictbyProvince = ({ id_province }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.subdistrict where id_regency in (select id_regency from public.regency where id_province = $1);', [id_province])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "subdistrict by province data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "subdistrict by province data failed to delete.'"
                })
            })
    })
}
model.deleteDataRegencybyProvince = ({ id_province }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.regency where id_province = $1;', [id_province])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "regency by province data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "regency by province data failed to delete.'"
                })
            })
    })
}

module.exports = model