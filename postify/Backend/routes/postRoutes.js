const express = require("express");
const Post = require("../models/post");

const router = express.Router();

// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    if (!posts.length) {
      return res.status(404).json({ message: "No posts found." });
    }
    return res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new post
router.post("/posts", async (req, res) => {
  try {
    const { content, image , user } = req.body;
    // console.log(req.body);

    if (!content || !user || !image) {
      return res
        .status(400)
        .json({ message: "Content, postedBy  and image are required." });
    }

    const newPost = new Post({ content, image , user });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
