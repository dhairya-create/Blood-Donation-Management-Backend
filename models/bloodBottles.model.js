const mongoose = require("mongoose");
const bloodBank = require('./bloodbankDetails.model')
const recipient = require('./recipient.model')
const bloodBottlesSchema = new mongoose.Schema({

    bloodBottleId:{

        type:String,
        required: true,
        unique:true

    },

    bloodBankID: {
        type:String,
        required: true,
        unique:true,
        "$ref": bloodBank
    },

    bloodGroup: {
        type:String,
        required: true
    },

    isExpired: {
        type: Boolean,
        required:true
    },

    recipientId: {

        type: String,
        unique: true,
        required: true,
        "$ref": recipient

    },

    

   



},

{
    timestamps: true,
});

module.exports = mongoose.model("bloodbottles", bloodBottlesSchema)