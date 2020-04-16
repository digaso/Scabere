const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdby: String,
  users: [String]
});

module.exports = mongoose.model("Lists", ListSchema);
