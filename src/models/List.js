const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: String,
  users: [String],
  admin_users: [String]
});

module.exports = mongoose.model("Lists", ListSchema);
