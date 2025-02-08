const { string } = require("joi");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: { type: String },
    image: { type: String },
    user : {type: String}
  },
  { timestamps: true }
); 

module.exports = mongoose.model("Post", postSchema);
