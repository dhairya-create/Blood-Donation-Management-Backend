const mongoose = require("mongoose");
const prerequisitesSchema = new mongoose.Schema({

   

    stockName: {

        type: String,
        required: true
        
    },

    quantity: {
        type: String,
        required: true
    }

},

{
    timestamps: true,
});

module.exports = mongoose.model("prerequisite", prerequisitesSchema)