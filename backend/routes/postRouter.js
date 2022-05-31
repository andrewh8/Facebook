const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const {protect} = require('../middleware/authMiddleware');

// GET request for Listing posts
router.get('/', protect, postController.post_list);

// GET request for Listing Other User's posts
router.get('/others', protect, postController.post_listOthers_get);

// GET request for Listing Profile posts
router.get('/profile/:id', protect, postController.post_profilePosts_get);

// POST request for Creating a post
router.post('/', protect, postController.post_create);

// PUT request for Updating a post
router.put('/:id', protect, postController.post_update);

// DELETE request for Deleting a post
router.delete('/:id', protect, postController.post_delete);

module.exports = router;
