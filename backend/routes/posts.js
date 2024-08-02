const express = require('express');
const db = require('../config/database');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { requireAuth } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');
const { validatePost } = require('../middlewares/validation');
const {
  getUpdateFields,
  formatValidationErrors,
  generateUniqueFileName,
} = require('../utils/utils');

const router = express.Router();
const s3 = new S3Client({});

// Create a new post belonging to the concurrent user
router.post(
  '/',
  requireAuth,
  upload.single('image'),
  validatePost,
  async (req, res, next) => {
    const { userId: clerkId } = req.auth;
    const { originalname, buffer } = req.file;
    const { title, location, body, eventStart, eventEnd } = req.body;

    try {
      // Retrieves the internal userId from the clerkId
      let sql = `SELECT id FROM users WHERE clerk_id = ?`;
      const [result1] = await db.execute(sql, [clerkId]);
      const userId = result1[0].id;

      // Uploads the image to S3
      const input = {
        Bucket: 'nofomo-user-uploaded-content',
        Key: generateUniqueFileName(userId, originalname),
        Body: buffer,
      };
      await s3.send(new PutObjectCommand(input));

      sql =
        'INSERT INTO `posts` (`user_id`, `title`, `location`, `body`, `event_start`, `event_end`) VALUES (?, ?, ?, ?, ?, ?)';
      const [result2] = await db.execute(sql, [
        userId,
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
          postId: result2.insertId,
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
  if (err.isJoi) {
    // Joi validation error
    res.status(422).send({
      status: 'fail',
      data: {
        errors: formatValidationErrors(err.details),
      },
    });
  } else if (err.isAuth) {
    // Clerk authentication Error
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
