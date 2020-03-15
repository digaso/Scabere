const mongoose = require("mongoose");

const StatisticsSchema = new mongoose.Schema({
	username: String,
	tasksMadeTotal: Number,
	tasksThisMonth: Number,
	bestMonthTasks: Number,
	tasksThisYear: [Number],
	tasksThisWeek: [Number]
});

module.exports = mongoose.model("Statistics", StatisticsSchema);
