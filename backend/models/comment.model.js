const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    commentContent: {
      type: String,
      required: "Content is required",
    },
    commentAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
commentSchema.pre("save", async function (next) {
  console.log("this", this);
  next();
});
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
