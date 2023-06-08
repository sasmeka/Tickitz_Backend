const control = {}
const bcrypt = require('bcrypt');
const jwebt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const model = require('../models/user_model')
const resp = require('../library/responses')
const jwt = require('../library/jwt')
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
        if (result_user.rowCount == 0) return resp(res, 401, 'e-mail not registered.')
        const result_pass = result_user.rows[0].pass
        const result_status_verify = result_user.rows[0].status_verification
        if (result_status_verify != 1) return resp(res, 401, 'account not verified.')
        const status = await bcrypt.compare(pass, result_pass)
        if (status == true) {
            const token = jwt({
                "email": email,
                "id_user": result_user.rows[0].id_user,
                "role": result_user.rows[0].role
            })

            return resp(res, 200, { "message": 'login success.', "Token": token })
        } else {
            return resp(res, 401, 'wrong password')
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
        if (result_user.rowCount > 0) return resp(res, 401, 'e-mail has been registered.')
        const result = await model.addData({ first_name, last_name, phone, email, pass_hash })
        const code_rand = jwt(email)
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
            text: process.env.base_url + `/verification?token=${code_rand}`
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
        const token = req.query.token
        let email = ''
        jwebt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decode) => {
            if (err) {
                return resp(res, 401, err)
            }
            email = decode.data
        })
        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount == 0) return resp(res, 401, 'e-mail not registered.')
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