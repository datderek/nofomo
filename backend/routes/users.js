const express = require('express');
const { getUserPosts } = require('../controllers/userController');

const router = express.Router();

// Get all posts belonging to a user
router.get('/:userId/posts', getUserPosts);

module.exports = router;
