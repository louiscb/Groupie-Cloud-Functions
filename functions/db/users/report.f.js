// // send group get related active group if any
// HTTP Request from app
//
// function Report (UserId) do
//   sendEmailToUs(UserID has been reported)
// end
const functions = require('firebase-functions');
const admin = require('../../admin');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

exports = module.exports = functions.https.onRequest((req, res) => {
    let userId = req.body.userId;

    const mail = {
        from: '"Groupie-Admin." <groupiekth@gmail.com>',
        to: 'louiscameronb@gmail.com',
        subject: 'User: ' + userId + ' has been reported',
        text: 'User has been reported.'
    };

    return mailTransport.sendMail(mail).then((snapshot) => {
        return res.send('successfly reported user');
    }).catch((error) => {
        return res.statusCode(301).send('error: could not report user')
    });
});