const AWS = require('aws-sdk');
const multipart = require('aws-lambda-multipart-parser');

const BUCKET = process.env.BUCKET;

module.exports.handle = async (event) => {
    try {
    //   const { filename, data } = extractFile(event)
      await s3.putObject({ Bucket: BUCKET, Key: filename, ACL: 'public-read', Body: data }).promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ link: `https://${BUCKET}.s3.amazonaws.com/${filename}` })
      }
    } catch (err) {
      return {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ message: err.stack })
      }
    }
  }

  function extractFile(event) {
    // spotText === true response file will be Buffer and spotText === false: String
    const result = multipart.parse(event, spotText) 
    const filename = result.filename;
    const data = result.data;

    return {
      filename,
      data
    }

  }