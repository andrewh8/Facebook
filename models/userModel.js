const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  location: {
    type: String,
  },
  school: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Please add a email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
  friends: {
    type: [{ _id: String, name: String }],
    required: false
  },
  friendRequests: {
    type: [{ _id: String, name: String }],
    required: false
  },
  pendingFriends: {
    type: [{ _id: String, name: String }],
    required: false
  }
});

module.exports = mongoose.model('User', userSchema);
