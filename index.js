const bp = require("body-parser");
const formData = require("express-form-data");
const express = require("express");
const cors = require("cors")();
const cookieParser = require("cookie-parser");

// FOR PORT
const config = require("./Config");

// Using Express
// Connect app and routes
const app = express();

app.use(express.json());
app.use(bp.json());
app.use(formData.parse());
app.use(cors);
app.use(cookieParser());

// connect app to DB
require("./Config/mongoose")(app);

// connect routes
const routes = require("./routes");
app.use(routes);

// Listen to server
app.listen(config.developement.port, () =>
  console.log(" Welcome To Crypto World Server!! ")
);
