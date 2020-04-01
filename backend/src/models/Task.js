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
  description: {
    type: String,
    default: null
  },

  deadline_date: {
    type: Date,
    default: null
  },
  ispinned: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    default: null
  },
  idlist: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model("Task", TaskSchema);
