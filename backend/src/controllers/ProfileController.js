const User = require("../models/User");
const Task = require("../models/Task");

module.exports = {
  async index(request, response) {
    const username = request.headers.authorization;
    console.log(username);
    const user = await User.find(username);

    return response.status(200).json(user);
  },
  async userTasks(request, response) {
    const username = request.headers.authorization;
    console.log(username);
    const usertasks = await Task.find({ username });
    console.log(usertasks);
    return response.status(200).json(usertasks);
  },
  async userLists(request, response) {},
  async userStats(request, response) {}
};
