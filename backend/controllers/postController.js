const Post = require('../models/postModel');
const mongoose = require('mongoose');

// Display a List of Posts (GET /api/posts)
exports.post_list = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

// Create a Post (POST /api/posts)
exports.post_create = async (req, res, next) => {
  try {
    if (!req.body.username) {
      const err = new Error('Please add username');
      err.status = 400;
      return next(err);
    }
    if (!req.body.content) {
      const err = new Error('Please add content');
      err.status = 400;
      return next(err);
    }

    const post = new Post({
      username: req.body.username,
      content: req.body.content,
      comments:req.body.comments
    });
  
    await post.save();
    res.json(post);
  } catch (err) {
    next(err)
  }
}

// Update a Post (PUT /api/posts/id)
exports.post_update = async (req, res, next) => {
  try {
    const postExists = await mongoose.Types.ObjectId.isValid(req.params.id);
    if (!postExists) {
      const err = new Error('Post not found');
      err.status = 400;
      return next(err);
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.json(updatedPost);

  } catch (err) {
    next (err);
  }
}

// Delete a Post (DELETE /api/posts/id)
exports.post_delete = async (req, res, next) => {
  try {
    const postExists = await mongoose.Types.ObjectId.isValid(req.params.id);
    if (!postExists) {
      const err = new Error('Post not found');
      err.status = 400;
      return next(err);
    }

    const deleteMessage = await Post.deleteOne({"_id": req.params.id});

    if (deleteMessage.deletedCount === 1) {
      res.json({message: 'Post Deleted'});
    } else if (deleteMessage.deletedCount === 0) {
      res.json({message: 'This post was already deleted'});
    }

  } catch (err) {
    next (err);
  }}
