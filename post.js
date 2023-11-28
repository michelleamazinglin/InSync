const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  body: { type: String, required: true },
  image: { type: String, required: false } // This will hold the path to the image file
});

module.exports = mongoose.model('Post', postSchema);