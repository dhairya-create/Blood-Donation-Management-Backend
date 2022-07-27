const router = require('express').Router();
const prerequesites =  require('../models/prerequisites.model');
const mongoose = require('mongoose');


router.route('/add').post((req,res)=>{
    const newStock = new prerequesites({stockName:req.body.sName,quantity:req.body.qty});
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

router.route('/stock-count').get((req, res) => {
    let arr = [];
    prerequesites.find({
        $expr: {
            "$lt": ["$quantity",10]
        }
    })
        .then((result) => {
            console.log(result);
            res.json(result);
        })
});


router.route('/update/:name/:newName/:newQty').put((req, res) => {
    prerequesites.updateOne({stockName : req.params.name}, {stockName:req.params.newName,quantity:req.params.newQty})
    .then((result) => {
        console.log(result);
        res.json(result)
    })
    .catch((err) => { console.log(err) })
})

module.exports = router;
