const mongoose = require("mongoose");

const StatisticsSchema = new mongoose.Schema({
  tasksmadeTotal: Number,
  tasksthismonth: Number,
  bestmonthtasks: Number,
  tasksthisyear: {
    jan: Number,
    feb: Number,
    mar: Number,
    apr: Number,
    may: Number,
    jun: Number,
    jul: Number,
    aug: Number,
    sep: Number,
    oct: Number,
    nov: Number,
    dez: Number
  },
  tasksthisweek: {
    mon: Number,
    tue: Number,
    wed: Number,
    thu: Number,
    fri: Number,
    sat: Number,
    sun: Number
  }
});

module.exports = mongoose.model("Statistics", StatisticsSchema);
