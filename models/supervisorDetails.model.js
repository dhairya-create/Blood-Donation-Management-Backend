const mongoose = require("mongoose");
const programDrives = require('./programDrives.model');
const supervisorDetailsSchema = new mongoose.Schema({

    contactNumber: {

        type: String,
        "$ref": programDrives,
        required: true,
        "unique": true
    },

    supervisorName: {

        type: String,
        required: true
    }

},

{
    timestamps: true,
});

module.exports = mongoose.model("supervisorDetails", supervisorDetailsSchema);