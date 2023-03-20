const express = require("express");
const {
  postController,
  getPostsController,
  likesController,
  unlikeController,
} = require("../controllers/post.controller");

const postRoute = express.Router();

postRoute.post("/", postController);
postRoute.get("/", getPostsController);
postRoute.post("/like/:id", likesController);
postRoute.post("/unlike/:id", unlikeController);
module.exports = { postRoute };
