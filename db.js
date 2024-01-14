const mongoose = require("mongoose")
const mongodbUrl = "mongodb://127.0.0.1/codingPlatform"

const connect = ()=>{
    mongoose.connect(mongodbUrl)
    .then(()=>{console.log("Connection Establised")})
    .catch(()=>{console.log("Connection not Established")})
}
module.exports = connect