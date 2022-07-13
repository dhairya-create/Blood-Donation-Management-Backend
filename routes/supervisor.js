const router = require('express').Router();
const supervisorDetails =  require('../models/supervisorDetails.model');
const mongoose = require('mongoose');


router.route('/add').post((req,res)=>{
    const newSupervisor = new supervisorDetails(req.body);
    newSupervisor.save()
        .then(() => res.json("Supervisor added"))
        .catch(err => res.status(400).json("error:"+err));
});

router.route('/all').post((req, res) => { 
    //console.log(req.params.contactNumber);
    supervisorDetails.findOne({contactNumber:req.body.contactNumber})
    .then((result) => {
        console.log(result);
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

module.exports = router;
