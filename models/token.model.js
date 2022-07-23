const mongoose = require("mongoose");
const user = require('./user.model');
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
    userName:{

        type: String,
        required: true,
        unique: true,
        "$ref": user

    },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,// this is the expiry time in seconds
  },
});
module.exports = mongoose.model("Token", tokenSchema);