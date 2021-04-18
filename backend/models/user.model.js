const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email address"],
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "userName is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [4, "password is to short"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
