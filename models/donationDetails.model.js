const mongoose = require("mongoose");
const programDrives = require('./programDrives.model');
const bloodBottle = require('./bloodBottles.model')
const donationDetailsSchema = new mongoose.Schema({



    bloodBottleId: {

        type:String,
        "$ref": bloodBottle,
        unique: true,
        required: true

    },

    aadharNumber: {

        type: String,
        unique: true,
        required: true,


    },

    date: {

        type: new Date(),
        required: true
    },

    programID: {

        type: String,
        unique: true,
        "$ref": programDrives,
        required: false

    },

    username: {
        type: String,
        required: true

    }

},

    {
        timestamps: true,
    });

module.exports = mongoose.model("donationDetails", donationDetailsSchema);


