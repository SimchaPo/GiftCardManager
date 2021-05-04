const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const giftCardSchema = new Schema(
  {
    storeName: {
      type: String,
      required: true,
      trim: true,
    },
    cardNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    expiry: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const GiftCard = mongoose.model("GiftCard", giftCardSchema);

module.exports = GiftCard;
