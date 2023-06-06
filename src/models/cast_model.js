const db = require('../configs/database')
const model = {}

model.getAllData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.casts ORDER BY id_cast DESC;')
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.casts WHERE id_cast=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ name_cast }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.casts (name_cast) values ($1);', [name_cast])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'cast data successfully added.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'cast data failed to add.\''
                })
            })
    })
}

model.updateData = ({ id_cast, name_cast }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.casts SET name_cast=$2 where id_cast = $1;', [id_cast, name_cast])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'cast data successfully updated.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'cast data failed to update.\''
                })
            })
    })
}

model.deleteData = ({ id_cast }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.casts where id_cast=$1', [id_cast])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'cast data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'cast data failed to delete.'
                })
            })
    })
}

module.exports = model