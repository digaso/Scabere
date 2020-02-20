const axios = require("axios");
const parseStringtoArray = require("../utils/parseStringtoArray");
const User = require("../models/User");

module.exports = {
  async index(request, response) {
    const users = await User.find();
    return response.json(users);
  },

  async store(request, response) {
    //   let user = await User.find({ username });
    console.log(request.body);
    return response.json(request.body);
  }
};
