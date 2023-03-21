const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { loginRoute } = require("./routes/login.routes");
const { authentication } = require("./middlewares/authentication");
const { loginModel } = require("./models/login.model");
const { userRoute } = require("./routes/user.routes");
const { unfollowController } = require("./controllers/user.controller");
const { postRoute } = require("./routes/post.routes");
require("dotenv").config();
const PORT = process.env.PORT
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", async (req, res) => {
  const data = await loginModel.find();
  res.send(data);
});
app.use("/api/authenticate", loginRoute);
//authentication middleware
app.use(authentication);
app.use("/api", userRoute);
app.post("/api/unfollow/:id", unfollowController);
app.use("/api", postRoute);

module.exports = app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connection established");
  } catch (err) {
    console.log(err);
  }
  console.log(`server started on port ${PORT}`);
});
