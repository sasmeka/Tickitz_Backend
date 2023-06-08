const jwt = require('jsonwebtoken')

const genToken = (data) => {
    const payload = {
        data: data
    }

    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME })
    return token
}

module.exports = genToken