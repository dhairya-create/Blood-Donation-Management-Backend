const mongoose = require("mongoose");
const user = require('./user.model');
const donorSchema = new mongoose.Schema({

    aadharNumber: {

        type: String,
        unique: true,
        required: false,
    },
    username:{

        type: String,
        required: true,
        unique: true,
        "$ref": user
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

        type: Date,
        required: true
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model("donor", donorSchema);