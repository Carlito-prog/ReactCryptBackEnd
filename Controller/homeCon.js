const express = require("express");
const router = express.Router();

// const instance = require("../Config/nomics");

//API CALL
const axios = require("axios");
const URL = "https://api.nomics.com/v1/";
const params = new URLSearchParams([
  ["key", "m_45c89584df8f513dc2aa1ef76d27d3a34a0687a1"],
]);

router.get("/", (req, res) => {
  if (res.status(200)) {
    axios
      .get(URL + "/currencies/ticker?" + params)
      .then((resp) => {
        res.status(200).json(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = router;
