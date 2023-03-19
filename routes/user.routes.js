const express = require("express");
const { userController } = require("../controllers/user.controller");

const userRoute = express.Router();
userRoute.get("/:id", userController);
module.exports = { userRoute };
