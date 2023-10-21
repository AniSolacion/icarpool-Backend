// This file creates basic Express routes for the user collection.
const express = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/USer'); // Import your model
const app = express();
const PORT = 3000;

//app.use(bodyParser.json());
app.use(express.json());        // Which of these is needed??

// Create a new user
app.post('/user', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve all users
app.get('/user', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Update a user by ID
app.put('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by ID
app.delete('/user/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
