const express = require("express")
const connect =  require("./db")
var cors = require("cors")

connect()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth/",require("./router/auth"))
app.use("/api/question/",require("./router/question"))
app.use("/api/check/",require("./router/check"))

app.listen(5000,()=>{
    console.log("Server is Running at Port 5000")
})

