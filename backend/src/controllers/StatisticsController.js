const Statistics = require("../models/Statistics");

module.exports = {
  async index(request, response) {
    const stats = await Statistics.find();
    return response.json(stats);
  },
  async store(request, response) {
    const { username } = request.body;
    const stats = await Statistics.create({
      username,
      tasksMadeTotal: 0,
      tasksThisMonth: 0,
      bestMonthTasks: 0,
      tasksThisYear: [],
      tasksThisWeek: []
    });
    return response.json(stats);
  }
};
