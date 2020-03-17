const User = require('../models/Credential_Entity.model')
var UserR= require('express').Router();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

UserR.use(cors())

UserR.post('/register', (req, res) => {
    const CredentialData = {
        email: req.body.email,
        password: req.body.password,
        owner: req.body.owner,
        usage_plan: req.body.usage_plan,
        API_key: req.body.API_key
    }

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    CredentialData.password = hash
                    User.create(CredentialData)
                        .then(user => {
                            res.json({ status: user.email + '  Registered!' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})


UserR.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    // Passwords match
                    const payload = {
                        _id: user._id,
                        email: user.email,
                        owner: user.owner,
                        usage_plan: user.usage_plan,
                        API_key: user.API_key
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {

                    res.json({ error: 'User does not exist' })
                }
            } else {
                res.json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

UserR.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        _id: decoded._id
    })
        .then(User => {
            if (User) {
                res.json(User)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})


// users.post('/reset-password', function (req, res) {
//     const email = req.body.email
//     User
//         .findOne({
//             where: {email: email},//checking if the email address sent by client is present in the db(valid)
//         })
//         .then(function (user) {
//             if (!user) {
//                 return throwFailed(res, 'No user found with that email address.')
//             }
//             ResetPassword
//                 .findOne({
//                     where: {userId: user.id, status: 0},
//                 }).then(function (resetPassword) {
//                 if (resetPassword)
//                     resetPassword.destroy({
//                         where: {
//                             id: resetPassword.id
//                         }
//                     })
//                 token = crypto.randomBytes(32).toString('hex')//creating the token to be sent to the forgot password form (react)
//                 bcrypt.hash(token, null, null, function (err, hash) {//hashing the password to store in the db node.js
//                     ResetPassword.create({
//                         userId: user.id,
//                         resetPasswordToken: hash,
//                         expire: moment.utc().add(config.tokenExpiry, 'seconds'),
//                     }).then(function (item) {
//                         if (!item)
//                             return throwFailed(res, 'Oops problem in creating new password record')
//                         let mailOptions = {
//                             from: '"<jyothi pitta>" jyothi.pitta@ktree.us',
//                             to: user.email,
//                             subject: 'Reset your account password',
//                             html: '<h4><b>Reset Password</b></h4>' +
//                             '<p>To reset your password, complete this form:</p>' +
//                             '<a href=' + config.clientUrl + 'reset/' + user.id + '/' + token + '">' + config.clientUrl + 'reset/' + user.id + '/' + token + '</a>' +
//                             '<br><br>' +
//                             '<p>--Team</p>'
//                         }
//                         let mailSent = sendMail(mailOptions)//sending mail to the user where he can reset password.User id and the token generated are sent as params in a link
//                         if (mailSent) {
//                             return res.json({success: true, message: 'Check your mail to reset your password.'})
//                         } else {
//                             return throwFailed(error, 'Unable to send email.');
//                         }
//                     })
//                 })
//             });
//         })
//  })
 

module.exports = UserR;