const ObjectId = require('mongodb').ObjectId;

const getPosts = async (req, res) => {
  const posts = await req.db.Posts.find({}).toArray();
  res.json({posts});
};

const getPostById = async (req, res) => {
  const {id} = req.params;
  const post = await req.db.Posts.findOne({_id: new ObjectId(id)});
  if (!post) {
    return res.status(400).json({
      status: 'No post found',
    });
  }
  res.json({post, status: 'succsess'});
};

const addPost = async (req, res) => {
  const {title, text} = req.body;

  await req.db.Posts.insert({title, text});

  res.json({status: 'success'});
};

const changePost = async (req, res) => {
  const {title, text} = req.body;

  await req.db.Posts.updateOne(
      {_id: new ObjectId(req.params.id)},
      {$set: {title, text}},
  );

  res.json({status: 'succsess'});
};

const deletePost = async (req, res) => {
  await req.db.Posts.deleteOne({_id: new ObjectId(req.params.id)});

  res.json({status: 'succsess'});
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePost,
  deletePost,
};
