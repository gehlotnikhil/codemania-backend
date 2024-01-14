const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');


const JDoodleEndpoint = 'https://api.jdoodle.com/v1/execute';

  const javaCode = `public class UserCode{  public static void main(String[] args) {  System.out.print("hi"+A); } }`;
  const inputData = "";
//   const javaCode =""

  const jdoodlePayload = {
    script: javaCode,
    stdin: inputData,
    language: 'java',
    versionIndex: 3, // Java 8
    clientId: '3cb6c6b56019717db130949865c7091f',
    clientSecret: '485b1ad907533987967df3cf4921da0e3833a60cf9df04a6f6f173ab51c8569b',
  };
const a = async()=>{
  try {
    const jdoodleResponse = await axios.post(JDoodleEndpoint, jdoodlePayload);
    console.log(jdoodleResponse)
    
    const output = jdoodleResponse.data.output;
    if(output.search("Solution.java:")){}
    console.log( output );
  } catch (error) {
    console.error('Error executing Java code:', error.message);
    console.log({ error: 'Error executing Java code' });
  }
}
a()

