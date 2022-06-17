const mongoose = require("mongoose");
const programDrivesSchema = new mongoose.Schema({

    programID: {

        type: String,
        unique: true,
        required: true

    },

    programName: {


        type: String,
        required:true
    },

    programDate: {

        type: new Date()
    },

    contactNumber: {

        type: String,
        required: true
    }



},

{
    timestamps: true,
});

module.exports = mongoose.model("programDrive", programDrivesSchema);
