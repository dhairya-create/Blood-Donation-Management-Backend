const router = require('express').Router();
const user = require('../models/user.model');
const mail = require('nodemailer');
var rn = require('random-number');

let transporter = mail.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS
    }
})

transporter.verify((err, success) => {
    if (err) {
        console.log(err);
    }
})


router.route('/checkmail').post((req, res) => {


    user.findOne({ userName: req.body.username })
                .then((name) => {
                    console.log(name);
                    var options = {
                        min: 1000,
                        max: 9999,
                        integer: true
                      }
                      let otp = rn(options)
                    const mailOptions = {
                        from: process.env.EMAIL_ID,
                        to: name.email,
                        subject: "Email Check",
                        html: `
                              <body>
                              <h1>OTP:${otp}</h1>
                              <p>Team Blood Bank Project </p>
                              </body>
                              `
                    }
                    transporter.sendMail(mailOptions).then(res1 => {
                        console.log("mail sent" + res1)
                        res.json(otp)
                    })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => { console.log(err) })

})

module.exports=router;
