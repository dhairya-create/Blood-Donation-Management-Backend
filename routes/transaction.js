const router = require('express').Router();
const transaction=  require('../models/transaction.model');
const mongoose = require('mongoose');


router.route('/add').post((req,res)=>{
    const newTransaction = new transaction(req.body);
    newTransaction.save()
        .then(() => res.json("Transaction Recorded"))
        .catch(err => res.status(400).json("error:"+err));
});

router.route('/all').get((req, res) => {
    transaction.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

module.exports = router;
