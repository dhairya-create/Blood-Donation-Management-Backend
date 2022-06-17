const mongoose = require("mongoose");
const bloodbankdetails = require("./bloodbankDetails.model");
const prerequisitesSchema = new mongoose.Schema({

    bloodBankID: {

        type: String,
        required: true,
        unique:true,
        "$ref": bloodbankdetails

    },

    stockName: {

        type: String,
        required: true
        
    },

    quantity: {
        type: String,
        required: true
    }

},

{
    timestamps: true,
});

module.exports = mongoose.model("prerequisite", prerequisitesSchema)