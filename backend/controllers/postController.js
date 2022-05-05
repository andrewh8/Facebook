
// Display list of posts
// route: GET /api/posts
// access: Private
const getPost = (req, res) => {
    res.json({message: 'Get posts'});
}

// Create a post
// route: POST /api/posts
// access: Private
const createPost = (req, res) => {
    res.json({message: 'Create post'});
}

// Update a post
// route: PUT /api/posts/:id
// access: Private
const updatePost = (req, res) => {
    res.json({message: `Update post ${req.params.id} `});
}

// Delete a post
// route: DELETE /api/posts/:id
// access: Private
const deletePost = (req, res) => {
    res.json({message: `Delete post ${req.params.id}`});
}

module.exports = {
    getPost,
    createPost,
    updatePost,
    deletePost
}