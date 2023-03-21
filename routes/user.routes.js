const express = require("express");
const { allPostController } = require("../controllers/post.controller");
const { followController, getuserController } = require("../controllers/user.controller");
const userRoute = express.Router();


userRoute.post("/follow/:id", followController);
userRoute.get("/user",getuserController)
module.exports = { userRoute };
