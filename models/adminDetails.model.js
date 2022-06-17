const adminDetailsSchema = new mongoose.Schema({

    username: {
        type:String,
        required: true
    },

    bloodBandID: {
        type:String,
        required: true,
        unique:true
    },

    password: {

        type:String,
        required: true
    },

    firstName:{

        type:String,
        required: true
    },

    email:{
        type:String,
        required: true
    },

    contactNumber:{
        type:String,
        required: true
    }

},

{
    timestamps: true,
});

module.exports = mongoose.model("admindetails", adminDetailsSchema)

