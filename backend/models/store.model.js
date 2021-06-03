const mongoose = require("mongoose");
const { default: validator } = require("validator");
const Schema = mongoose.Schema;
const storeSchema = new Schema(
  {
    storeWebsite: {
      type: String,
      validate: [validator.isURL, "Please provide a valid website"],
      required: [true, "website is required"],
      unique: true,
      trim: true,
    },
    storeName: {
      type: String,
      required: [true, "userName is required"],
      trim: true,
    },
    storeLogo: {
      type: String,
      required: [true, "logo is required"],
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
