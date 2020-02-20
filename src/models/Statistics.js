const mongoose = require("mongoose");

const StatisticsSchema = new mongoose.Schema({
  tasksmadeTotal: Number,
  tasksthismonth: Number,
  bestmonthtasks: Number,
  tasksthisyear: [Number],
  tasksthisweek: [Number]
});

module.exports = mongoose.model("Statistics", StatisticsSchema);
