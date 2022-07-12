const mongoose = require("mongoose");
const bloodBank = require('./bloodbankDetails.model')
const recipient = require('./recipient.model')
const bloodBottlesSchema = new mongoose.Schema({

    bloodGroup: {
        type:String,
        required: true
    },

    isExpired: {
        type: Boolean,
        default:false
    },

    recipientId: {
        type: String,
        required: false,
        default: null,
        "$ref": recipient
    },

},

{
    timestamps: true,
});

module.exports = mongoose.model("bloodbottles", bloodBottlesSchema)