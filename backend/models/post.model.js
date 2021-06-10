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
    postAuther: {
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
postSchema.pre("save", async function (next) {
  console.log("this", this);
  //if (!this.password || !this.isModified("password")) return next;
  //this.password = await bcrypt.hash(this.password, 10);
  next();
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
