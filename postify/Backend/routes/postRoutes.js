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
    const { content, postedBy } = req.body;
    // console.log(req.body);

    // if (!content || !postedBy) {
    //   return res
    //     .status(400)
    //     .json({ message: "Content and postedBy are required." });
    // }

    const newPost = new Post({ content, postedBy });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
