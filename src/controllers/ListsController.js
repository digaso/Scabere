const List = require("../models/List");
const ParseToStringArray = require("../utils/parseStringtoArray");

module.exports = {
  async index(request, response) {
    const lists = await List.find();
    return response.json(lists);
  },
  async store(request, response) {
    const { name, users } = request.body;
    const usersarray = ParseToStringArray(users);
    const list = await List.create({
      name,
      users: usersarray,
      admin_users: usersarray
    });

    return response.json(list);
  }
};
