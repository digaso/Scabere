const List = require("../models/List");
const ParseToStringArray = require("../utils/parseStringtoArray");

module.exports = {
  async index(request, response) {
    try {
      const { username } = request.userData;
      const lists = await List.find({
        users: {
          $elemMatch: {
            $eq: username,
          },
        },
      });
      return response.json(lists);
    } catch (error) {
      return response.json({ error });
    }
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
    if (!list) return response.status(404).json({ message: "List not found" });
    if (list.createdby == username) {
      await List.deleteOne({ _id });
      return response.status(200).json({ message: "List deleted" });
    } else {
      return response
        .status(401)
        .json({ error: "User do not have permission" });
    }
  },
};
