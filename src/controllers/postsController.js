const { Post } = require("../db/postModel");

const getPosts = async (req, res) => {
  const posts = await Post.find({});
  res.json({ posts });
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    return res.status(400).json({
      status: "No post found",
    });
  }
  res.json({ post, status: "succsess" });
};

const addPost = async (req, res) => {
  const { title, text } = req.body;

  const post = new Post({ title, text });
  await post.save();

  res.json({ status: "success" });
};

const changePost = async (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;

  await Post.findByIdAndUpdate(id, { $set: { title, text } });
  res.json({ status: "succsess" });
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  await Post.findByIdAndRemove(id);

  res.json({ status: "succsess" });
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePost,
  deletePost,
};
