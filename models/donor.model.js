const mongoose = require("mongoose");
const donationDetails = require('./donationDetails.model')
const donorSchema = new mongoose.Schema({

    aadharNumber: {

        type: String,
        unique: true,
        required: true,
        "$ref": donationDetails

    },

   gender: {

        type: String,
        required: true,
    },

    bloodGroup: {

        type: String,
        required: true,
    },

    dateOfBirth: {

        type: new Date(),
        required: true
    },

    medicalReports: {

        type: String,
        required: true,

    },
},

    {
        timestamps: true,
    });

module.exports = mongoose.model("donor", donorSchema);