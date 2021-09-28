const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const router = require("./router/routes");
const path = require("path");

app.use(bodyParser.json());
app.use("/api", router);

app.use("/images", express.static(path.join(__dirname, "/public/files")));
app.use("/", express.static(path.join(__dirname, "/Frontend")));
// app.use(path.join(__dirname + '/Frontend', 'app.html'))
mongoose.connect(
  "mongodb+srv://adminUser:Admin123@ranjithcluster.jkhq5.mongodb.net/demo?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
  () => {
    console.log("database connected");
  }
);

app.listen(8000, () => console.log("server started"));
