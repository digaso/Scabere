const Statistics = require("../models/Statistics");

module.exports = {
  async index(request, response) {
    const { username } = request.userData;
    const stats = await Statistics.findOne({ username });
    return response.json(stats);
  },
  async store(request, response) {
    const { username } = request.body;
    const stats = await Statistics.create({
      username,
    });
    return response
      .status(200)
      .json({ message: "User registered successfuly" });
  },
};
