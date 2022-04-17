const jwt = require("jsonwebtoken");
const config = require("../Config/index");

const auth = (req, res, next) => {
  let token = req.cookies.x_auth_token;

  if (token) {
    jwt.verify(token, config.secret, async (err, payload) => {
      if (err) {
        console.log("no token saved");
        console.log(err.message);
        res.redirect("/user/login");
      } else {
        console.log(" token found");
        console.log(payload);
        next();
      }
    });
  } else {
    console.log("no token saved");
    res.redirect("/user/login");
  }
};

module.exports = { auth };
