const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Post', postSchema);
