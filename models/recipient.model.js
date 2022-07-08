const mongoose = require("mongoose");
const address = require('./address.model');
const username = require('./user.model');
const recipientSchema = new mongoose.Schema({


    username: {

        type: String,
        "$ref": username

    },
    recipientId: {

        type: String,
        unique: true,
        required: true

    },

    bloodGroup: {

        type: String,
        required: true,
    },

    requestedDate: {

        type: new Date(),
        required: true
    },

    quantity: {

        type: String,
        required: true,

    },

    supplyDate: {

        type: new Date(),
        required: true
    },



    isAccepted: {

        type: Boolean,
        required: true
    },








},

    {
        timestamps: true,
    });

module.exports = mongoose.model("recipient", recipientSchema)