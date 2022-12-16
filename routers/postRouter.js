const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

let posts = [
  {
    id: uuidv4(),
    title: "Hello1",
    text: "test text1",
  },
  {
    id: uuidv4(),
    title: "Hello2",
    text: "test text2",
  },
  {
    id: uuidv4(),
    title: "Hello3",
    text: "test text3",
  },
];

router.get("/", (req, res) => {
  res.json({
    posts,
    status: "succsess",
  });
});

router.get("/:id", (req, res) => {
  const [post] = posts.filter((item) => item.id === req.params.id);
  if (!post) {
    return res.status(400).json({
      status: "No post found",
    });
  }
  res.json({ post, status: "succsess" });
});

router.post("/", (req, res) => {
  const { title, text } = req.body;

  const schema = Joi.object({
    title: Joi.string().alphanum().min(3).max(30).required(),
    text: Joi.string().alphanum().min(10).max(300).required(),
  });
  const validationSchema = schema.validate(req.body);
  if (validationSchema.error) {
    return res.status(400).json({
      status: validationSchema.error.details,
    });
  }

  posts.push({
    id: uuidv4(),
    title,
    text,
  });
  res.json({ status: "succsess" });
});

router.put("/:id", (req, res) => {
  const { title, text } = req.body;

  const schema = Joi.object({
    title: Joi.string().alphanum().min(3).max(30).required(),
    text: Joi.string().alphanum().min(10).max(300).required(),
  });
  const validationSchema = schema.validate(req.body);
  if (validationSchema.error) {
    return res.status(400).json({
      status: validationSchema.error.details,
    });
  }

  posts.forEach((post) => {
    if (post.id === req.params.id) {
      post.title = title;
      post.text = text;
    }
  });
  res.json({ status: "succsess" });
});

router.patch("/:id", (req, res) => {
  const { title, text } = req.body;

  const schema = Joi.object({
    title: Joi.string().alphanum().min(3).max(30).optional(),
    text: Joi.string().alphanum().min(10).max(300).optional(),
  });
  const validationSchema = schema.validate(req.body);
  if (validationSchema.error) {
    return res.status(400).json({
      status: validationSchema.error.details,
    });
  }

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
  res.json({ status: "succsess" });
});

router.delete("/:id", (req, res) => {
  posts = posts.filter((item) => item.id !== req.params.id);
  res.json({ status: "succsess" });
});

module.exports = { postsRouter: router };
