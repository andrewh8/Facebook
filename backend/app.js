// Import Dependencies
require('dotenv').config();
const express = require('express');
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

// Setup Server
app.listen(port, () => console.log(`Server started on ${port}`));
