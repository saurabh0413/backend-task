const express = require("express");
const { loginController } = require("../controllers/login.controller");

const userRoute = express.Router();
userRoute.post("/", loginController);
module.exports = { userRoute };
