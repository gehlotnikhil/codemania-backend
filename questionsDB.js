require("dotenv").config()
const connectDB = require("./database/connect")
const question = require("./model/Question")
const questionJson = require("./questions.json")

const start = async()=>{
    try{
        await connectDB(process.env.MONGODB_URL)
        await question.deleteMany();
        await question.create(questionJson);
        console.log("Success")
    }catch(error){
        console.log(error)
}}
start()
