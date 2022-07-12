const mongoose = require("mongoose");
const programDrivesSchema = new mongoose.Schema({

    programName: {

        type: String,
        required: true
    },

    programDate: {

        type: Date,
        required: true
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
