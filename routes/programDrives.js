const router = require('express').Router();
const programDrives =  require('../models/programDrives.model');
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

module.exports = router;