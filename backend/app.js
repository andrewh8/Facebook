// Import Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const port = process.env.PORT;

// Create Express App
const app = express();

// Enable frontend as allowable origin for CORS
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Setup Database
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);

// Use Middleware for Accessing req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup Routes
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

// Setup Error Handling
  // Invalid Route - request made it past the above routes without a match
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
  // Other Errors thrown by Express prior to making it past above routes
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errorMessage: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
});

// Setup Server
app.listen(port, () => console.log(`Server started on ${port}`));
