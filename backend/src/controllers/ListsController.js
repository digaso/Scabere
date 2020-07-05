const List = require("../models/List");
const Task = require("../models/Task");
const ParseToStringArray = require("../utils/parseStringtoArray");

module.exports = {
  async index(request, response) {
    const { username } = request.userData;
    const lists = await List.find({
      users: {
        $elemMatch: {
          $eq: username,
        },
      },
    });

    let finalLists = [];
    for (let index = 0; index < lists.length; index++) {
      const list = lists[index].toObject();
      const idlist = list._id;
      numtasks = await Task.countDocuments({ idlist });
      list.numTasks = numtasks;
      finalLists.push(list);
    }
    return response.json(finalLists);
  },
  async store(request, response) {
    const { name } = request.body;
    const { username } = request.userData;

    const list = await List.create({
      name,
      users: [username],
      createdby: username,
    });
    return response.json(list);
  },
  async destroy(request, response) {
    const _id = request.params.id;
    const { username } = request.userData;
    const list = await List.findById({ _id });
    const tasks = await Task.find({
      idlist: _id,
    });
    if (!list) return response.status(404).json({ message: "List not found" });
    if (list.createdby == username) {
      if (tasks.length >= 0) {
        tasks.map((item, index) => {
          item.remove();
        });
      }
      await List.deleteOne({ _id });
      return response.status(200).json({ message: "List deleted" });
    } else {
      return response
        .status(401)
        .json({ error: "User do not have permission" });
    }
  },
  async homeTasks(request, response) {
    const { username } = request.userData;
    const tasks = await Task.find({ username });
    const lists = await List.find({
      users: {
        $elemMatch: {
          $eq: username,
        },
      },
    });
    const data = { task: {}, lists: [] };
    if (tasks.length > 0) {
      const tasksLength = tasks.length - 1;
      const randomNumber = Math.floor(Math.random() * tasksLength);
      data.task = tasks[randomNumber];
    }
    if (lists.length > 0) {
      const dataList = [];
      dataList.push(lists[0]);
      dataList.push(lists[1]);
      data.lists = dataList;
    }
    return response.status(200).json(data);
  },
};
