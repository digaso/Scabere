const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	username: String,
	title: String,
	description: String,
	deadline_date: Date,
	ispinned: Boolean,
	location: String,
	idlist: String
});

module.exports = mongoose.model("Task", TaskSchema);
