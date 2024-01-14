const express = require("express")
const router = express.Router()
const { execSync } = require('child_process');
const { spawn } = require("child_process");
const f = require("fs")
const axios = require('axios');
const bodyParser = require('body-parser');

const JDoodleEndpoint = 'https://api.jdoodle.com/v1/execute';



router.post("/question/submit", async (req, res) => {

    data = req.body.code


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

    const runJavaCodeSync = async (dataCode, input, resultOfInput) => {
        let output = {
            isPassed: false,
            result: null,
            check: false
        }
        let ans;
        try {
            console.log("1");
            // Use execSync to run Java code synchronously
            const jdoodlePayload = {
                script: dataCode,
                stdin: input,
                language: 'java',
                versionIndex: 3, // Java 8
                clientId: '3cb6c6b56019717db130949865c7091f',
                clientSecret: '485b1ad907533987967df3cf4921da0e3833a60cf9df04a6f6f173ab51c8569b',
            };
            const jdoodleResponse = await axios.post(JDoodleEndpoint, jdoodlePayload);

            const ans = jdoodleResponse.data.output;

            console.log("ans--", ans);

            // console.log("ck1--", !(resultOfInput == ans), "ck2-", (ans.search("Solution.java:") == -1))
            console.log("2");
            console.log((resultOfInput == ans), "\n", "r-", resultOfInput, "o-", ans)
            if (!(resultOfInput == ans) || (ans.search("Solution.java:") != -1)) {
                output.result = ans
                console.log("qwerty-----")
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

    //Testing testcase 1:
    //running
    const output1 = await runJavaCodeSync(data, input1, check1);
    //checking testcase 1 is passed or not
    if (output1.isPassed && output1.check) {
        result.test1 = true
    }
    else
        result.test1 = false
    result.outputOfTest1 = output1



    //Testing testcase 2:
    //running
    const output2 = await runJavaCodeSync(data, input2, check2);
    //checking testcase 1 is passed or not
    if (output2.isPassed && output2.check) {
        result.test2 = true
    }
    else
        result.test2 = false
    result.outputOfTest2 = output2


    //Testing testcase 3:
    //running
    const output3 = await runJavaCodeSync(data, input3, check3);
    //checking testcase 3 is passed or not
    if (output3.isPassed && output3.check) {
        result.test3 = true
    }
    else
        result.test3 = false
    result.outputOfTest3 = output3

    res.send(result)

})

router.post("/playground/submit", async(req, res) => {

    data = req.body.code



    let result = {
        test: false,
        outputOfTest: null
    }
    let input = req.body.testcase;


    const runJavaCodeSync = async (dataCode, input) => {
        let output = {
            isPassed: false,
            result: null,
            check: false
        }
        let ans;
        try {
            console.log("1");
            // Use execSync to run Java code synchronously
            const jdoodlePayload = {
                script: dataCode,
                stdin: input,
                language: 'java',
                versionIndex: 3, // Java 8
                clientId: '3cb6c6b56019717db130949865c7091f',
                clientSecret: '485b1ad907533987967df3cf4921da0e3833a60cf9df04a6f6f173ab51c8569b',
            };
            const jdoodleResponse = await axios.post(JDoodleEndpoint, jdoodlePayload);

            const ans = jdoodleResponse.data.output;

            console.log("ans--", ans);

            // console.log("ck1--", !(resultOfInput == ans), "ck2-", (ans.search("Solution.java:") == -1))
            console.log("2");
            if ((ans.search("Solution.java:") != -1)) {
                output.result = ans
                console.log("qwerty-----")
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
            console.log("5",error);
            return output
        }
    }
 
    //Testing testcase 1:
    //running
    const output = await runJavaCodeSync(data, input);
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