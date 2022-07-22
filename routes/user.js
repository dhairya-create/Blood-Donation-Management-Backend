const router = require('express').Router();
const userDetails = require('../models/user.model');
const donorDetails = require('../models/donor.model');
const donationDetails = require('../models/donationDetails.model')
const recipientDetails = require('../models/recipient.model')
const mongoose = require('mongoose');

//jenish
const Token = require('../models/token.model');
const crypto = require("crypto");
const mail = require('nodemailer');
require("dotenv/config")
const wallet = require('../models/wallet.model')

//bcrypt
const bcrypt = require('bcryptjs')

//responses
const responses = require("../utils/responses")

//validations
const validation = require('../validations/register.validation');
const { json } = require('express');


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


//user routes
// router.route('/add').post((req, res) => {
//     const newUser = new userDetails(req.body);
//     newUser.save()
//         .then(() => res.json("User added"))
//         .catch(err => res.status(400).json("error:" + err));
// });

router.route('/all').get((req, res) => {
    userDetails.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => { console.log(err) })
});

router.route('/delete/:username').delete((req, res) => {
    console.log("Username=" + req.params.username);
    userDetails.deleteOne({ username: req.params.username })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => { console.log(err) })
});

router.route('/user-find').post((req, res) => {
    const name = `${req.body.name}.*`;
    console.log("Name=" + name);
    userDetails.find({ "username": { $regex: name, $options: "i" } })
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => { console.log(err) })
});

//donor routes
router.route('/donor-add').post((req, res) => {
    const newDonor = new donorDetails(req.body);
    newDonor.save()
        .then(() => res.json("Donor added"))
        .catch(err => res.status(400).json("error:" + err));
});

router.route('/donor-find').post((req, res) => {
    const name = `${req.body.name}.*`;
    console.log("Name=" + name);
    donorDetails.find({ "username": { $regex: name, $options: "i" } })
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => { console.log(err) })
});

router.route('/donor-all').get((req, res) => {
    donorDetails.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => { console.log(err) })
});

//donation routes
router.route('/donation-add').post((req, res) => {
    console.log("called");

    const newDonation = new donationDetails({ username: req.body.username, date: req.body.appointmentDate });
    newDonation.save()
        .then(() => {
            console.log("added");
        })
        .catch(err => res.status(400).json("error:" + err));
});

//total donations in current year
router.route('/total-donations').get((req, res) => {
    const curr_year = new Date().getFullYear();
    donationDetails.find({
        $expr: {
            "$eq": [
                {
                    "$year": "$date"
                },
                curr_year
            ]
        }
    })
        .then((result) => {
            var size = Object.keys(result);
            res.json(size.length);
        })
});

router.route('/donation-all').get((req, res) => {
    donationDetails.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => { console.log(err) })
});

router.route('/donation-find').post((req, res) => {
    const name = `${req.body.name}.*`;
    console.log("Name=" + name);
    donationDetails.find({ "username": { $regex: name, $options: "i" } })
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => { console.log(err) })
});

//recipient routes
router.route('/recipient-add').post((req, res) => {
    const newRecipient = new recipientDetails(req.body);
    newRecipient.save()
        .then(() => res.json("Recipient Details added"))
        .catch(err => res.status(400).json("error:" + err));
});

router.route('/recipient-all').get((req, res) => {
    recipientDetails.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => { console.log(err) })
});

router.route('/recipient-find').post((req, res) => {
    const name = `${req.body.name}.*`;
    console.log("Name=" + name);
    recipientDetails.find({ "username": { $regex: name, $options: "i" } })
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => { console.log(err) })
});

//jenish
router.route('/register').post(async (req, res) => {
    try {
        let validate = await validation(req.body);
        console.log(req.body.contactNumber);
        if (validate.error) {
            return responses.badRequestResponse(
                res,
                validate.error.details[0].message
            );
        }
        console.log(req.body.name);
        let user = await userDetails.findOne({
            userName: req.body.userName
        })
        console.log(req.body.address);
        if (user) {
            return responses.badRequestResponse(res, { err: "User Already exists." })
        }
        console.log(req.body.name);
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash_password;
        console.log(req.body.password);

        let new_user = await userDetails.create(req.body)
        if (!new_user) {
            console.log("Hello");
            return responses.serverErrorResponse(res, "Error while creating user.")
        }


        console.log("user---" + new_user);
        const userName = new_user.userName;
        const token = await Token.findOne({ userName: new_user.userName });
        if (token) {
            await token.deleteOne()
        };
        let resetToken = crypto.randomBytes(32).toString("hex");
        console.log(resetToken);
        await new Token({
            userName: userName,
            token: resetToken,
            createdAt: Date.now(),
        }).save();

        const link = `https://localhost:4000/user/verify-account/${resetToken}/${userName}`;


        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: new_user.email,
            subject: "Blood Donation Project - Verify Email To Continue",
            html: `
          <body>
          <h1>Verify Your Email </h1>
          <hr>
          <h3>Important: This link will be valid for only 1 Hour! </h3>
          <p> Click <a href=${link}>here</a> to verify your account. </p>
          <hr>
          <p>Regards,</p>
          <p>Team Blood Bank Project </p>
          </body>
          `
        }
        transporter.sendMail(mailOptions).then(res => {
            console.log("mail sent" + res)
        })
            .catch((err) => {
                console.log(err);
            });
        console.log("hello");
        return responses.successfullyCreatedResponse(res, new_user)

    } catch (error) {
        return responses.serverErrorResponse(res)
    }
});

router.route('/verify-account/:token/:userName').get(async (req, res) => {
    const token = await Token.findOne({ token: req.params.token })
    if (token) {
        const user = await userDetails.findOne({ userName: req.params.userName })
        if (user) {
            const update = await userDetails.updateOne({ userName: req.params.userName }, { isVerified: true })
            if (update) {
                // const wallet1=await (await wallet).create;
                // wallet1.userId=(req.params.userid);
                // wallet1.amount=0;
                const wallet1 = new wallet({ "userName": req.params.userName, "amount": 0 })
                wallet1.save()
                    .then((result) => {
                        res.json("Wallet Added")
                    })
            }
            else {
                res.json("error verifying account")
            }
        }
    }
})

router

module.exports = router;
