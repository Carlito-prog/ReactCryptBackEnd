const express = require("express");
const router = express.Router();
const User = require("../models/register");
const bCrypt = require("bcrypt");
const config = require("../Config");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    // get input from client
    const { fname, lname, email, password } = req.body;
    console.log(req.body);

    // validate users
    if (!(email && password && fname && lname)) {
      res.status(400).send("Please Enter All Information");
    }
    // check if use in in db
    const registeredUser = await User.findOne({ email });

    if (registeredUser) {
      return res.status(409).send("User Already Exist, Login Please");
    }

    // Encrypt User Password
    const encryptPass = await bCrypt.hash(password, config.saltrounds);

    // create user in our database
    const user = await User.create({
      fname,
      lname,
      email: email.toLowerCase(),
      password: encryptPass,
    });

    // create Token
    const token = jwt.sign({ user_id: user.id, email }, config.secret, {
      expiresIn: "2h",
    });
    // save token
    user.token = token;
    console.log(token);

    // save in cookies
  } catch (err) {}
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if client Entered Input
    if (!(email && password)) {
      res.status(400).send(" Email and Password is Required for Login ");
    }

    const user = await User.findOne({ email });

    if (user && (await bCrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user.id, email }, config.secret, {
        expiresIn: "2h",
      });
      // save token
      user.token = token;
      res.status(200);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {}
});

module.exports = router;
