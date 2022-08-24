const router = require('express').Router();
const wallet = require('../models/wallet.model');
let Wallet = require('../models/wallet.model');

// router.route('/get_wallet').post((req,res)=> {
//     Wallet.findById(req.params.id)
//     .then(wallet=>res.json(wallet))
//     .catch(err=>res.status(400).json('Error' + err));
// });

router.route('/add_amount').post((req, res) => {
    const wallet = new Wallet(req.body)
    wallet.save()
    .then((result) => {
        res.json('Money added to user wallet')
    })
});

router.route('/:userName').get((req,res)=> {
    Wallet.findOne({userName:req.params.userName})
   .then(wallet=>{res.json(wallet)})
   .catch(err=>res.status(400).json('Error' + err));
});

router.route('/updateWallet/:userName').put(function(req,res){
    Wallet.findOneAndUpdate({userName:req.params.userName},{"amount": req.body.amount},{new: true})
    .then(wallet=>res.json(wallet))
    .catch(err=>res.status(400).json('Error' + err));
})

router.route('/deleteWallet/:userName').delete((req,res)=> {
    Wallet.findByIdAndRemove(req.params.userName)
   .then(wallet=>res.json(wallet))
   .catch(err=>res.status(400).json('Error' + err));
});

module.exports = router;