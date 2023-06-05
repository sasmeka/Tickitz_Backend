const db = require('../configs/database')
const model = {}

model.getAllData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.director ORDER BY id_director DESC;')
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.director WHERE id_director=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ name_director }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.director (name_director) values ($1);', [name_director])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "director data successfully added."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "director data failed to add.'"
                })
            })
    })
}

model.updateData = ({ id_director, name_director }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.director SET name_director=$2 where id_director = $1;', [id_director, name_director])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "director data successfully updated."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "director data failed to update.'"
                })
            })
    })
}

model.deleteData = ({ id_director }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.director where id_director=$1', [id_director])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "director data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "director data failed to delete.'"
                })
            })
    })
}

module.exports = model