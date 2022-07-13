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

router.route('/stock-find').post((req,res)=>{
    const name = `${req.body.name}.*`;
    console.log("Name="+name);
    prerequesites.find({"stockName":{$regex: name, $options:"i"}})
    .then((result) => {
        console.log(result);
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

module.exports = router;
