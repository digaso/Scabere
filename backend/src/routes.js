const { Router } = require("express");
const routes = Router();
const UsersController = require("./controllers/UsersController");
const StatisticsController = require("./controllers/StatisticsController");
const ListsController = require("./controllers/ListsController");
const TasksController = require("./controllers/TasksController");

routes.get("/users", UsersController.index);
routes.post("/users", UsersController.store);
routes.put("/users", UsersController.update);

routes.get("/statistics", StatisticsController.index);
routes.post("/statistics", StatisticsController.store);

routes.get("/lists", ListsController.index);
routes.post("/lists", ListsController.store);

routes.get("/tasks", TasksController.index);
routes.post("/tasks", TasksController.store);

module.exports = routes;
