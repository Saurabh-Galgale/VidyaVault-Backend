const nodemailer = require("nodemailer");
const ejs = require('ejs');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const sendEmail = (receiver, subject, content) => {
    ejs.renderFile(__dirname + '/../views/Reset.ejs', { receiver, content }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var mailOptions = {
                from: process.env.EMAIL_USER,
                to: receiver,
                subject: subject,
                html: data,
                attachments: [{
                    filename: 'darklogo.png',
                    path: __dirname + '/../views/darklogo.png',
                    cid: 'logo'
                }],
                tls:{
                    rejectUnAuthorized:true
                }
            };

            console.log("receiver", receiver);
            console.log("content", content);

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info);
            });
        }
    });
};

module.exports = { sendEmail };