const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const storeSchema = new Schema(
  {
    website: {
      type: String,
      //validate: [validator.isEmail, "Please provide a valid email address"],
      required: [true, "website is required"],
      unique: true,
      trim: true,
    },
    storeName: {
      type: String,
      required: [true, "userName is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
storeSchema.pre("save", async function (next) {
  console.log("this", this);

  next();
});
const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
