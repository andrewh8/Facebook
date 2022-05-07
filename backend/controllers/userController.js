const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/// Register new User (POST /api/users) ///
exports.user_register_post = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;
  
    if (!name || !email || !password) {
      const err = new Error('Please add all fields');
      err.status = 400;
      return next(err);
    };
    
    // Check if User exists
    const userExists = await User.findOne({email});
  
    if (userExists) {
      const err = new Error('User already exists');
      err.status = 400;
      return next(err);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword
    });

    await user.save();

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email
      });
    } else {
      const err = new Error('Invalid User Data');
      err.status = 400;
      return next(err);
    }
  
  } catch (err) {
    next(err);
  }
}


/// Login User (POST /api/users/login) ///
exports.user_login_post = async (req, res, next) => {
  try {
    const {email, password} = req.body;
  
    // Check for User email
    const user = await User.findOne({email});
  
    // Verify User password
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email
      });
    } else {
      const err = new Error('Invalid Credentials');
      err.status = 400;
      return next(err);
    };
  } catch (err) {
    next(err);
  }
}


/// Display User details (GET /api/users/me) ///
exports.user_detail_get = (req, res, next) => {
  res.json({message: 'User Details'});
}
