require("./db/mongoose");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(cors());
let User = require("./models/user.model");
let GiftCard = require("./models/giftCard.model");
const initializePassport = require("./passport/passport-config");
initializePassport(
  passport,
  (email) => User.findOne({ email: email }),
  (id) => User.findById(id)
);

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
const giftCardsRouter = require("./routes/giftCards.js");
const usersRouter = require("./routes/users.js");

app.use("/giftcards", giftCardsRouter);
app.use("/users", usersRouter);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
