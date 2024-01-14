const mongoose  = require("mongoose")

const questionSchema = new mongoose.Schema({
    no:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        required:true
    },
    timeComplexity:{
        type: String,
        required: true
    },
    spaceComplexity:{
        type:String,
        required: true
    } ,
    companies:{
        type: String,
        required: true
    },
    testcase1:{
        type:String,
        required: true
    },
    testcase2:{
        type:String,
        required:true
    },
    testcase3:{
        type:String,
        required:true
    },
    outputOfTestcase1:{
        type:String,
        required:true
    },
    outputOfTestcase2:{
        type:String,
        required:true
    },
    outputOfTestcase3:{
        type:String,
        required:true
    },
    sampleInput1:{
        type:String,
        required: true
    },
    sampleInput2:{
        type:String,
        required: true
    },
    sampleInput3:{
        type:String,
        required: true
    },
    sampleOutput1:{
        type:String,
        required: true
    },
    sampleOutput2:{
        type:String,
        required: true
    },
    sampleOutput3:{
        type:String,
        required: true
    },
    accepted:{
        type:String,
        required:true
    },
    submission:{
        type:String,
        required: true
    },
    like:{
        type:Number,
        required:true
    },
    dislike:{
        type:Number,
        required:true
    },
    constraint1:{
        type:String,
        required:true
    },
    constraint2:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Question",questionSchema)