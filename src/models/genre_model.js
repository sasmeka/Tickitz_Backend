const db = require('../configs/database')
const model = {}

model.getAllData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.genre ORDER BY id_genre DESC;')
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.genre WHERE id_genre=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ name_genre }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.genre (name_genre) values ($1);', [name_genre])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "genre data successfully added."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "genre data failed to add.'"
                })
            })
    })
}

model.updateData = ({ id_genre, name_genre }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.genre SET name_genre=$2 where id_genre = $1;', [id_genre, name_genre])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "genre data successfully updated."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "genre data failed to update.'"
                })
            })
    })
}

model.deleteData = ({ id_genre }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.genre where id_genre=$1', [id_genre])
            .then(() => {
                resolve({
                    "code": "200",
                    "status": "OK",
                    "message": "genre data successfully deleted."
                })
            }).catch(() => {
                reject({
                    "code": "400",
                    "status": "Bad Request",
                    "message": "genre data failed to delete.'"
                })
            })
    })
}

module.exports = model