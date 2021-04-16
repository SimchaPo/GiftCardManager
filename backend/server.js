const express = require("express");
const cors = require("cors");
require("./db/mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
passport.initialize();

//const medicationsRouter = require('./routes/medicationsRouter');
const usersRouter = require("./routes/users.js");

//app.use('/medications', medicationsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
