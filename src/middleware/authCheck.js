const respone = require('../library/responses')
const jwt = require('jsonwebtoken')

const check = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return respone(res, 401, 'please login first.')
    }

    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, process.env.SECRET, (err, decode) => {
        if (err) {
            return respone(res, 401, err)
        }

        req.user = decode.data
        return next()
    })
}

module.exports = check