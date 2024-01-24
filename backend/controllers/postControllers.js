const Post = require('../models/Post');
const User = require('../models/User');

// @desc: CREATE POST
// @access: Private
// @end point: /post/create

const createPost = async (req, res) => {
  try {
    const { title, content, topic, coverImage } = req.body;
    const { id } = req.params;
    const user = await User.findById(id);
    const post = await Post.create({
        title,
        content,
        topic,
        coverImage,
        user,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc: GET POST BY ID
// @access: Pirvate
// @end point: /post/:id

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc: DELETE POST BY ID
// @access: Private
// @end point: /post/:id

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.remove();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPost,
  deletePost
};
