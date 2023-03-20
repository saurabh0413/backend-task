const { default: mongoose } = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "post" }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = { commentModel };
