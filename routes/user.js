const router = require('express').Router();
const userDetails =  require('../models/user.model');
const donorDetails = require('../models/donor.model');
const donationDetails = require('../models/donationDetails.model')
const recipientDetails = require('../models/recipient.model')
const mongoose = require('mongoose');


//user routes
router.route('/add').post((req,res)=>{
    const newUser = new userDetails(req.body);
    newUser.save()
        .then(() => res.json("User added"))
        .catch(err => res.status(400).json("error:"+err));
});

router.route('/all').get((req, res) => {
    userDetails.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

//donor routes
router.route('/donor-add').post((req,res)=>{
    const newDonor = new donorDetails(req.body);
    newDonor.save()
        .then(() => res.json("Donor added"))
        .catch(err => res.status(400).json("error:"+err));
});

router.route('/donor-all').get((req, res) => {
    donorDetails.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

//donation routes
router.route('/donation-add').post((req,res)=>{
    console.log("called");

    const newDonation = new donationDetails({username:req.body.username,date:req.body.appointmentDate});
    newDonation.save()
        .then(() => {
            console.log("added");
        })
        .catch(err => res.status(400).json("error:"+err));
});

router.route('/donation-all').get((req, res) => {
    donationDetails.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

//recipient routes
router.route('/recipient-add').post((req,res)=>{
    const newRecipient = new recipientDetails(req.body);
    newRecipient.save()
        .then(() => res.json("Recipient Details added"))
        .catch(err => res.status(400).json("error:"+err));
});

router.route('/recipient-all').get((req, res) => {
    recipientDetails.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

module.exports = router;
