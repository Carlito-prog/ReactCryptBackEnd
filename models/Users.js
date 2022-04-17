const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../config/index");

const userSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
});

userSchema.methods = {
  comparePass(pass) {
    return bcrypt.compare(pass, this.password);
  },
};

userSchema.pre("save", async function () {
  const salt = bcrypt.genSaltSync(config.saltrounds);
  await bcrypt(this.password, salt)
    .then((hash) => {
      this.password = hash;
    })
    .catch((err) => {
      console.log(`${err}, failed pre save user`);
    });
});

module.exports = mongoose.model("User", userSchema);
