const mongoose = require("mongoose");
const programDrives = require('./programDrives.model');
const donationDetailsSchema = new mongoose.Schema({

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
        required: true

    }

},

{
    timestamps: true,
});

module.exports = mongoose.model("donationDetails", donationDetailsSchema);
 

