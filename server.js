const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const { postsRouter } = require("./routers/postRouter");

const PORT = process.env.PORT || 8081;

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
