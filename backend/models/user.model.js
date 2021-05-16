const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [4, "password is to short"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "address is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "country is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "city is required"],
      trim: true,
    },
    zip: {
      type: String,
      required: [true, "zip is required"],
      trim: true,
    },
    userType: {
      type: String,
      enum: ["user", "officer", "admin"],
      default: "user",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) return next;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
