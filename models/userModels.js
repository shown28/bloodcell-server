const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    dob:{
        type:Date,
        reqiure:true
    },
    phone:{
        type:Number,
        require:true
    },
    place:{
        type:String,
        require:true
    },
    bloodGroup:{
        type:String,
        reqiure:true
    },
    photo:{
        type:String,
    },
    numberOfDonations:{
        type:Number,
        require:true
    },
    lastDonation:{
        type:Date,
        require:true
    },
    authorizedDonor:{
        type:Boolean,
        require:true
    }
    
})
module.exports = mongoose.model("Users",userSchema)