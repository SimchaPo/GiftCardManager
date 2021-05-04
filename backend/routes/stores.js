const router = require("express").Router();
let Store = require("../models/store.model.js");

router.route("/").get((req, res) => {
  console.log("get stores list");
  Store.find()
    .then((stores) => res.json(stores))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addstore").post(async (req, res) => {
  try {
    console.log("add store:", req.body);
    new Store(req.body)
      .save()
      .then(() => res.json("store added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch {
    (err) => res.status(400).json("Error: " + err);
  }
});

router.route("/getstorebyid/:id").get((req, res) => {
  Store.findById(req.params.id)
    .then((store) => res.json(store))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  //console.log("user to delete:", id);
  Store.findByIdAndDelete(req.params.id)
    .then((store) => res.json("store deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Store.findById(req.params.id)
    .then((store) => {
      store.storeName = req.body.storeName;
      store.website = req.body.website;

      store
        .save()
        .then(() => res.json("store updated!"))
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
