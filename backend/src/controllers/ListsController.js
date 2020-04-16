const List = require("../models/List");
const ParseToStringArray = require("../utils/parseStringtoArray");

module.exports = {
  async index(request, response) {
    try {
      const lists = await List.find();
      return response.json(lists);
    } catch (error) {
      return response.json({ error });
    }
  },
  async store(request, response) {
    const { name } = request.body;
    const username = request.headers.username;

    const list = await List.create({
      name,
      users: [username],
      createdby: username
    });
    return response.json(list);
  },
  async indexOne(request, response) {
    const _id = request.params.id;
    try {
      const list = await List.find({ _id });
      return response.status(200).json(list);
    } catch (error) {
      return response.json(403).json({ error });
    }
  },
  async destroy(request, response) {
    const _id = request.params.id;
    const username = request.headers.username;
    const list = await List.findById({ _id });
    if (list.createdby == username) {
      return response.status(200).json({ message: "apagou mano" });
    } else {
      return response.status(403).json({ error: "Isso não é teu bruh" });
    }
  }
};
