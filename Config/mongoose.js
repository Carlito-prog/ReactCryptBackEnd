const mongoose = require("mongoose");
const config = require("./index");

module.exports = () => {
  mongoose.connect(config.DB_connection).then(() => {
    console.log("Crypto World DB__CONNECTED");
  });
};
