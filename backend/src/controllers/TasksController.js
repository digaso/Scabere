const Task = require("../models/Task");

module.exports = {
	async index(request, response) {
		const tasks = await Task.find();
		return response.json(tasks);
	},
	async store(request, response) {
		const {
			title,
			description,
			deadline_date,
			location,
			idlist
		} = request.body;
		const task = Task.create({
			title,
			description,
			deadline_date,
			ispinned: false,
			location,
			idlist
		});
		return response.json();
	},
	async update(request, response) {}
};
