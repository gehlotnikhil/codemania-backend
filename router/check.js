const express = require("express")
const router = express.Router()
const { execSync } = require('child_process');
const { spawn } = require('child_process');
const f = require("fs")
router.post("/question/submit", (req, res) => {

    data = req.body.code

    f.writeFileSync("Solution.java", data)


    let result = {
        test1: false,
        test2: false,
        test3: false,
        outputOfTest1: null,
        outputOfTest2: null,
        outputOfTest3: null
    }
    let input1 = req.body.testcase1;
    let input2 = req.body.testcase2;
    let input3 = req.body.testcase3;

    let check1 = req.body.outputOfTestcase1
    let check2 = req.body.outputOfTestcase2
    let check3 = req.body.outputOfTestcase3

    function runJavaCodeSync(javaFile, input, resultOfInput) {
        const javaExecutable = 'java';
        let output = {
            isPassed: false,
            result: null,
            check: false
        }
        let ans;
        try {
            console.log("1");
            // Use execSync to run Java code synchronously
            let ans = execSync(`${javaExecutable} ${javaFile}`, {
                input: input,
                encoding: 'utf-8',
            });
            console.log("2");
            if (resultOfInput != ans) {
                output.result = ans
                output.isPassed = true
                return output
            }

            console.log("3");
            output.isPassed = true
            output.check = true
            output.result = ans

            console.log("4");
            return output;
        } catch (error) {
            output.result = "Compile Error..."
            console.log("5");
            return output
        }
    } 

    // Java File
    const javaFile = 'Solution.java';


    //Testing testcase 1:
    //running
    const output1 = runJavaCodeSync(javaFile, input1, check1);
    //checking testcase 1 is passed or not
    if (output1.isPassed && output1.check) {
        result.test1 = true
    }
    else
        result.test1 = false
    result.outputOfTest1 = output1



    //Testing testcase 2:
    //running
    const output2 = runJavaCodeSync(javaFile, input2, check2);
    //checking testcase 1 is passed or not
    if (output2.isPassed && output2.check) {
        result.test2 = true
    }
    else
        result.test2 = false
    result.outputOfTest2 = output2


    //Testing testcase 3:
    //running
    const output3 = runJavaCodeSync(javaFile, input3, check3);
    //checking testcase 3 is passed or not
    if (output3.isPassed && output3.check) {
        result.test3 = true
    }
    else
        result.test3 = false
    result.outputOfTest3 = output3

    res.send(result)

})

router.post("/playground/submit",(req,res)=>{
    
    data = req.body.code

    f.writeFileSync("Solution.java", data)


    let result = {
        test: false,
        outputOfTest: null
    }
    let input = req.body.testcase;


    function runJavaCodeSync(javaFile, input) {
        const javaExecutable = 'java';
        let output = {
            isPassed: false,
            result: null,
        }
        let ans;
        try {
            // Use execSync to run Java code synchronously
            let ans = execSync(`${javaExecutable} ${javaFile}`, {
                input: input,
                encoding: 'utf-8',
            });

            output.isPassed = true
            output.result = ans

            return output;
        } catch (error) {
            output.result = "Compile Error..."
            return output
        }
    }

    // Java File
    const javaFile = 'Solution.java';


    //Testing testcase 1:
    //running
    const output = runJavaCodeSync(javaFile, input);
    //checking testcase 1 is passed or not
    if (output.isPassed) {
        result.test = true
    }
    else
        result.test = false
    result.outputOfTest = output


    res.send(result)

})


module.exports = router