const Users = require('../models/Users');
const Posts = require('../models/Posts');
const { uploadToS3, getPresignedUrl } = require('../services/s3');
const { camelizeKeys, getUpdateFields } = require('../utils/utils');
// TODO: Remove when Posts model implement update and create
const db = require('../config/database');

const createPost = async (req, res, next) => {
  const { userId: clerkId } = req.auth;
  const { originalname: fileName, buffer } = req.file;
  const { title, location, body, eventStart, eventEnd } = req.body;

  try {
    const userId = await Users.getUserIdByClerkId(clerkId);
    // TODO: Consider sending presigned url to client to upload
    const imageUrl = await uploadToS3(userId, fileName, buffer);
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

const getPost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    let post = await Posts.getPostById(postId);

    // Reassign the image_url from the s3 object url to a presigned url for download
    post.image_url = await getPresignedUrl(post.image_url);

    // Convert the snake_case keys to camelcase keys
    post = camelizeKeys(post);

    res.status(200).send({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  const { postId } = req.params;
  const { updateFields, values } = getUpdateFields(req.body);

  if (updateFields.length === 0) {
    return res.status(400).send({
      status: 'fail',
      data: {
        message: 'Request body cannot be empty',
      },
    });
  }

  try {
    const sql = `UPDATE posts SET ${updateFields.join(', ')} WHERE id = ?`;
    const [result] = await db.execute(sql, [...values, postId]);

    if (result.affectedRows === 1) {
      res.status(200).send({
        status: 'success',
        data: null,
      });
    } else {
      res.status(404).send({
        status: 'fail',
        data: {
          message: `No post found with the id: ${postId}`,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const sql = 'DELETE FROM `posts` WHERE `id` = ?';
    const [result] = await db.execute(sql, [postId]);

    if (result.affectedRows === 1) {
      res.status(200).send({
        status: 'success',
        data: null,
      });
    } else {
      res.status(404).send({
        status: 'fail',
        data: {
          message: `No post found with the id: ${postId}`,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { createPost, getPost, updatePost, deletePost };
