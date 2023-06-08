const control = {}
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const model = require('../models/user_model')
const resp = require('../library/responses')
const hashing = require('../library/hashing')

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
        const result_pass = result_user.rows[0].pass
        const result_status_verify = result_user.rows[0].status_verification
        if (result_status_verify != 1) throw 'account not verified.'
        const status = await bcrypt.compare(pass, result_pass)
        if (status == true) {
            return resp(res, 200, 'login success.')
        } else {
            throw 'wrong password'
        }
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.register = async (req, res) => {
    try {
        const { first_name, last_name, phone, email, pass } = req.body
        const pass_hash = await hashing(pass)
        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount > 0) throw 'e-mail has been registered.'
        const result = await model.addData({ first_name, last_name, phone, email, pass_hash })
        let new_id = await model.newIdData()
        new_id = new_id.rows[0].new_id_user
        const code_rand = await hashing(email)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.guser,
                pass: process.env.gpass
            }
        });

        const mailOptions = {
            from: process.env.guser,
            to: 'sasmekaa@gmail.com',
            subject: 'Tickitz Verification',
            text: process.env.base_url + `/verification?code=${new_id}&code_rand=${code_rand}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.verification = async (req, res) => {
    try {
        const { code, code_rand } = req.query
        const result_user = await model.getData(code)
        if (result_user.rowCount == 0) throw 'e-mail not registered.'
        const result_email = result_user.rows[0].email
        const result_id = code
        const check = await bcrypt.compare(result_email, code_rand)
        if (check == false) throw 'verfication failed.'
        const result = await model.verification({ result_id, result_email })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

module.exports = control