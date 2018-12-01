const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const route = require("./route");
const cors = require("cors");

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://reeversedev:ree123456789@ds231941.mlab.com:31941/react-editor",
  { useNewUrlParser: true },
  (err, response) => {
    if (err) {
      console.log(err);
    }
    console.log("Connected to database");
  }
);

let app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/", route);

app.listen("3000", () => {
  console.log("Server started running");
});
