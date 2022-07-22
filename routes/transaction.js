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

//get total revenue for current year
router.route('/revenue').get((req, res) => {
    const arr = [];
    const curr_year = new Date().getFullYear();
    transaction.aggregate([{
        $group: { _id: { year: { $year: "$transactionDate" }, month:{ $month:"$transactionDate"} }, total: { $sum: "$amount" } }
    }])
        .then((result) => {
            console.log(result);
            result.forEach(obj=>{
                if(obj._id.year == curr_year){
                    arr[obj._id.month] = obj.total;
                }
            })
            for(let i=1;i<=12;i++){
                if(!arr[i])
                {
                    arr[i] = 0;
                }
                console.log(arr[i]);
            }
            res.json(arr);
            // result.forEach(obj => {
            //     if (obj._id.year == curr_year) {
            //         res.json(obj.total);
            //     }
            // })

        })
        .catch((err) => {
            console.log("error " + err)
        })
})

module.exports = router;
