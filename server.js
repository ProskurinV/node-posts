const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

const { connectMongo } = require("./src/db/connections");

const { postsRouter } = require("./src/routers/postRouter");

const PORT = process.env.PORT || 8081;

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/posts", postsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/tasks",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const start = async () => {
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};

start();
