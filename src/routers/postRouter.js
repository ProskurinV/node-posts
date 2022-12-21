const express = require("express");
const router = new express.Router();

const { addPostValidation } = require("../middlewares/validationMiddleware");

const { asyncWrapper } = require("../helpers/apiHelpers");

const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  deletePost,
} = require("../controllers/postsController");

router.get("/", asyncWrapper(getPosts));

router.get("/:id", asyncWrapper(getPostById));

router.post("/", addPostValidation, asyncWrapper(addPost));

router.put("/:id", addPostValidation, asyncWrapper(changePost));

router.delete("/:id", asyncWrapper(deletePost));

module.exports = { postsRouter: router };
