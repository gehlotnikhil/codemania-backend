require("dotenv").config()
const express = require("express")
const connect =  require("./database/connect")
var cors = require("cors")
const app = express()
const PORT = process.env.PORT || 5000;

const start = async()=>{
    try{
        await connect(process.env.MONGODB_URL);
        app.listen(PORT, ()=>{
            console.log("Server is running at port ",PORT)
        })
    }
    catch(error){
        console.log({err:error})
    }
}
start();


app.use(cors())
app.use(express.json())
app.use("/api/auth/",require("./router/auth"))
app.use("/api/question/",require("./router/question"))
app.use("/api/check/",require("./router/check"))



