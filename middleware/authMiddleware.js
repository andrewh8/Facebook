const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch {
      const err = new Error('Not Authorized');
      err.status = 401;
      return next(err);
    }
  }

  if (!token) {
    const err = new Error('Not Authorized, no token');
    err.status = 401;
    return next(err);
  }
}
