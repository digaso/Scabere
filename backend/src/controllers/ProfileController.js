const User = require("../models/User");
const Task = require("../models/Task");
const List = require("../models/List");
const Stats = require("../models/Statistics");

module.exports = {
  async index(request, response) {
    const username = request.headers.authorization;
    const user = await User.find(username);

    return response.status(200).json(user);
  },
  async tasks(request, response) {
    const username = request.headers.username;
    const usertasks = await Task.find({ username });
    return response.status(200).json(usertasks);
  },
  async lists(request, response) {
    const username = request.headers.username;
    const lists = await List.find({
      users: {
        $elemMatch: {
          $eq: username,
        },
      },
    });
    return response.status(200).json(lists);
  },
  async stats(request, response) {
    const username = request.headers.username;
    const stats = await List.find({ username });
    return response.status(200).json(stats);
  },
};
