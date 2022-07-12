const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{

        type: String,
        required: true,
        unique: true

    },
    
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


    addressLine: {

        type: String,
        required: true

    },
},

    {
        timestamps: true,
    });

module.exports = mongoose.model("user", userSchema);