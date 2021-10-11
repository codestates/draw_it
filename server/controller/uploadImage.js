require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

module.exports.uploadImage = async (file, userId) => {
  const fileName = `${Date.now()}-${userId}`;
  const data = await file.data;

  const S3 = new AWS.S3();

  return await S3.upload({
    Body: Buffer.from(data),
    Bucket: 'drawit',
    Key: fileName,
    ACL: 'public-read',
    ContentType: 'image/png',
  }).promise();
};
