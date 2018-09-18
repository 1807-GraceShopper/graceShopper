'use strict'
const nodemailer = require('nodemailer')
const config = require('../secrets')
nodemailer.createTestAccount(err => {
  if (err) {
    return console.log(err)
  }
})
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // user: process.env.EMAIL_USERID,
    // pass: process.env.EMAIL_PASSWORD
    user: config.emailUser,
    pass: config.emailPassword
  }
})

function sendMail(mailOptions) {
  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    } else {
      console.log(info)
    }
  })
}

module.exports = sendMail
