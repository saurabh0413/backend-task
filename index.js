const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { loginRoute } = require("./routes/login.routes");
const { authentication } = require("./middlewares/authentication");
const { userRoute } = require("./routes/user.routes");
const { loginModel } = require("./models/login.model");

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", async (req, res) => {
  const data = await loginModel.find();
  res.send(data);
});
app.use("/api/authenticate", loginRoute);
// app.use(authentication);
app.use("/api/follow", userRoute);
app.listen(8787, async () => {
  try {
    await connection;
    console.log("connection established");
  } catch (err) {
    console.log(err);
  }
  console.log("server started on port 8787");
});