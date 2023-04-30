const express = require('express');

const feedController = require('../controllers/feed')

const router = express.Router();

// get request => /feed/posts
router.get('/posts', feedController.getPosts);

// post => /feed/posts
router.post('/posts', feedController.createPost);

module.exports = router;
