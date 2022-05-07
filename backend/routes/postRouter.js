const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const {protect} = require('../middleware/authMiddleware');

// GET request for Listing posts
router.get('/', protect, postController.post_list);

// POST request for Creating a post
router.post('/', protect, postController.post_create);

// PUT request for Updating a post
router.put('/:id', protect, postController.post_update);

// DELETE request for Deleting a post
router.delete('/:id', protect, postController.post_delete);

module.exports = router;
