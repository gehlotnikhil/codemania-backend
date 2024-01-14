const express = require("express")
const router = express.Router()
const Question = require("../model/Question")
const { body, validationResult } = require("express-validator")



// Route 1: Get All Question - GET Request
router.get("/getallquestion",async(req,res)=>{
    let result = await Question.find({})
    res.send(result)
    
})

// Route 2: Create a Question - POST Request
router.post("/create",[
    body("name","Please fill the Name Field").exists(),
    body("description","Please fill the description Field").exists(),
    body("difficulty","Please fill the difficulty Field").exists(),
    body("timeComplexity","Please fill the timeComplexity Field").exists(),
    body("spaceComplexity","Please fill the spaceComplexity Field").exists(),
    body("companies","Please fill the companies Field").exists(),
    body("testcase1","Please fill the testcase1 Field").exists(),
    body("testcase2","Please fill the testcase2 Field").exists(),
    body("testcase3","Please fill the testcase3 Field").exists(),
    body("outputOfTestcase1","Please fill the outputOfTestcase1 Field").exists(),
    body("outputOfTestcase2","Please fill the outputOfTestcase2 Field").exists(),
    body("outputOfTestcase3","Please fill the outputOfTestcase3 Field").exists(),
    body("sampleInput1","Please fill the sampleInput1 Field").exists(),
    body("sampleInput2","Please fill the sampleInput2 Field").exists(),
    body("sampleInput3","Please fill the sampleInput3 Field").exists(),
    body("sampleOutput1","Please fill the sampleOutput1 Field").exists(),
    body("sampleOutput2","Please fill the sampleOutput2 Field").exists(),
    body("sampleOutput3","Please fill the sampleOutput3 Field").exists(),
    body("accepted","Please fill the accepted Field").exists(),
    body("submission","Please fill the submission Field").exists(),
    body("like","Please fill the like Field").exists(),
    body("dislike","Please fill the dislike Field").exists(),
    body("constraint1","Please fill the constraint1 Field").exists(),
    body("constraint2","Please fill the constraint2 Field").exists()
], async (req, res) => {
    const error = validationResult(req)
    // after checking credential, if error occur then execute if statement
    if (!error.isEmpty()) {
        return res.status(403).json({error: error.array() })
    }
    //No. of question
    let countEntry = await Question.find({}).count()

    // if title of question is already exist then return error
    const k = await Question.find({name:req.body.name}).count()
   if(k !== 0){
    return res.status(404).send({error:"This Title is already exist"})
   }
   
    
    let question = new Question({
        no: countEntry+1,
        name: req.body.name,
        description: req.body.description,
        difficulty: req.body.difficulty,
        timeComplexity: req.body.timeComplexity,
        spaceComplexity: req.body.spaceComplexity,
        companies: req.body.companies,
        testcase1: req.body.testcase1,
        testcase2: req.body.testcase2,
        testcase3: req.body.testcase3,
        outputOfTestcase1: req.body.outputOfTestcase1,
        outputOfTestcase2: req.body.outputOfTestcase2,
        outputOfTestcase3: req.body.outputOfTestcase3,
        sampleInput1: req.body.sampleInput1,
        sampleInput2: req.body.sampleInput2,
        sampleInput3: req.body.sampleInput3,
        sampleOutput1: req.body.sampleOutput1,
        sampleOutput2: req.body.sampleOutput2,
        sampleOutput3: req.body.sampleOutput3,
        accepted: req.body.accepted,
        submission: req.body.submission,
        like:req.body.like,
        dislike:req.body.dislike,
        constraint1:req.body.constraint1,
        constraint2:req.body.constraint2
    })
    try {
        const result = await question.save()
        console.log(result)
        res.send(result)
    }
    catch (err) {
        console.log(err)
        for (field in err.errors) {
            console.log(err.errors[field])
        }
        res.status(409).send("Internal Server Error")
    }

})


// Route 3: Update Existing Question - PUT Request
router.put("/update/:id",async (req,res)=>{
    let q1 = await Question.findById(req.params.id) // return object if found otherwise returns null
    // if question is not found then  if-block will be execute
    if(!q1){
        return res.send("Question not found")
    }

    // if user update any value then update logic will be executed
    let question = {}
    if(req.body.name){
        question.name = req.body.name
    }
    if(req.body.description){
        question.description = req.body.description
    }
    if(req.body.difficulty){
        question.difficulty = req.body.difficulty
    }
    if(req.body.timeComplexity){
        question.timeComplexity = req.body.timeComplexity
    }
    if(req.body.spaceComplexity){
        question.spaceComplexity = req.body.spaceComplexity
    }
    if(req.body.companies){
        question.companies = req.body.companies
    }
    if(req.body.testcase1){
        question.testcase1 = req.body.testcase1
    }
    if(req.body.testcase2){
        question.testcase2 = req.body.testcase2
    }
    if(req.body.testcase3){
        question.testcase3 = req.body.testcase3
    }
    if(req.body.outputOfTestcase1){
        question.outputOfTestcase1 = req.body.outputOfTestcase1
    }
    if(req.body.outputOfTestcase2){
        question.outputOfTestcase2 = req.body.outputOfTestcase2
    }
    if(req.body.outputOfTestcase3){
        question.outputOfTestcase3 = req.body.outputOfTestcase3
    }
    if(req.body.sampleInput1){
        question.sampleInput1 = req.body.sampleInput1
    }
    if(req.body.sampleInput2){
        question.sampleInput2 = req.body.sampleInput2
    }
    if(req.body.sampleInput3){
        question.sampleInput3 = req.body.sampleInput3
    }
    if(req.body.sampleOutput1){
        question.sampleOutput1 = req.body.sampleOutput1
    }
    if(req.body.sampleOutput2){
        question.sampleOutput2 = req.body.sampleOutput2
    }
    if(req.body.sampleOutput3){
        question.sampleOutput3 = req.body.sampleOutput3
    }
    if(req.body.accepted){
        question.accepted = req.body.accepted
    }
    if(req.body.submission){
        question.submission = req.body.submission
    }
    if(req.body.like){
        question.like = req.body.like
    }
    if(req.body.dislike){
        question.dislike = req.body.dislike
    }
    if(question == {}){
        return res.status(407).send("Empty Content")
    }

    try {
        const result = await Question.findByIdAndUpdate(req.params.id,{$set : question},{$new: true})
        console.log({req:req.body,result:result})
        res.send(result)
    }
    catch (err) {
        console.log(err)
        for (field in err.errors) {
            console.log(err.errors[field])
        }
        res.status(409).send("Internal Server Error")
    }
})

// Route 4: Get Specific Question - GET Request
router.get("/getspecificquestion/:no",async(req,res)=>{
    let success = false
    let result = await Question.findOne({no:parseInt(req.params.no)})
    // if question is not found
    if(!result){
        return res.send({success,error:"Not Found"})
    }
    success = true
    res.send({success,result: result})
    
})



module.exports = router
