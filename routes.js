// use router module in Express
const express = require("express");
const router = express.Router();

// Connecting router to controller
const apiFectchController = require("./Controller/homeCon");
router.use("/", apiFectchController);

const userCon = require("./Controller/userCon");
router.use("/user", userCon);

module.exports = router;
