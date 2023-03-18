const { default: mongoose } = require("mongoose");

const loginSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const loginModel = mongoose.model("login", loginSchema);

module.exports = { loginModel };
