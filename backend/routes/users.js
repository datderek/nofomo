const express = require('express');
const { getUser, getUserPosts } = require('../controllers/userController');

const router = express.Router();

// Get all user information to a user (by username)
router.get('/:username', getUser);

// Get all posts belonging to a user (by username)
router.get('/:username/posts', getUserPosts);

module.exports = router;
