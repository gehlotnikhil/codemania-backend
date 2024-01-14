const express = require("express")
const router = express.Router()
const User = require("../model/User")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const JWT_Secret = "NikhilGehlot"

router.post("/login", [
    body("email", "Please Enter a Email in the Field").isEmail(),
    body("password", "Please Enter Your Password").exists()
], async (req, res) => {
    let success = false
    const error = validationResult(req)
    // after checking credential, if error occur then execute if statement
    if (!error.isEmpty()) {
        return res.status(403).json({ success,error: error.array() })
    }
    const { email, password } = req.body;
    try {
        //checking email is exist or not 
        const user = await User.findOne({ email: req.body.email })
        // if email is unable to find
        if (!user) {
            return res.status(401).send("E-Please provide correct Credential")
        }
        console.log("details: "+user)

        const passwordCompare = await bcrypt.compare(password, user.password)
        //if password is wrong then if block execute
        if (!passwordCompare) {
            return res.status(410).json({ success: success, error: "Please enter the correct Credential" })
        }
        // sending token
        const data = {
            users: {
                id: user.id
            }
        }
        const authToken = await jwt.sign(data, JWT_Secret)
        success = true
        req.body.id = user.id
        req.body.name = user.name
        req.body.institude = user.institude
        req.body.age = user.age
        req.body.mobile = user.mobile || "Unknown"
        req.body.address = user.address || "Unknown"
        console.log("req body == ",req.body)
        res.send({ success, authToken, body: req.body,username:user.username })
        console.log(authToken)
    }
    catch (err) {
        for (field in err.errors) {
            console.log(err.errors[field])
        }
        return res.status(407).send(err)
    }
})


//Route 2: Create a user
router.post("/register", [
    body("name", "Please Enter a Name").isLength({ min: 3 }),
    body("username", "Please Enter a username").exists(),
    body("email", "Please Enter a email").isEmail(),
    body("password", "Please Enter a password").isLength({ min: 3 }),
    body("age", "Please Enter a age").exists(),
    body("institude", "Please Enter a institude").exists(),

], async (req, res) => {
    let success = false
    const error = validationResult(req)
    // after checking credential, if error occur then execute if statement
    if (!error.isEmpty()) {
        return res.status(403).json({ success, error: error.array() })
    }


    const user = await User.findOne({ email: req.body.email })
    console.log(user)
    if (user) {
        return res.status(410).send({ success, error: "This Email Already Exist" })
    }
    let salt = await bcrypt.genSalt(10)
    let secPasswd = await bcrypt.hash(req.body.password, salt)

    // create new user
    const u1 = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: secPasswd,
        age: parseInt(req.body.age),
        institude: req.body.institude
    })
    const data = {
        users: {
            id: u1.id
        }
    }
    console.log("data----", data)
    const authToken = jwt.sign(data, JWT_Secret)
    console.log("authToken---", authToken)
    try {
        const result = await u1.save()
        console.log(result)
        success = true
        req.body.mobile = result.mobile || "Unknown"
        req.body.address = result.address || "Unknown"
        req.body.id = result.id
        res.send({ success, authToken, body: req.body,username:u1.username })
    }
    catch (err) {
        console.log(err)
        for (field in err.errors) {
            console.log(err.errors[field])
        }
        res.status(409).send({ success, error: err })
    }
})

// Route 3: Update User Details 
router.put("/update/:id", async (req, res) => {
    let user = {}
    if (req.body.name) {
        user.name = req.body.name
    }
    if (req.body.username) {
        user.username = req.body.username
    }
    if (req.body.institude) {
        user.institude = req.body.institude
    }
    if (req.body.age) {
        user.age = req.body.age
    }
    if(req.body.mobile){
        user.mobile = req.body.mobile
    }
    if(req.body.address){
        user.address = req.body.address
    }


    let result = await User.findByIdAndUpdate(req.params.id, { $set: user }, { $new: true })
    console.log(result)
    res.send(result)
})
//Route 2: Create a user
router.post("/getdetails/:name", async(req,res)=>{
    try{
        success = false
        let a = await User.findOne({username:req.params.name}).select("-password")
        // if username is not found
        if(!a){
            return res.send({success,result:"Username not found"})
        }
        success=  true
        res.send({success,result:a})

    }
    catch (err) {
        console.log(err)
        for (field in err.errors) {
            console.log(err.errors[field])
        }
        res.status(409).send({ success, error: err })
    }
})



module.exports = router