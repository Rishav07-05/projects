const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: { type: String },
  image: { type: String},  // URL or file path
  postedBy: { type: String},
  createdAt: { type: Date, default: Date.now() },
}, { timestamps: true });


module.exports = mongoose.model("Post", postSchema);