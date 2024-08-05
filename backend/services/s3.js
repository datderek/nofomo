const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { generateUniqueFileName } = require('../utils/utils');
const { S3Error } = require('../utils/errors');

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
    throw new S3Error('Error uploading file to S3');
  }
};

const getPresignedUrl = async (imageUrl) => {
  const input = {
    Bucket: bucket,
    Key: imageUrl,
  };

  const command = new GetObjectCommand(input);
  try {
    return await getSignedUrl(s3, command, { expiresIn: 900 });
  } catch (err) {
    throw new S3Error('Error retrieving image from S3');
  }
};

module.exports = { uploadToS3, getPresignedUrl };
