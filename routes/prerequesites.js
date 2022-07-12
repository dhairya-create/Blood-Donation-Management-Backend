const router = require('express').Router();
const prerequesites =  require('../models/prerequisites.model');
const mongoose = require('mongoose');


router.route('/add').post((req,res)=>{
    const newStock = new prerequesites(req.body);
    newStock.save()
        .then(() => res.json("Stock added"))
        .catch(err => res.status(400).json("error:"+err));
});

router.route('/all').get((req, res) => {
    prerequesites.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

module.exports = router;
