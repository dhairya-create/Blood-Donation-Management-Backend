const router = require('express').Router();
const bloodBottle =  require('../models/bloodBottles.model');
const donation = require('../models/donationDetails.model');
const mongoose = require('mongoose');


router.route('/add').post((req,res)=>{
    const newBB = new bloodBottle(req.body);
    newBB.save()
        .then(() => res.json("Bottle added"))
        .catch(err => res.status(400).json("error:"+err));
});

router.route('/all').get((req, res) => {
    bloodBottle.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

router.route('/blood-find').post((req,res)=>{
    bloodBottle.find({"bloodGroup":req.body.blood})
    .then((result) => {
        console.log(result);
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

router.route('/mark').put((req, res) => {
    const arr = [];
    const curr_date = new Date();
    bloodBottle.find()
    .then((result) => {
        result.forEach(obj=>{
            donation.findOne({bloodBottleId:obj._id})
            .then((data)=>{
                if(data!=null){
                    const one_day = 1000*60*60*24;
                    const diff = curr_date.getTime() - data.date.getTime();  
                    const days = Math.round(diff/one_day);
                    console.log(days);
                    if(days >= 45)
                        bloodBottle.updateOne({_id:data.bloodBottleId},{isExpired:true})
                        .then((val)=>{
                            console.log(val);
                            res.json(val);
                        });
                }
            });
        })
    })
    .catch((err) => {console.log(err)})
});

module.exports = router;
