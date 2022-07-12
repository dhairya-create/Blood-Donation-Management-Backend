const router = require('express').Router();
const address =  require('../models/address.model');
const mongoose = require('mongoose');


router.route('/add').post((req,res)=>{
    const newAddress = new address(req.body);
    newAddress.save()
        .then(() => res.json("Address added"))
        .catch(err => res.status(400).json("error:"+err));
});

router.route('/all').get((req, res) => {
    address.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

module.exports = router;
