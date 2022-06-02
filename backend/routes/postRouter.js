const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const {protect} = require('../middleware/authMiddleware');


// List Posts
router.get('/', protect, postController.listPosts);

// Create Post
router.post('/', protect, postController.createPost);



// List Other Users' Posts
router.get('/others', protect, postController.listOtherUserPosts);


// Read User Posts
router.get('/profile/:id', protect, postController.readUserPosts);



// Update Post
router.put('/:id', protect, postController.updatePost);

// Delete Post
router.delete('/:id', protect, postController.deletePost);

module.exports = router;
