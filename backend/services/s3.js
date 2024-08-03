const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { generateUniqueFileName } = require('../utils/utils');

const s3 = new S3Client({});

async function uploadToS3(userId, originalname, buffer) {
  try {
    const key = generateUniqueFileName(userId, originalname);
    const input = {
      Bucket: 'nofomo-user-uploaded-content',
      Key: key,
      Body: buffer,
    };

    await s3.send(new PutObjectCommand(input));
    return key;
  } catch (err) {
    console.error('Error uploading file to S3:', err);
    throw err;
  }
}

module.exports = { uploadToS3 };
