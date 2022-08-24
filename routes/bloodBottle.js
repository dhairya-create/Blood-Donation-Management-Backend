const router = require('express').Router();
const bloodBottle =  require('../models/bloodBottles.model');
const donation = require('../models/donationDetails.model');
const recipient = require('../models/recipient.model');
const mongoose = require('mongoose');


router.route('/add').post((req,res)=>{
    console.log("ADD");
    const newBB = new bloodBottle(req.body);
    newBB.save()
        .then((bottle) => res.json(bottle))
        .catch(err => res.status(400).json("error:"+err));
});

router.route('/all').get((req, res) => {
    bloodBottle.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

router.route('/total-donations').get((req, res) => {
    const curr_year = new Date().getFullYear();
    donationDetails.find({
        $expr: {
            "$lt": [ ,curr_year]
        }
    })
        .then((result) => {
            var size = Object.keys(result);
            res.json(size.length);
        })
});

router.route('/bottle-count').get((req, res) => {
    bloodBottle.aggregate([
        {
            $match:
            {
                $and:
                [
                    {'isExpired':false},
                    {'recipientId':null}
                ]
            }
        },
        {
            $group : {_id:"$bloodGroup", count:{$sum:1}}
        }
    ])
        .then((result) => {
            var arr = new Array(8).fill(0);
            //console.log(result);
            result.forEach(obj=>{
                const id = obj._id;
                if(id == "A+"){
                    arr[0] = obj.count;
                }
                else if(id == "A-"){
                    arr[1] = obj.count;
                }
                else if(id == "B+"){
                    arr[2] = obj.count;
                }
                else if(id == "B-"){
                    arr[3] = obj.count;
                }
                else if(id == "O+"){
                    arr[4] = obj.count;
                }
                else if(id == "O-"){
                    arr[5] = obj.count;
                }
                else if(id == "AB+"){
                    arr[6] = obj.count;
                }
                else if(id == "AB-"){
                    arr[7] = obj.count;
                }
            })
            console.log("done");
            for(let i = 0;i<8;i++){
                console.log(arr[i]);
            }
            res.json(arr);
        })
});

router.route('/bottles-sold').get((req, res) => {
    const curr_year = new Date().getFullYear();
    recipient.aggregate([{
        $group: { _id: { year: { $year: "$supplyDate" } }, total: { $sum: "$quantity" } }
    }])
        .then((result) => {
            console.log(result);
            result.forEach(obj=>{
                if(obj._id.year == curr_year){
                    res.json(obj.total);
                }
            })
        })
        .catch((err) => {
            console.log("error " + err)
        })
})

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
