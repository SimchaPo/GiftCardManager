const mongoose = require("mongoose");

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
        quantity: { type: Number, required: true },
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
  next();
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
