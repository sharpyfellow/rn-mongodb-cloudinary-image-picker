const Post = require('../models/Post');

const createPost = async (req, res) => {
  const { title, description } = req.body;

  try {
    const post = new Post({
      title,
      description,
      postedBy: req.user._id,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('postedBy', 'name email');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.params.userId }).populate('postedBy', 'name email');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostsByUser,
};