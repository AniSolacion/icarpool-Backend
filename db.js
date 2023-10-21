// Connect the MongoDb database and establish a connection.
const mongoose = require('mongoose');
const DB_URI = 'mongodb+srv://hus18004:8QaLvcvLt3z5oLdI@icarpool.67m7ira.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
