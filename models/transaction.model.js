const mongoose = require("mongoose");
const recipient = require("./recipient.model")
const transactionSchema = new mongoose.Schema({

    transactionID: {

        type: String,
        required: true,
        unique:true

    },
    

    bloodBankID: {

        type: String,
        required: true,
        unique:true

    },

    transactionDate: {

        type: new Date(),
        required: true

    },

    amount: {
        type:String,
        required:true
    },

    recipientId: {

        type:String,
        required:true,
        "$ref": recipient

    }

},

{
    timestamps: true,
});

module.exports = mongoose.model("transaction", transactionSchema)