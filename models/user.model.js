const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userName:{

        type: String,
        required: true,
        unique: true

    },
    
    name:{
        type: String,
        required: true
    },

    email: {

        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },

    contactNumber:{

        type: String,
        required: true

    },

    address: {

        type: String,
        required: true

    },
    isVerified: {
        type: Boolean,
        default: false
    }
},

    {
        timestamps: true,
    });

module.exports = mongoose.model("user", userSchema);