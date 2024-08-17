const express = require('express');
const {
  getUser,
  getUserPosts,
  getUserPostCount,
  getFollowStatus,
  createFollow,
  deleteFollow,
  getFollowers,
  getFollowerCount,
  getFollowing,
  getFollowingCount,
} = require('../controllers/userController');
const { requireAuth } = require('../middlewares/auth');

const router = express.Router();

// Get all user information (first name, last name, etc.) to a user
router.get('/:username', getUser);

// Get all posts belonging to a user
router.get('/:username/posts', getUserPosts);

// Get the number of posts belonging to a user
router.get('/:username/posts/count', getUserPostCount);

// Check if user is followed by the current authenticated user
router.get('/me/following/:username/', requireAuth, getFollowStatus);

// Get the list of all users following a user
router.get('/:username/followers', getFollowers);

// Get the count of all users following a user
router.get('/:username/followers/count', getFollowerCount);

// // Get the list of all users followed by a user
router.get('/:username/following', getFollowing);

// Get the count of all users followed by a user
router.get('/:username/following/count', getFollowingCount);

// Follow another user (as the current authenticated user)
router.post('/:username/follow', requireAuth, createFollow);

// Unfollow another user (as the concurrent authenticated user)
router.delete('/:username/unfollow', requireAuth, deleteFollow);

module.exports = router;
