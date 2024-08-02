const express = require('express');
const db = require('../config/database');
const { S3Client } = require('@aws-sdk/client-s3');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const multer = require('multer');
const postSchema = require('../schema/post');
const { getUpdateFields, formatValidationErrors } = require('../utils/utils');

const router = express.Router();
const s3 = new S3Client({});
const upload = multer({ dest: 'dist/uploads/' });

// Create a new post belonging to the concurrent user
router.post(
  '/',
  ClerkExpressRequireAuth(),
  upload.single('image'),
  async (req, res, next) => {
    let {
      title,
      location = null,
      body = null,
      eventStart = null,
      eventEnd = null,
    } = req.body;
    const { image } = req.file;
    const { userId: clerkId } = req.auth;

    try {
      //TODO:  Upload the user images to S3
      console.log(s3);
      console.log(image);

      // Validates request body and sets empty strings (ommitted optional fields) to null
      ({ title, location, body, eventStart, eventEnd } =
        await postSchema.validateAsync(
          { title, location, body, eventStart, eventEnd },
          { abortEarly: false }
        ));

      // Creates a user variable of the internal user id for subsequent database calls
      let sql = `SET @user_id = (SELECT id FROM users WHERE clerk_id = ?)`;
      await db.execute(sql, [clerkId]);

      sql =
        'INSERT INTO `posts` (`user_id`, `title`, `location`, `body`, `event_start`, `event_end`) VALUES (@user_id, ?, ?, ?, ?, ?)';
      const [result] = await db.execute(sql, [
        title,
        location,
        body,
        eventStart,
        eventEnd,
      ]);

      res.status(201).send({
        status: 'success',
        data: {
          message: 'Post created successfully',
          title,
          postId: result.insertId,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// Get a post by id
router.get('/:postId', async (req, res, next) => {
  const { postId } = req.params;

  try {
    const sql = 'SELECT * FROM `posts` WHERE `id` = ?';
    const [result] = await db.execute(sql, [postId]);

    if (result.length === 1) {
      res.status(200).send({
        status: 'success',
        data: {
          post: result[0],
        },
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
});

// Update a post by id
router.patch('/:postId', async (req, res, next) => {
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
});

// Delete a post by id
router.delete('/:postId', async (req, res, next) => {
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
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.log(err);
  if (err.isJoi) {
    // Joi validation error
    res.status(422).send({
      status: 'fail',
      data: {
        errors: formatValidationErrors(err.details),
      },
    });
  } else if (err.message === 'Unauthenticated') {
    res.status(401).json({
      status: 'error',
      data: {
        message: 'Unauthorized',
      },
    });
  } else {
    // Generic or database error
    res.status(500).send({
      status: 'error',
      message: 'Internal server error - unable to communicate with database',
    });
  }
});

module.exports = router;
