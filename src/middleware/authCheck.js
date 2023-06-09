const resp = require('../library/responses')
const jwt = require('jsonwebtoken')
const middleware = {}

middleware.all = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return resp(res, 401, 'please login first.')
    }

    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decode) => {
        if (err) {
            return resp(res, 401, err)
        }
        req.data_jwt = decode.data
        return next()
    })
}
// middleware.admin = (req, res, next) => {
//     const { authorization } = req.headers

//     if (!authorization) {
//         return resp(res, 401, 'please login first.')
//     }

//     const token = authorization.replace('Bearer ', '')
//     jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decode) => {
//         if (err) {
//             return resp(res, 401, err)
//         }
//         if (decode.data.role != 'admin') return resp(res, 401, 'your not an admin.')
//         req.data_jwt = decode.data
//         return next()
//     })
// }

module.exports = middleware.all