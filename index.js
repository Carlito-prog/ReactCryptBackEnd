// FOR PORT
const config = require("./Config");

// Using Express
const express = require("express");
// Connect app and routes
const app = express();
app.use(express.json());

// connect app to DB
require("./Config/mongoose")(app);

// connect routes
const routes = require("./routes");
app.use(routes);

// Listen to server
app.listen(config.developement.port, () =>
  console.log(" Welcome To Crypto World Server!! ")
);
