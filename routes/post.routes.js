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

postRoute.post("/", postController);
postRoute.get("/", getPostsController);
postRoute.get("/:id",singlepostController)
postRoute.get("/all_posts",allPostController)
postRoute.delete("/:id",deletePostController)
postRoute.post("/like/:id", likesController);
postRoute.post("/unlike/:id", unlikeController);
postRoute.post("/comment/:id", commentController);
module.exports = { postRoute };
