const express = require('express');
const {
  getUser,
  getUserPosts,
  getFollowStatus,
  createFollow,
  deleteFollow,
} = require('../controllers/userController');
const { requireAuth } = require('../middlewares/auth');

const router = express.Router();

// Get all user information to a user (by username)
router.get('/:username', getUser);

// Get all posts belonging to a user (by username)
router.get('/:username/posts', getUserPosts);

// Check if user is followed by the current authenticated user
router.get('/:username/following', requireAuth, getFollowStatus);

// Follow another user (as the current authenticated user)
router.post('/:username/follow', requireAuth, createFollow);

// Unfollow another user (as the concurrent authenticated user)
router.delete('/:username/unfollow', requireAuth, deleteFollow);

module.exports = router;
