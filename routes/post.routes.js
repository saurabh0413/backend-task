const express = require("express");
const {
  postController,
  getPostsController,
  likesController,
  unlikeController,
  commentController,
  deletePostController,
  singlepostController,
  allPostController
} = require("../controllers/post.controller");

const postRoute = express.Router();

postRoute.post("/posts", postController);
postRoute.get("/posts", getPostsController);
postRoute.get("/posts/:id",singlepostController)
postRoute.get("/all_posts",allPostController)
postRoute.delete("/posts/:id",deletePostController)
postRoute.post("/like/:id", likesController);
postRoute.post("/unlike/:id", unlikeController);
postRoute.post("/comment/:id", commentController);
module.exports = { postRoute };
