// Import Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const PORT = process.env.PORT;
const path = require('path');

// Create Express App
const app = express();

// Enable frontend as allowable origin for CORS
app.use(cors());

// Setup Database
const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGODB_URI}`);

// Use Middleware for Accessing req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup Routes
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

// Setup Error Handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errorMessage: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
});

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Setup Server
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
