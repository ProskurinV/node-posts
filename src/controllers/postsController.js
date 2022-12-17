const {v4: uuidv4} = require('uuid');

let posts = [
  {
    id: uuidv4(),
    title: 'Hello1',
    text: 'test text1',
  },
  {
    id: uuidv4(),
    title: 'Hello2',
    text: 'test text2',
  },
  {
    id: uuidv4(),
    title: 'Hello3',
    text: 'test text3',
  },
];

const getPosts = (req, res) => {
  res.json({posts, status: 'success'});
};

const getPostById = (req, res) => {
  const [post] = posts.filter((item) => item.id === req.params.id);
  if (!post) {
    return res.status(400).json({
      status: 'No post found',
    });
  }
  res.json({post, status: 'succsess'});
};

const addPost = (req, res) => {
  const {title, text} = req.body;

  posts.push({
    id: uuidv4(),
    title,
    text,
  });
  res.json({status: 'succsess'});
};

const changePost = (req, res) => {
  const {title, text} = req.body;

  posts.forEach((post) => {
    if (post.id === req.params.id) {
      post.title = title;
      post.text = text;
    }
  });
  res.json({status: 'succsess'});
};

const patchPost = (req, res) => {
  const {title, text} = req.body;

  posts.forEach((post) => {
    if (post.id === req.params.id) {
      if (title) {
        post.title = title;
      }
      if (text) {
        post.text = text;
      }
    }
  });
  res.json({status: 'succsess'});
};

const deletePost = (req, res) => {
  posts = posts.filter((item) => item.id !== req.params.id);
  res.json({status: 'succsess'});
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
};
