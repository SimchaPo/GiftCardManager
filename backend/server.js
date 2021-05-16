require("./db/mongoose");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
const cockieParser = require("cookie-parser");
const flash = require("express-flash");
const session = require("express-session");
const app = express();
let User = require("./models/user.model");

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cockieParser(process.env.SESSION_SECRET));

require("./passport/passport-config")(
  passport,
  (email) => User.findOne({ email: email }),
  (id) => User.findById(id)
);

app.use(flash());

const giftCardsRouter = require("./routes/giftCards.js");
const usersRouter = require("./routes/users.js")(passport);
const storesRouter = require("./routes/stores.js");
const ordersRouter = require("./routes/orders.js");

app.use("/giftcards", giftCardsRouter);
app.use("/users", usersRouter);
app.use("/stores", storesRouter);
app.use("/orders", ordersRouter);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
