const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    postTitle: {
      type: String,
      required: "Title is required",
    },

    postContent: {
      type: String,
      required: "Content is required",
    },
    postAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
postSchema.pre("save", async function (next) {
  console.log("this", this);
  next();
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
