/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
const express = require("express");
const router = new express.Router();

const {
  addPostValidation,
  postPatchValidation,
} = require("../middlewares/validationMiddleware");

const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
} = require("../controllers/postsController");

router.get("/", getPosts);

router.get("/:id", getPostById);

router.post("/", addPostValidation, addPost);

router.put("/:id", postPatchValidation, changePost);

router.patch("/:id", postPatchValidation, patchPost);

router.delete("/:id", deletePost);

module.exports = { postsRouter: router };
