const User = require("../models/User");

module.exports = {
  async index(request, response) {
    const username = request.params.username;
    const user = await User.find({ username });

    return response.status(200).json(user);
  }
};
