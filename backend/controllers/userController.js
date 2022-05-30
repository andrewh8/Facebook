const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/// Register new User (POST /api/users) - public ///
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
        email: user.email,
        token: generateToken(user._id)
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


/// Login User (POST /api/users/login) - public ///
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
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      const err = new Error('Wrong Email or Password');
      err.status = 400;
      return next(err);
    };
  } catch (err) {
    next(err);
  }
}


/// Display User details (GET /api/users/me) - private ///
exports.user_detail_get = (req, res, next) => {
  res.json(req.user);
}


/// Display Profile details (GET /api/users/:id) - private ///
exports.user_profile_get = async (req, res, next) => {
  try {
    const otherUser = await User.findOne({_id: req.params.id});

    if (!otherUser) {
      const err = new Error('User not found');
      err.status = 400;
      return next(err);
    }

    // Check for User
    if (!req.user) {
      const err = new Error('Not Logged In');
      err.status = 401;
      return next(err);
    }

    // Implement friends check
    // // Make sure the logged in user matches the post user
    // if (post.user.toString() !== req.user.id) {
    //   const err = new Error('User not authorized');
    //   err.status = 401;
    //   return next(err);
    // }

    res.json(otherUser);

  } catch (err) {
    next (err);
  }
}


/// Friend Request (PUT api/users/:id)
exports.user_friendRequest_put = async (req, res, next) => {
  try {
    const otherUser = await User.findOne({_id: req.params.id});

    // if (!otherUser) {
    //   const err = new Error('User not found');
    //   err.status = 400;
    //   return next(err);
    // }

    // // Check for User
    // if (!req.user) {
    //   const err = new Error('Not Logged In');
    //   err.status = 401;
    //   return next(err);
    // }

    if (otherUser.friends.includes(req.user.id)) {
      const err = new Error('You\'re already friends');
      err.status = 400;
      return next(err);
    }

    if (otherUser.friendRequests.includes(req.user.id)) {
      const err = new Error('You already sent a friend request');
      err.status = 400;
      return next(err);
    }

    await User.updateOne({"_id": `${req.params.id}`}, {"$push": {"friendRequests": `${req.user.id}`}});
    await User.updateOne({"_id": `${req.user.id}`}, {"$push": {"pendingFriends": `${req.params.id}`}});
    
    // Implement friends check
    // // Make sure the logged in user matches the post user
    // if (post.user.toString() !== req.user.id) {
    //   const err = new Error('User not authorized');
    //   err.status = 401;
    //   return next(err);
    // }

  } catch (err) {
    next (err);
  }
}


/// List all Users (GET api/users) - private ///
exports.user_list_get = async (req, res, next) => {
  try {
    const posts = await User.find({}, {name: 1});
    res.json(posts);
  } catch (err) {
    next(err);
  }
}


/// Generate JWT ///
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
}
