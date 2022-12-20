const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  text: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
};
