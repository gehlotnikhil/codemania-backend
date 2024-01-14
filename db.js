const mongoose = require("mongoose")
const mongodbUrl = "mongodb://localhost:27017/codingPlatform"

const connect = ()=>{
    mongoose.connect(mongodbUrl)
    .then(()=>{console.log("Connection Establised")})
    .catch(()=>{console.log("Connection not Established")})
}
module.exports = connect