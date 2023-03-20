const { loginModel } = require("../models/login.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginController = async (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      res.send("something went wrong, please try again later");
    } else {
      const user = new loginModel({
        email: email,
        password: hash,
      });
      await user.save();

      const result1 = await loginModel.findOne({ email });
      const hashed_pass = result1.password;

      bcrypt.compare(password, hashed_pass, function (err, result) {
        if (result) {
          const token = jwt.sign({ userId: result1._id }, "abcd1234");
          res.send({ msg: "login success", token: token });
        } else {
          res.send("Login Failed");
        }
      });
    }
  });
};
module.exports = { loginController };
