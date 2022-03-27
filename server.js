const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// models
const db = require("./app/models");

const app = express();

let whiteList = ["http://localhost:8000", "http://localhost:8080"];

let corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json, application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sync database
db.sequelize.sync().then(() => {
  console.log("Database tables created!");
});

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Welcome to the server",
    values: [],
    errors: [],
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
