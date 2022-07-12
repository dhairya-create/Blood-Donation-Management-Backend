const router = require('express').Router();
const bloodBottle =  require('../models/bloodBottles.model');
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

module.exports = router;
