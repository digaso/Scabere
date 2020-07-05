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
    const { title, description, location, deadline_date } = request.body;
    const task = Task.create({
      username,
      title,
      deadline_date,
      description,
      location,
      idlist,
    });
    console.log(`task created by ${username}`);
    return response.json(task);
  },
  async update(request, response) {
    const id = request.params.id;
    const task = Task.findOne({ _id: id });
    const { username } = request.userData;
    const { title, description, location } = request.body;
    let newTitle = title;
    let newDescription = description;
    let newLocation = location;
    if (title === "" || title === undefined) {
      newTitle = task.title;
    }
    if (description === undefined) {
      newDescription = task.description;
    }
    if (location === undefined) {
      newLocation = task.location;
    }

    await Task.findOneAndUpdate(
      { _id: id },
      { title: newTitle, description: newDescription, location: newLocation }
    );
    console.log(`task updated by ${username}`);
    return response.status(200).json();
  },
  async checkTask(request, response) {
    const _id = request.params.id;
    const { username } = request.userData;
    const task = await Task.findOne({ _id });
    const { done } = task;
    await Task.findOneAndUpdate({ _id }, { done: !done }).then((res) => {
      return response.status(200).json();
    });
  },
  async listTasks(request, response) {
    const idlist = request.params.id;
    const listTasks = await Task.find({
      idlist,
    });
    return response.status(200).json(listTasks);
  },
  async destroy(request, response) {
    const idTask = request.params.id;
    const { username } = request.userData;
    const task = await Task.findOne({ _id: idTask });
    if (username == task.username) {
      task.remove();
      return response
        .status(200)
        .json({ message: "Task deleted successfully" });
    } else {
    }
  },
};
