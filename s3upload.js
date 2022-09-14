const AWS = require('aws-sdk');


const BUCKET_NAME = process.env.BUCKET;
const s3 = new AWS.S3();

module.exports.handle = async (event) => {
    console.log(event);

    const response = {
        isBase64Encoded: false,
        statusCode: 200,
        body: JSON.stringify({ message: "Successfully uploaded file to S3" }),
    };

    try {
        console.log(event.body);
        //const parsedBody = JSON.parse(event.body);
        const bodyFile = event.body;
        let decodedFile = "";
        if (event.isBase64Encoded) {
            decodedFile = Buffer.from(bodyFile.replace(/^data:image\/\w+;base64,/, ""), "base64");
        } else {
            decodedFile =  bodyFile;   
        }
        const newFileName = `${new Date().toISOString()}.jpeg`;
        const fullFileName = `https://${BUCKET}.s3.amazonaws.com/${newFileName}`;

        const params = {
            Bucket: BUCKET_NAME,
            Key: newFileName,
            Body: decodedFile,
            ContentType: "image/jpeg",
        };

        const uploadResult = await s3.upload(params).promise();

        response.body = JSON.stringify({ message: "Successfully uploaded file to S3", uploadResult });
    } catch (e) {
        console.error(e);
        response.body = JSON.stringify({ message: e.stack });
        response.statusCode = 500;
    }

    return response;
  
}

