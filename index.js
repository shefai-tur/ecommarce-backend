const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes");
const dbConnection = require("./config/dbConnection");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
dbConnection();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use(routes);

app.listen(8000);
