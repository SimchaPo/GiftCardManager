const router = require("express").Router();
let Order = require("../models/order.model.js");

router.route("/").get((req, res) => {
  console.log("get orders list");
  Order.find()
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addorder").post(async (req, res) => {
  let order = {
    giftCards: req.body.giftCards.map((giftCard) => ({
      giftCard: giftCard,
      quantity: giftCard.quantity,
    })),
    user: req.user,
    price: req.body.price,
  };
  console.log("order to add", order);
  new Order(order)
    .save()
    .then(() => res.json("order added!"))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

router.route("/getorderbyid/:id").get((req, res) => {
  Order.findById(req.params.id)
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  //console.log("user to delete:", id);
  Order.findByIdAndDelete(req.params.id)
    .then((order) => res.json("order deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      order
        .save()
        .then(() => res.json("order updated!"))
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
