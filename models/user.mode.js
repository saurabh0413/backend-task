const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "login-details" },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "login-details",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "login-details",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };
