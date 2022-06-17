const mongoose = require("mongoose");
const donor = require("./donor.model");
const addressSchema = new mongoose.Schema({

    pincode: {

        type: String,
        required: true,
        unique: true,
        "$ref": donor
    },

    area: {

        type: String,
        required: true

    },

    city: {
        type: String,
        required: true
    },

    state: {

        type: String,
        required: true
    }


},

{
    timestamps: true,
});

module.exports = mongoose.model("address", addressSchema);