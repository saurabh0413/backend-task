const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

mongoose.set('strictQuery', true);
const authentication = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send("please login again");
  }
  const token = req.headers.authorization.split(" ")[1];
 
  jwt.verify(token, "abcd1234", function (err, decoded) {
    if (err) {
      res.send("please login");
    } else {
     
      req.body.userId = decoded.userId;
      
      next();
    }
  });
};
module.exports = { authentication };
