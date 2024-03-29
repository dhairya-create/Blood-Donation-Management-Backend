const mongoose = require("mongoose");
const donor = require('./donor.model');
const user = require('./user.model');
const programDrives = require('./programDrives.model');
const bloodBottle = require('./bloodBottles.model')
const donationDetailsSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        "$ref": user,
    },

    bloodBottleId: {

        type:String,
        "$ref": bloodBottle,
        required: false

    },

    date: {

        type: Date,
        required: true
    },

    hasDonated:{
        type:Boolean,
        default:false,
    }
},

    {
        timestamps: true,
    });

module.exports = mongoose.model("donationDetails", donationDetailsSchema);


