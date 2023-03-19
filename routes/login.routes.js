const express = require("express");
const { loginController } = require("../controllers/login.controller");

const loginRoute = express.Router();
loginRoute.post("/", loginController);
module.exports = { loginRoute };
