const express = require("express");
const { followController } = require("../controllers/user.controller");
const userRoute = express.Router();

userRoute.post("/:id", followController);

module.exports = { userRoute };
