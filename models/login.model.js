const { default: mongoose } = require("mongoose");

const loginSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "login-details" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "login-details" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const loginModel = mongoose.model("login-details", loginSchema);

module.exports = { loginModel };
