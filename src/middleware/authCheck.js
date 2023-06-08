const resp = require('../library/responses')
const jwt = require('jsonwebtoken')

const check = (req, res, next) => {
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

module.exports = check