const express = require('express');
const router = express.Router();
const {
    getPost,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController');

// Route to Get and Create Posts
router.route('/').get(getPost).post(createPost);

// Route to Update and Delete Posts
router.route('/:id').put(updatePost).delete(deletePost);

module.exports = router;
