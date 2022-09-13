const AWS = require('aws-sdk');
const parseMultipart = require('parse-multipart');
 
const BUCKET = process.env.BUCKET;
 
const s3 = new AWS.S3();

module.exports.hello = async (event) => {
    let responseCode = 200;
    let name = "world...";
    console.log("request: " + JSON.stringify(event));
    
    if (event['pathParameters'] && event['pathParameters']['name']) {
        console.log("Received name: " + event['pathParameters']['name']);
        name = event['pathParameters']['name'];
    }
    
    let greeting = `Hello ${name}!`;
     
    let response = {
        statusCode: responseCode,
        body: greeting
    };
    
    console.log("response: " + JSON.stringify(response))
    return response;

}
 

