const AWS = require('aws-sdk');
const multipart = require('aws-lambda-multipart-parser');

const BUCKET = process.env.BUCKET;
const s3 = new AWS.S3();

module.exports.handle = async (event) => {
    try {
      //const { filename, data } = extractFile(event)
      //await s3.putObject({ Bucket: BUCKET, Key: filename, ACL: 'public-read', Body: data }).promise();
      return {
        statusCode: 200,
        body:  JSON.stringify(extractFile(event))
      }

    //   return {
    //     statusCode: 200,
    //     headers: {
    //         "Access-Control-Allow-Origin": "*"
    //     },
    //     body: JSON.stringify({ link: `https://${BUCKET}.s3.amazonaws.com/${filename}` })
    //   }
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: err.stack })
      }
    }
  }

  function extractFile(event) {
    // spotText === true response file will be Buffer and spotText === false: String
    spotText = true;
    const result = multipart.parse(event, spotText) 
    // const filename = result.file.filename;
    // const data = result.file.content.data;

    // return {
    //   filename,
    //   data
    // }
    return result;
  }