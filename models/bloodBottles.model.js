const mongoose = require("mongoose");
const bloodBottlesSchema = new mongoose.Schema({

    bloodBandID: {
        type:String,
        required: true,
        unique:true
    },

    bloodGroup: {
        type:String,
        required: true
    },

    quantity: {

        type:String,
        required: true
    }



},

{
    timestamps: true,
});

module.exports = mongoose.model("bloodbottles", bloodBottlesSchema)