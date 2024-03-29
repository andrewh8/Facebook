const Post = require('../models/postModel');

/// List All Posts (GET /api/posts) - private ///
exports.listPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({user: req.user.id});
    res.json(posts);
  } catch (err) {
    next(err);
  }
}


/// Create a Post (POST /api/posts) - private ///
exports.createPost = async (req, res, next) => {
  try {
    const {content, comments} = req.body;

    if (!content) {
      const err = new Error('Please add content');
      err.status = 400;
      return next(err);
    }

    const post = new Post({
      user: req.user.id,
      content: content,
      comments: comments,
    });
  
    await post.save();
    res.status(201).json(post);

  } catch (err) {
    next(err)
  }
}


/// List All Other Users' Posts (GET /api/posts/others) - private ///
exports.listOtherUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({user: { $ne: req.user.id}});
    res.json(posts);
  } catch (err) {
    next(err);
  }
}


/// Read User's Posts (GET /api/posts/profile/:id) - private ///
exports.readUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({user: req.params.id});
    res.json(posts);
  } catch (err) {
    next(err);
  }
}




/// Update Post (PUT /api/posts/id) - private ///
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({_id: req.params.id});

    if (!post) {
      const err = new Error('Post not found');
      err.status = 400;
      return next(err);
    }

    // Check for User
    if (!req.user) {
      const err = new Error('User not found');
      err.status = 401;
      return next(err);
    }

    // Make sure the logged in user matches the post user
    if (post.user.toString() !== req.user.id) {
      const err = new Error('User not authorized');
      err.status = 401;
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

/// Delete Post (DELETE /api/posts/id) - private ///
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({_id: req.params.id});
    
    if (!post) {
      const err = new Error('Post not found');
      err.status = 400;
      return next(err);
    }

    // Check for User
    if (!req.user) {
      const err = new Error('User not found');
      err.status = 401;
      return next(err);
    }

    // Make sure the logged in user matches the post user
    if (post.user.toString() !== req.user.id) {
      const err = new Error('User not authorized');
      err.status = 401;
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
