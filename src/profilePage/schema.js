const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  bio: { type: String },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  bookmarks: [String],
  comments: [String],
  reviews: [String]
});

module.exports = ProfileSchema;
