const mongoose = require("mongoose");
const address = require('./address.model');
const transaction = require('./transaction.model');
const recipientSchema = new mongoose.Schema({

    recipientId: {

        type: String,
        unique: true,
        required: true

    },

    name: {

        type: String,
        required:true

    },

    contactNumber: {

        type: String,
        required: true
    },

    addressLine: {

        type: String,
        required: true,
    },

    pincode: {

        type: String,
        required: true,
        "$ref": address
    },

    email: {
        type: String,
        required: true,
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

    transactionID: {

        type: String,
        required: true,
        "$ref": transaction

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