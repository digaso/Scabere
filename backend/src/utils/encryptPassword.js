const bcrypt = require("bcrypt");

module.exports = {
  async encryptPassword(password) {
    if (password == null || password == undefined || password == "")
      return null;
    const salt = await bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hashSync(password, salt);

    return hashpassword;
  },
};
