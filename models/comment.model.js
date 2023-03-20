const { default: mongoose } = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    postId: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "login-details" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const commentModel = mongoose.model("login-details", commentSchema);

module.exports = { commentModel };
