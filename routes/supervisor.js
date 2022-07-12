const router = require('express').Router();
const supervisorDetails =  require('../models/supervisorDetails.model');
const mongoose = require('mongoose');


router.route('/add').post((req,res)=>{
    const newSupervisor = new supervisorDetails(req.body);
    newSupervisor.save()
        .then(() => res.json("Supervisor added"))
        .catch(err => res.status(400).json("error:"+err));
});

router.route('/all').get((req, res) => {
    supervisorDetails.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

module.exports = router;
