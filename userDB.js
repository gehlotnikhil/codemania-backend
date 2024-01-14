require("dotenv").config()
const connectDB = require("./database/connect")
const user = require("./model/User")
const userJson = require("./user.json")

const start = async()=>{
    try{
        await connectDB(process.env.MONGODB_URL)
        await user.deleteMany();
        await user.create(userJson);
        console.log("Success")
    }catch(error){
        console.log(error)
}}
start()
