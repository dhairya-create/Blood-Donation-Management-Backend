const mongoose = require("mongoose");
const address = require('./address.model');
const username = require('./user.model');
const recipientSchema = new mongoose.Schema({

    username: {

        type: String,
        "$ref": username
    },
    bloodGroup: {

        type: String,
        required: true,
    },

    requestedDate: {

        type: Date,
        required: true
    },

    quantity: {

        type: Number,
        required: true,

    },

    supplyDate: {

        type: Date,
        required: true
    },

    isAccepted: {

        type: Boolean,
        default:false,
        required: true
    },
},

    {
        timestamps: true,
    });

module.exports = mongoose.model("recipient", recipientSchema)