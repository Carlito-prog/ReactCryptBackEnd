const jwt = require("jsonwebtoken");
const config = require("../config/index");

module.exports = {
  createToken(_id) {
    const payload = { _id };
    const options = { expiresIn: "30d" };
    const token = jwt.sign(payload, config.secret, options);
    return token;
  },
};
