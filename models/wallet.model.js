const mongoose = require('mongoose')
const user = require('./user.model');
const Schema = mongoose.Schema

const walletSchema = new Schema({
    username:{

        type: String,
        required: true,
        unique: true,
        "$ref": user
    },
    amount: {
        type: Number,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model("wallet", walletSchema);