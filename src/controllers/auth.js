const control = {}
const model = require('../models/user_model')
const resp = require('../library/responses')

control.home = async (req, res) => {
    try {
        return resp(res, 200, 'WELCOME ! :)')
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.login = async (req, res) => {
    try {
        const { email, pass } = req.body
        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount == 0) throw 'e-mail not registered.'
        const result_email = result_user.rows[0].email
        const result_pass = result_user.rows[0].pass
        const result_status_verify = result_user.rows[0].status_verification
        if (result_status_verify != 1) throw 'account not verified.'
        if (email != result_email || pass != result_pass) throw 'e-mail and password do not match.'
        return resp(res, 200, 'login success.')
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.register = async (req, res) => {
    try {
        const { first_name, last_name, phone, email, pass } = req.body
        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount > 0) throw 'e-mail has been registered.'
        const result = await model.addData({ first_name, last_name, phone, email, pass })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.verification = async (req, res) => {
    try {
        const { email } = req.body
        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount == 0) throw 'e-mail not registered.'
        const result_email = result_user.rows[0].email
        const result_id = result_user.rows[0].id_user
        const result = await model.verification({ result_id, result_email })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

module.exports = control