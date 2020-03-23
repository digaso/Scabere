const axios = require("axios");
const User = require("../models/User");
const encryptPassword = require("../utils/encryptPassword");
const multer = require("multer");

module.exports = {
  async index(request, response) {
    const users = await User.find();
    return response.json(users);
  },
  async store(request, response) {
    const { name, username, email, password } = request.body;
    const hashedpassword = await encryptPassword.encryptPassword(password);
    const userNames = await User.find({ username });
    const userEmails = await User.find({ email });
    const photo_url = request.file.location;
    if (userNames.length == 0 && userEmails.length == 0) {
      const user = await User.create({
        name,
        username,
        email,
        password: hashedpassword,
        photo_url,
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
    const username = request.params.username;
    await User.deleteOne({ username });
    const users = await User.find({ username });
    response.json(users);
  }
};
