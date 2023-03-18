const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { userRoute } = require("./routes/login.routes");
const { authentication } = require("./middlewares/authentication");

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("welcome to home page man");
});
app.use("/api/authenticate", userRoute);
app.use(authentication)

app.listen(8787, async () => {
  try {
    await connection;
    console.log("connection established");
  } catch (err) {
    console.log(err);
  }
  console.log("server started on port 8787");
});
