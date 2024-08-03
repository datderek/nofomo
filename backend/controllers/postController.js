const Users = require('../models/Users');
const Posts = require('../models/Posts');
const { uploadToS3 } = require('../services/s3');

const createPost = async (req, res, next) => {
  const { userId: clerkId } = req.auth;
  const { originalname, buffer } = req.file;
  const { title, location, body, eventStart, eventEnd } = req.body;

  try {
    const userId = await Users.getUserByClerkId(clerkId);
    // TODO: Consider sending presigned url to client to upload
    const imageUrl = await uploadToS3(userId, originalname, buffer);
    const insertId = await Posts.createPost(
      userId,
      imageUrl,
      title,
      location,
      body,
      eventStart,
      eventEnd
    );

    res.status(201).send({
      status: 'success',
      data: {
        message: 'Post created successfully',
        title,
        postId: insertId,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createPost };
