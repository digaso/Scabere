const Task = require("../models/Task");

module.exports = {
  async index(request, response) {
    const tasks = await Task.find();
    return response.json(tasks);
  },
  async userTasks(request, response) {
    const username = request.params.username;
    const tasksUser = await Task.find({ username });
    return response.json(tasksUser);
  },
  async store(request, response) {
    const {
      username,
      title,
      description,
      deadline_date,
      location,
      idlist
    } = request.body;
    const task = Task.create({
      username,
      title,
      description,
      deadline_date,
      location,
      idlist
    });
    return response.json(task);
  },
  async update(request, response) {}
};
