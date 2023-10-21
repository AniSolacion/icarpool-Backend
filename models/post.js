// models/post.js
const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb'); // Used to allow for use of Mongo's ObjectId

const postSchema = new mongoose.Schema({
  _id: ObjectId,
  userId: ObjectId,
  type: Boolean,
  startLocation: String,
  startDate: Date,
  startTime: Date,
  availableSeats: Number,
  description: String,
  createdAt: Date
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
