const List = require("../models/List");
module.exports = async (request, response, next) => {
  try {
    const { username } = request.userData;
    const lists = await List.find({
      users: {
        $elemMatch: {
          $eq: username,
        },
      },
    });
    let idlists = [];
    lists.map((item) => {
      idlists.push(item._id);
    });
    request.lists = idlists;
    next();
  } catch (error) {
    return response.json({ error });
  }
};
