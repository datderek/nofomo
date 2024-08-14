const express = require('express');
const { getUserPosts } = require('../controllers/userController');

const router = express.Router();

// Get all posts belonging to a user (identified by username)
router.get('/:username/posts', getUserPosts);

module.exports = router;
