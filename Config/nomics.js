const axios = require("axios");

const instance = axios.create({
  baseURl: "https://api.nomics.com/v1",
  headers: {
    timeout: 5000
  },
  params: {
    key: "m_45c89584df8f513dc2aa1ef76d27d3a34a0687a1"
  }
  
});

module.exports = instance;
