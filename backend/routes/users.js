const express = require('express');
const { getUserPosts } = require('../controllers/userController');

const router = express.Router();

// Get all posts belonging to a user
router.get('/:username/posts', getUserPosts);

// Get user id associated with a username

// Get user id associated with

module.exports = router;
