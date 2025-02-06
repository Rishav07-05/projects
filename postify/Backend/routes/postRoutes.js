const express = require('express');
const Post = require('../models/post');

const router = express.Router();

// router.get("/api/posts", async (req, res) => {
//     try {
//         const posts = await Post.find().sort({ createdAt: -1 });
//         res.json(posts);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })


router.post("/api/posts", async (req, res) => {
  try {
    const { content, image, postedBy } = req.body;
    const newPost = new Post({ content, image, postedBy });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;