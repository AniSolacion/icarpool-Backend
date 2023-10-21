// models/user.js
const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb');

const userSchema = new mongoose.Schema({
  _id: ObjectId, // figure out how to properly reference this object
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  username: String,
  createdAt: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
