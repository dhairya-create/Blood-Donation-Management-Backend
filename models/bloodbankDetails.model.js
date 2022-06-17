const mongoose = require("mongoose");
const bloodBankDetailsSchema = new mongoose.Schema({

    bloodBankID:{

        type:String,
        required:true
    },

    name:{

        
        type:String,
        required:true

    },

    email:{
        
        type:String,
        required:true
    },

    contactNumber: {

        
        type:String,
        required:true
    },

    addressLine: {

        
        type:String,
        required:true
    },

    pincode:
    {
        
        type:String,
        required:true
    }



},

{
    timestamps: true,
});

module.exports = mongoose.model("bloodbankdetails",bloodBankDetailsSchema )