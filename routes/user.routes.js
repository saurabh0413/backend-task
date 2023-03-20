const express = require("express");
const { followController, getuserController } = require("../controllers/user.controller");
const userRoute = express.Router();

userRoute.post("/follow/:id", followController);
userRoute.get("/user",getuserController)
module.exports = { userRoute };
