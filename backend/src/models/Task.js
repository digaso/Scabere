const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  deadline_date: Date,
  ispinned: Boolean,
  location: String,
  idlist: String
});

module.exports = mongoose.model("Task", TaskSchema);
