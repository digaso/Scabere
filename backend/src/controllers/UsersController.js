const axios = require("axios");
const User = require("../models/User");
const encryptPassword = require("../utils/encryptPassword");

module.exports = {
  async index(request, response) {
    const users = await User.find();
    return response.json(users);
  },
  async store(request, response) {
    const { name, username, email, password } = request.body;
    console.log(password);
    const hashedpassword = await encryptPassword.encryptPassword(password);
    console.log(hashedpassword);
    const usersnames = await User.find({ username });
    const usersemail = await User.find({ email });

    if (usersnames.length == 0 && usersemail.length == 0) {
      const user = await User.create({
        name,
        username,
        email,
        password: hashedpassword,
        photo_url: null,
        scabs: 0,
        friends: []
      });

      return response.json(user);
    }

    return response.json();
  },
  async update(request, response) {
    const { name, password, photo_url } = request.body;
    const hashedpassword = encryptPassword.encryptPassword(password);

    const user = await User.update({
      name,
      password: hashedpassword,
      photo_url
    });
    return response.json(user);
  },
  async destroy(request, response) {
    const { username } = request.body;
    const user = await User.deleteOne({ username });
    const users = await User.find({ username });
    response.json(users);
  }
};
