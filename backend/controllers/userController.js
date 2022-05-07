const User = require('../models/userModel');
const mongoose = require('mongoose');

// Register new User (POST /api/users)
exports.user_register_post = (req, res, next) => {
    res.json({message: 'Register User'});
}

// Login User (POST /api/users/login)
exports.user_login_post = (req, res, next) => {
    res.json({message: 'Login User'});
}

// Display User details (GET /api/users/me)
exports.user_detail_get = (req, res, next) => {
    res.json({message: 'User Details'});
}
