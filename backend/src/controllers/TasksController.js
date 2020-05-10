const Task = require("../models/Task");

module.exports = {
  async index(request, response) {
    const { username } = request.userData;
    const idlists = request.lists;
    const tasks = await Task.find({
      $or: [
        { username },
        {
          idlist: {
            $in: idlists,
          },
        },
      ],
    });
    return response.json(tasks);
  },
  async store(request, response) {
    const { username } = request.userData;
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
    const { username } = request.userData;
    const {
      title,
      description,
      deadline_date,
      ispinned,
      done,
      location,
      idlist,
    } = request.body;

    const task = await Task.findOneAndUpdate(
      { _id: id },
      { title, description, deadline_date, ispinned, done, location, idlist }
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
