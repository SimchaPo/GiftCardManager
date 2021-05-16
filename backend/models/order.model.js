const mongoose = require("mongoose");
const GiftCard = require("./giftCard.model");
const User = require("./user.model");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    giftCards: [
      {
        giftCard: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "GiftCard",
          required: true,
        },
        quantity: { type: String, required: true },
      },
    ],

    price: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
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
orderSchema.pre("save", async function (next) {
  console.log("this", this);
  //if (!this.password || !this.isModified("password")) return next;
  //this.password = await bcrypt.hash(this.password, 10);
  next();
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;