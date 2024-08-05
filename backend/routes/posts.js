const express = require('express');
const db = require('../config/database');
const { requireAuth } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');
const { validatePost } = require('../middlewares/validation');
const { errorHandler } = require('../middlewares/errors');
const { getUpdateFields } = require('../utils/utils');
const { createPost, getPost } = require('../controllers/postController');

const router = express.Router();

// Create a new post belonging to the concurrent user
router.post('/', requireAuth, upload.single('image'), validatePost, createPost);

// Get a post by id
router.get('/:postId', requireAuth, getPost);

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

router.use(errorHandler);

module.exports = router;
