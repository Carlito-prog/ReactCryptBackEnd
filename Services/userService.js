const config = require("../config/index");
const bcrypt = require("bcrypt");
const userSchema = require("../models/register");

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
