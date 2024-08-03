const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { generateUniqueFileName } = require('../utils/utils');

const bucket = 'nofomo-user-uploaded-content';
const s3 = new S3Client({});

const uploadToS3 = async (userId, originalname, buffer) => {
  try {
    const key = generateUniqueFileName(userId, originalname);
    const input = {
      Bucket: bucket,
      Key: key,
      Body: buffer,
    };

    await s3.send(new PutObjectCommand(input));
    return key;
  } catch (err) {
    console.error('Error uploading file to S3:', err);
    throw err;
  }
};

const getPresignedUrl = async (imageUrl) => {
  const input = {
    Bucket: bucket,
    Key: imageUrl,
  };

  const command = new GetObjectCommand(input);
  return await getSignedUrl(s3, command, { expiresIn: 900 });
};

module.exports = { uploadToS3, getPresignedUrl };
