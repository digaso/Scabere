const mongoose = require("mongoose");

const StatisticsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  tasksMadeTotal: Number,
  tasksThisMonth: Number,
  bestMonthTasks: Number,
  tasksThisYear: [Number],
  tasksThisWeek: [Number]
});

module.exports = mongoose.model("Statistics", StatisticsSchema);
