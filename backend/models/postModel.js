const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
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
