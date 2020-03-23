const multer = require("multer");
const { Router } = require("express");
const routes = Router();
const UsersController = require("./controllers/UsersController");
const StatisticsController = require("./controllers/StatisticsController");
const ListsController = require("./controllers/ListsController");
const TasksController = require("./controllers/TasksController");
const multerconfig = require("./config/multer");

routes.get("/users", UsersController.index);
routes.post(
  "/users",
  multer(multerconfig).single("photo_url"),
  UsersController.store
);
routes.put("/users/:username", UsersController.update);
routes.delete("/users/:username", UsersController.destroy);

routes.get("/statistics", StatisticsController.index);
routes.post("/statistics", StatisticsController.store);

routes.get("/lists", ListsController.index);
routes.post("/lists", ListsController.store);

routes.get("/tasks", TasksController.index);
routes.post("/tasks", TasksController.store);

module.exports = routes;
