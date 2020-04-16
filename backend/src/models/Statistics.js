const mongoose = require("mongoose");

const StatisticsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  tasksMadeTotal: {
    type: Number,
    default: 0,
  },
  tasksThisMonth: {
    type: Number,
    default: 0,
  },
  bestMonthTasks: {
    type: Number,
    default: 0,
  },
  tasksThisYear: {
    type: [Number],
    default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  tasksThisWeek: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Statistics", StatisticsSchema);
