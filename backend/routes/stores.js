const router = require("express").Router();
let Store = require("../models/store.model.js");
const formidable = require("express-formidable");
const { authUser, authRole } = require("../middleware/basicAuth");
const ROLE = require("../../src/roles.enum");

const fs = require("fs");

router.route("/").get((req, res) => {
  console.log("get stores list");
  Store.find()
    .then((stores) => res.json(stores))
    .catch((err) => res.status(400).json("Error: " + err));
});

router
  .route("/addstore")
  .all(formidable(), authUser, authRole(ROLE[0]))
  .post(async (req, res) => {
    console.log("add store:", req.fields);
    console.log("store to add", req.files);
    const newLogoName = req.fields.storeName + "-logo.jpg";
    const newPath = __dirname + "/../../public/uploads/" + newLogoName;
    fs.rename(req.files.storeLogo.path, newPath, () => {});
    console.log("newPath", newPath);

    let store = new Store();
    store.storeName = req.fields.storeName;
    store.storeWebsite = req.fields.storeWebsite;
    store.storeLogo = "/uploads/" + newLogoName;
    store
      .save()
      .then((store) => res.status(200).json(store))
      .catch((err) => res.status(400).json("Error: " + err));
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
