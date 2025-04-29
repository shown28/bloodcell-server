const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    bloodGroup:{
        type:String,
        require:true
    },
    units:{
        type:Number,
        require:true
    },
    place:{
        type:String,
        require:true
    },
    pname:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    date:{
        type: Date,
        require:true,
        default: Date.now()
    },
    userId:{
        type:String,
        require:true
    }
})
module.exports = mongoose.model("requests",requestSchema)