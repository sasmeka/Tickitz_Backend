const control = {}
const model = require('../models/user_model')

control.home = async (req, res) => {
    try {
        return res.send({
            "code": "200",
            "status": "OK",
            "message": "WELCOME ! :)"
        })
    } catch (e) {
        return res.send(e)
    }
}

control.login = async (req, res) => {
    try {
        const { email, pass } = req.body
        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount == 0) throw {
            "code": "400",
            "status": "Bad Request",
            "message": "e-mail not registered."
        }
        const result_email = result_user.rows[0].email
        const result_pass = result_user.rows[0].pass
        const result_status_verify = result_user.rows[0].status_verification
        if (result_status_verify != 1) throw {
            "code": "400",
            "status": "Bad Request",
            "message": "account not verified."
        }
        if (email != result_email && pass != result_pass) throw {
            "code": "400",
            "status": "Bad Request",
            "message": "e-mail and password do not match."
        }
        return res.send({
            "code": "200",
            "status": "OK",
            "message": "login success."
        })
    } catch (e) {
        return res.send(e)
    }
}

control.register = async (req, res) => {
    try {
        const { first_name, last_name, phone, email, pass } = req.body
        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount > 0) throw {
            "code": "400",
            "status": "Bad Request",
            "message": "e-mail has been registered."
        }
        const result = await model.addData({ first_name, last_name, phone, email, pass })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

control.verification = async (req, res) => {
    try {
        const { email } = req.body
        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount == 0) throw {
            "code": "400",
            "status": "Bad Request",
            "message": "e-mail not registered."
        }
        const result_email = result_user.rows[0].email
        const result_id = result_user.rows[0].id_user
        const result = await model.verification({ result_id, result_email })
        return res.send(result)
    } catch (e) {
        return res.send(e)
    }
}

module.exports = control