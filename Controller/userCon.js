const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bCrypt = require("bcrypt");
const config = require("../Config");
const jwt = require("jsonwebtoken");
const createJWT = require("../utils/jwt");

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    // get input from client
    const { fname, lname, email, password } = req.body;

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
    res.cookie(config.cookie, token);
  } catch (err) {}
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if client Entered Input
  if (!(email && password)) {
    res.status(400).send(" Email and Password is Required for Login ");
  }

  // Check if user Exist
  User.findOne({ email })
    .then((user) => {
      // check if user match
      return Promise.all([user.comparePass(password), user]);
    })
    .then((returndata) => {
      console.log(returndata);
      // check if password match
      if (!returndata[0]) {
        throw new Error("Password is Incorrect");
      }

      let user = returndata[1];
      const token = createJWT.createToken(user._id);

      // save cookies in client
      res.cookie(config.cookie, token);
      res.redirect(`/?hello=${user.name}&token=${token}`);
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

module.exports = router;
