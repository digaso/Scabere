const axios = require("axios");
const parseStringtoArray = require("../utils/parseStringtoArray");
const User = require("../models/User");

module.exports = {
  async index(request, response) {
    const users = await User.find();
    return response.json(users);
  },

  async store(request, response) {
    const { name, username, email, photo_url, scabs, friends } = request.body;
    const usersnames = await User.find({ username });
    const usersemail = await User.find({ email });

    if (usersnames.length == 0 && usersemail.length == 0) {
      const user = await User.create({
        name,
        username,
        email,
        photo_url: null,
        scabs: 0,
        friends: []
      });
      return response.json(user);
    }

    return response.json();
  },
  async update(request, response) {
    const { name, photo_url } = request.body;
    const user = await User.update({
      name,
      photo_url
    });
    return response.json(user);
  }
};
