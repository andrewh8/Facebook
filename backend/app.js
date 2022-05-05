// Import Dependencies
require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const port = process.env.PORT;

// Create Express App
const app = express();

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


// Setup Server
app.listen(port, () => console.log(`Server started on ${port}`));
