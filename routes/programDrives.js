const router = require('express').Router();
const programDrives =  require('../models/programDrives.model');
const supervisor = require('../models/supervisorDetails.model');
const mongoose = require('mongoose');


router.route('/add').post((req,res)=>{
    const newDrive = new programDrives(req.body);
    newDrive.save()
        .then(() => res.json("Drive added"))
        .catch(err => res.status(400).json("error:"+err));
});

router.route('/all').get((req, res) => {
    programDrives.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

router.route('/program-find').post((req,res)=>{
    const name = `${req.body.name}.*`;
    console.log("Name="+name);
    programDrives.find({"programName":{$regex: name, $options:"i"}})
    .then((result) => {
        console.log(result);
        res.json(result);
    })
    .catch((err) => {console.log(err)})
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
