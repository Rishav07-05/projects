import express from "express";
import { upload } from "../utils/cloudinary.js";
import Post from "../models/Post.js";

const router = express.Router();

// Upload a new post
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { caption, userId, userName } = req.body;

    const newPost = new Post({
      imageUrl: req.file.path,
      caption,
      userId,
      userName,
      likes: [], // Initialize with empty likes array
    });

    await newPost.save();

    res.status(200).json({ message: "Uploaded successfully!", post: newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ postedAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

// Like a post
router.post("/posts/:postId/like", async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user already liked the post
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unlike a post
router.post("/posts/:postId/unlike", async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Remove user from likes array
    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get likes for a user (optional)
router.get("/user/:userId/likes", async (req, res) => {
  try {
    const posts = await Post.find({ likes: req.params.userId });
    const likedPostIds = posts.map((post) => post._id.toString());
    res.status(200).json(likedPostIds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET posts of a specific user
router.get("/user/:userId/posts", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort({
      postedAt: -1,
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user's posts." });
  }
});


// deleting post 

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized. You can only delete your own posts." });
    }

    const deletedPost = await Post.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Post deleted successfully", post: deletedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error deleting post" });
  }
});



export default router;
