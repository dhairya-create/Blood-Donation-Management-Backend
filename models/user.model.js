const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    contactNumber:{

        type: String,
        required: true

    },

    email: {

        type: String,
        required: true
    },

    username:{

        type: String,
        required: true,
        unique: true

    },

    pincode: {

        type: String,
        required: true

    },

    addressLine: {

        type: String,
        required: true

    },
},

    {
        timestamps: true,
    });

module.exports = mongoose.model("user", userSchema);