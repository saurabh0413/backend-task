const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connection = mongoose.connect(
  "mongodb+srv://saurabh:saurabh@cluster0.iaurlmb.mongodb.net/test"
);
module.exports = { connection };
