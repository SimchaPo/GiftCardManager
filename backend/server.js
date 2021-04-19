const express = require("express");
const cors = require("cors");
require("./db/mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const app = express();
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.use(cors());
let User = require("./models/user.model");

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
//const medicationsRouter = require('./routes/medicationsRouter');
const usersRouter = require("./routes/users.js");

//app.use('/medications', medicationsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
