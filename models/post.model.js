const { default: mongoose } = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "login-details" }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "login-details" },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("posts", postSchema);

module.exports = { postModel };
