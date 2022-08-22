const mongoose = require("mongoose");
const username = require('./user.model');
const programDrivesSchema = new mongoose.Schema({

    programName: {

        type: String,
        required: true
    },

    programDate: {

        type: Date,
        required: true
    },

    contactNumber: {

        type: String,
        required: true
    },

    username: {

        type: String,
        "$ref": username
    },

    isAccepted: {

        type: Boolean,
        default:false,
    }

},

    {
        timestamps: true,
    });

module.exports = mongoose.model("programDrive", programDrivesSchema);
