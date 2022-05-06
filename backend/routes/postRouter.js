const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET request for Listing posts
router.get('/', postController.post_list);

// POST request for Creating a post
router.post('/', postController.post_create);

// PUT request for Updating a post
router.put('/:id', postController.post_update);

// DELETE request for Deleting a post
router.delete('/:id', postController.post_delete);

module.exports = router;
