const router = require("express").Router();
let GiftCard = require("../models/giftCard.model.js");

router.route("/").get((req, res) => {
  console.log("get gift cards list");
  GiftCard.find()
    .then((giftcards) => res.json(giftcards))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addgiftcard").post(async (req, res) => {
  console.log("add gift card:", req.body);
  new GiftCard(req.body)
    .save()
    .then(() => res.json("gift card added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getgiftcardbyid/:id").get((req, res) => {
  GiftCard.findById(req.params.id)
    .then((giftcard) => res.json(giftcard))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  GiftCard.findByIdAndDelete(req.params.id)
    .then((giftcard) => res.json("gift card deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  GiftCard.findById(req.params.id)
    .then((giftcard) => {
      giftcard.storeName = req.body.storeName;
      giftcard.cardNumber = req.body.cardNumber;
      giftcard.amount = req.body.amount;
      giftcard.price = req.body.price;
      giftcard.expiry = req.body.expiry;

      giftcard
        .save()
        .then(() => res.json("gift card updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
const {
  checkNotAuthenticated,
  checkAuthenticated,
} = require("../middleware/auth");

router.route("/loggedin").get(checkAuthenticated, (req, res) => {
  console.log("logged");
});

router.route("/notloggedin").get(checkNotAuthenticated, (req, res) => {
  console.log("notlogged");
});

module.exports = router;
