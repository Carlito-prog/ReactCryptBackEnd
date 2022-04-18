const axios = require("axios");
require("dotenv").config();

const instance = axios.create({
  baseURl: "https://api.nomics.com/v1",
  headers: {
    timeout: 5000,
  },
  params: {
    key: `${process.env.NOMICS_API_KEY}`,
  },
});

module.exports = instance;
