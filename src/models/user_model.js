const db = require('../configs/database')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.users ORDER BY id_user DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.users WHERE id_user=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getDatabyEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.users WHERE email=$1 limit 1;', [email])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ first_name, last_name, phone, email, pass }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.users (first_name, last_name, phone, email, pass, status_verification) values ($1,$2,$3,$4,$5,0);', [first_name, last_name, phone, email, pass])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'account has been registered, please verify.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'account verification failed.'
                })
            })
    })
}

model.updateData = ({ id_user, first_name, last_name, phone, email, pass, status_verification }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.users SET first_name=$2, last_name=$3, phone=$4, email=$5, pass=$6, status_verification=$7 where id_user = $1;', [id_user, first_name, last_name, phone, email, pass, status_verification])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'user data successfully updated.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'user data failed to update.'
                })
            })
    })
}

model.verification = ({ id_user, email }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.users SET status_verification=1 where id_user = $1 and email=$2;', [id_user, email])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'verified account successfully.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'verified account failed.'
                })
            })
    })
}

model.deleteData = ({ id_user }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.users where id_user=$1', [id_user])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'user data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'user data failed to delete.'
                })
            })
    })
}

model.deleteDataBookingbyUser = ({ id_user }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_user=$1', [id_user])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'booking by user data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'booking by user data failed to delete.'
                })
            })
    })
}

model.deleteAllData = async ({ id_user }) => {
    try {
        const result_data = await model.getData(id_user)
        if (result_data.rowCount == 0) return ({
            'code': '404',
            'status': 'Not Found',
            'message': 'data not found.'
        })
        await db.query('BEGIN')
        await model.deleteDataBookingbyUser({ id_user })
        const result = await model.deleteData({ id_user })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        return error
    }
}

module.exports = model