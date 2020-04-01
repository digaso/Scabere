const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  users: [String]
});

module.exports = mongoose.model("Lists", ListSchema);
