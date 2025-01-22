const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostsByUser } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new post
router.post('/', authMiddleware, createPost);

// Get all posts
router.get('/', getPosts);

// Get posts by user ID
router.get('/user/:userId', getPostsByUser);

module.exports = router;