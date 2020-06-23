const List = require("../models/List");
const Task = require("../models/Task");
const ParseToStringArray = require("../utils/parseStringtoArray");

module.exports = {
  async index(request, response) {
    let numTasks = 0;
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
      console.log(numtasks);
      finalLists.push(list);
      console.log(finalLists);
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
};
