const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST request to register a User
router.post('/', userController.user_register_post);

// POST request for User login
router.post('/login', userController.user_login_post);

// GET request to display User details
router.get('/me', userController.user_detail_get);

module.exports = router;
