// use router module in Express
const express = require("express");
const router = express.Router();

var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Connecting router to controller
const apiFectchController = require("./Controller/homeCon");
router.use("/", apiFectchController);

const userCon = require("./Controller/userCon");
router.use("/user", jsonParser, userCon);

module.exports = router;
