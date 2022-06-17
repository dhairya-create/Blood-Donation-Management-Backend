const mongoose = require("mongoose");
const donationDetails = require('./donationDetails.model')
const donorSchema = new mongoose.Schema({

    aadharNumber: {

        type: String,
        unique: true,
        required: true,
        "$ref": donationDetails

    },

    firstName: {

        type: String,
        required: true
    },

    lastName: {

        type: String,
        required: true
    },

    contactNumber: {

        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    addressLine: {

        type: String,
        required: true,
    },

    pincode: {

        type: String,
        required: true,
        unique: true
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