const router = require("express").Router();
const passport = require("passport");
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/adduser").post(async (req, res) => {
  try {
    new User(req.body)
      .save()
      .then(() => res.json("user added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch {
    (err) => res.status(400).json("Error: " + err);
  }
});

router.route("/getuserbyid/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/getuserbyemail/:email").get((req, res) => {
  User.findOne({ email: req.params.email }).then((user) =>
    console.log(user.email)
  );
  User.findOne({ email: req.params.email })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.json("user deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.userName = req.body.userName;
      user
        .save()
        .then(() => res.json("user updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
const {
  checkNotAuthenticated,
  checkAuthenticated,
} = require("../middleware/auth");
const { render } = require("@testing-library/react");

router.route("/loggedin").get(checkAuthenticated, (req, res) => {
  console.log("logged");
});

router.route("/notloggedin").get(checkNotAuthenticated, (req, res) => {
  console.log("notlogged");
});

router.route("/login").post(
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.route("/home").get((req, res) => {
  console.log("hi");
});

router.route("/logout").delete((req, res) => {
  req.logOut();
  res.redirect("/login");
});

module.exports = router;
