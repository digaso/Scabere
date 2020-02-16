const mongoose = require("mongoose");
const axios = require("axios");

const ListSchema = new mongoose.Schema({
  name: String,
  tasks: [String],
  people: [String],
  isOrdered: Boolean
});

module.exports = mongoose.model("Lists", ListSchema);
