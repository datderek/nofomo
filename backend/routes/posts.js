const express = require('express');
const { requireAuth } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');
const { validatePost } = require('../middlewares/validation');
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const router = express.Router();

// Create a new post belonging to the concurrent user
router.post('/', requireAuth, upload.single('image'), validatePost, createPost);

// Get a post by id
router.get('/:postId', requireAuth, getPost);

// Update a post by id (if it belongs to the concurrent user)
// TODO:
//   1. Check concurrent user owns post
//   2. Create method in model
//   3. Update controller with error handling
router.patch('/:postId', requireAuth, updatePost);

// Delete a post by id (if it belongs to the concurrent user)
// TODO:
//   1. Check concurrent user owns post
//   2. Create method in model
//   3. Update controller with error handling
router.delete('/:postId', requireAuth, deletePost);

module.exports = router;
