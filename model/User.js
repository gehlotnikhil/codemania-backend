const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    institude:{
        type:String,
    },
    age:{
        type: Number,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    mobile:{
        type:String,
    },
    address:{
        type:String,
    }
    
})
module.exports = mongoose.model("User",userSchema)