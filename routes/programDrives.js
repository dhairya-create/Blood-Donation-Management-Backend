const router = require('express').Router();
const programDrives = require('../models/programDrives.model');
const userDetails = require('../models/user.model');
const mail = require('nodemailer');
const supervisor = require('../models/supervisorDetails.model');
const mongoose = require('mongoose');

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


router.route('/add').post((req, res) => {
    const newDrive = new programDrives(req.body);
    newDrive.save()
        .then(() => res.json("Drive added"))
        .catch(err => res.status(400).json("error:" + err));
});

router.route('/all').get((req, res) => {
    programDrives.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => { console.log(err) })
});

router.route('/program-find').post((req, res) => {
    const name = `${req.body.name}.*`;
    console.log("Name=" + name);
    programDrives.find({ "programName": { $regex: name, $options: "i" } })
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => { console.log(err) })
});

router.route('/reject/:id').get((req, res) => {
    programDrives.findOne({ _id: req.params.id })
        .then((result) => {
            console.log(result.username)
            userDetails.findOne({ userName: result.username })
                .then((name) => {
                    console.log(name.email);
                    const mailOptions = {
                        from: process.env.EMAIL_ID,
                        to: name.email,
                        subject: "Blood Donation Project - Program Drive Status",
                        html: `
                  <body>
                  <h1>Rejected</h1>
                  <hr>
                  <h3>Your request is for arranging program drive is rejected due to some inconvinience. Try again later.</h3>
                  <hr>
                  <p>Regards,</p>
                  <p>Team Blood Bank Project </p>
                  </body>
                  `
                    }
                    transporter.sendMail(mailOptions).then(res1 => {
                        console.log("mail sent" + res1)
                        programDrives.deleteOne({ _id: req.params.id })
                            .then((resDel) => {
                                console.log(resDel);
                                console.log("Deleted successfully");
                                programDrives.find()
                                    .then((result) => {
                                        res.json(result);
                                    })
                                    .catch((err) => { console.log(err) })
                            })
                    })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => { console.log(err) })
        })
        .catch((err) => { console.log(err) })
});

router.route('/accept/:id').get((req, res) => {
    programDrives.findOne({ _id: req.params.id })
        .then((result) => {
            console.log(result);
            userDetails.findOne({ userName: result.username })
                .then((name) => {
                    console.log(name);
                    const mailOptions = {
                        from: process.env.EMAIL_ID,
                        to: name.email,
                        subject: "Blood Donation Project - Program Drive Status",
                        html: `
                              <body>
                              <h1>Accepted</h1>
                              <hr>
                              <h3>Your request is accepted. </h3>
                              <hr>
                              <p>Regards,</p>
                              <p>Team Blood Bank Project </p>
                              </body>
                              `
                    }
                    transporter.sendMail(mailOptions).then(res1 => {
                        console.log("mail sent" + res1)
                        programDrives.updateOne({ _id: req.params.id }, { isAccepted: true })
                            .then((row) => {
                                programDrives.find()
                                    .then((result) => {
                                        res.json(result);
                                    })
                                    .catch((err) => { console.log(err) })
                            })
                    })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => { console.log(err) })
        })
        .catch((err) => { console.log(err) })
});

router.route('/latest-drive').get((req, res) => {
    programDrives.find().sort({programDate:-1}).limit(1)
    .then((result) => {
        console.log(result[0]);
        res.json(result[0]);
    })
    .catch((err) => {console.log(err)})
});

module.exports = router;
