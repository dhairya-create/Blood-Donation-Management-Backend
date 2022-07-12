const mongoose = require("mongoose");
const recipient = require("./recipient.model")
const transactionSchema = new mongoose.Schema({
    
    transactionDate: {

        type: Date,
        required: true

    },
    amount: {
        type:String,
        required:true
    },
    recipientID: {

        type:String,
        required:true,
        "$ref": recipient

    }
},

{
    timestamps: true,
});

module.exports = mongoose.model("transaction", transactionSchema)