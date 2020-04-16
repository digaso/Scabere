const Task = require("../models/Task");

module.exports = {
  async index(request, response) {
    const tasks = await Task.find();
    return response.json(tasks);
  },
  async store(request, response) {
    const username = request.headers.username;
    const idlist = request.headers.idlist;
    const { title } = request.body;
    const task = Task.create({
      username,
      title,
      idlist,
    });
    console.log(`task created by ${username}`);
    return response.json(task);
  },
  async update(request, response) {
    const id = request.params.id;
    const username = request.headers.username;
    const {
      title,
      description,
      deadline_date,
      ispinned,
      done,
      location,
      idlist,
    } = request.body;

    await Task.updateOne(
      {},
      {
        title,
        description,
        deadline_date,
        ispinned,
        done,
        location,
        idlist,
      }
    );
    console.log(`task updated by ${username}`);
    return response.status(200).json();
  },

  async listTasks(request, response) {
    const idlist = request.params.id;
    const listtasks = await Task.find({
      idlist,
    });
    return response.status(200).json(listtasks);
  },
};
