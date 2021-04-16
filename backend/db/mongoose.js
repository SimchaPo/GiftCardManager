const mongoose = require("mongoose");
const { config } = require("dotenv");

config();

const uri = process.env.DB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB is connected");
});
